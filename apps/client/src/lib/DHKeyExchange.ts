export class DHKeyExchange {
	private privateKey: bigint
	private publicKey: bigint
	private prime: bigint
	private generator: bigint
	private sharedSecret: Uint8Array | null = null

	constructor() {
		// Use the same parameters as Java side
		this.prime = BigInt('0x' + 
			'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD1' +
			'29024E088A67CC74020BBEA63B139B22514A08798E3404DD' +
			'EF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245' +
			'E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7ED' +
			'EE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3D' +
			'C2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F' +
			'83655D23DCA3AD961C62F356208552BB9ED529077096966D' +
			'670C354E4ABC9804F1746C08CA18217C32905E462E36CE3B' +
			'E39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9' +
			'DE2BCBF6955817183995497CEA956AE515D2261898FA0510' +
			'15728E5A8AACAA68FFFFFFFFFFFFFFFF');
		this.generator = BigInt(2);

		// Generate private key (random number)
		this.privateKey = this.generatePrivateKey();
		
		// Calculate public key: g^private mod p
		this.publicKey = this.modPow(this.generator, this.privateKey, this.prime);
	}

	private generatePrivateKey(): bigint {
		// Generate 32 random bytes using Web Crypto API
		const array = new Uint8Array(32);
		crypto.getRandomValues(array);
		return BigInt('0x' + Array.from(array).map(b => b.toString(16).padStart(2, '0')).join(''));
	}

	getPublicKey(): string {
		const publicKeyHex = this.publicKey.toString(16).padStart(512, '0');
		const publicKeyBytes = this.hexToBytes(publicKeyHex);
		
		// Create DER encoding that matches Java's SubjectPublicKeyInfo format
		const derPublicKey = new Uint8Array([
			0x30, 0x82, 0x01, 0x44, // SEQUENCE
			0x30, 0x81, 0x9F,       // SEQUENCE
			0x06, 0x09,             // OBJECT IDENTIFIER
			0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x03, 0x01, // dhpublicnumber
			0x30, 0x81, 0x91,       // SEQUENCE
			0x02, 0x81, 0x81,       // INTEGER (prime)
			...Array.from(this.hexToBytes(this.prime.toString(16).padStart(512, '0'))),
			0x02, 0x01,             // INTEGER (generator)
			0x02,                   // generator value
			0x02, 0x81, 0x81,       // INTEGER (public key)
			...Array.from(publicKeyBytes)
		]);

		return btoa(String.fromCharCode(...Array.from(derPublicKey)));
	}

	computeSharedSecret(serverPublicKeyBase64: string): void {
		const derBytes = Uint8Array.from(atob(serverPublicKeyBase64), c => c.charCodeAt(0));
		
		// Extract the public key value from the DER structure
		// Skip the header and find the actual key bytes
		let offset = 0;
		while (offset < derBytes.length && derBytes[offset] !== 0x02) {
			offset++;
		}
		offset++; // Skip the INTEGER tag
		
		// Skip the length bytes
		if ((derBytes[offset] & 0x80) !== 0) {
			offset += (derBytes[offset] & 0x7F) + 1;
		} else {
			offset++;
		}
		
		const publicKeyBytes = derBytes.slice(offset);
		const serverPublicKey = BigInt('0x' + Array.from(publicKeyBytes)
			.map(b => b.toString(16).padStart(2, '0')).join(''));
		
		// Calculate shared secret: (other_public)^private mod p
		const secret = this.modPow(serverPublicKey, this.privateKey, this.prime);
		this.sharedSecret = this.hexToBytes(secret.toString(16).padStart(512, '0'));
	}

	getSharedSecret(): Uint8Array | null {
		return this.sharedSecret;
	}

	private modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
		let result = BigInt(1);
		base = base % modulus;
		
		while (exponent > BigInt(0)) {
			if (exponent % BigInt(2) === BigInt(1)) {
				result = (result * base) % modulus;
			}
			base = (base * base) % modulus;
			exponent = exponent >> BigInt(1);
		}
		
		return result;
	}

	private hexToBytes(hex: string): Uint8Array {
		const bytes = new Uint8Array(Math.ceil(hex.length / 2));
		for (let i = 0; i < bytes.length; i++) {
			bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
		}
		return bytes;
	}

	async encryptPassword(password: string): Promise<string> {
		if (!this.sharedSecret) {
			throw new Error("Shared secret not computed yet");
		}

		try {
			// Generate a key from shared secret using SHA-256
			const keyMaterial = await crypto.subtle.digest('SHA-256', this.sharedSecret);

			// Import the key for AES-CBC
			const key = await crypto.subtle.importKey(
				'raw',
				keyMaterial,
				{ name: 'AES-CBC', length: 256 },
				false,
				['encrypt']
			);

			// Generate random IV
			const iv = crypto.getRandomValues(new Uint8Array(16));

			// Encrypt the password
			const encodedPassword = new TextEncoder().encode(password);
			const encryptedData = await crypto.subtle.encrypt(
				{ name: 'AES-CBC', iv },
				key,
				encodedPassword
			);

			// Combine IV and encrypted data
			const combined = new Uint8Array(iv.length + encryptedData.byteLength);
			combined.set(iv);
			combined.set(new Uint8Array(encryptedData), iv.length);

			return btoa(String.fromCharCode(...Array.from(combined)));
		} catch (error) {
			console.error('[DH] Encryption failed:', error);
			throw new Error('Failed to encrypt password');
		}
	}
}