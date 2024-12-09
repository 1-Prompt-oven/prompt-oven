export class DHKeyExchange {
	private privateKey: bigint
	private publicKey: bigint
	private prime: bigint
	private generator: bigint
	private sharedSecret: Uint8Array | null = null
	private readonly KEY_SIZE = 2048

	constructor() {
		// RFC 3526 MODP Group 14 (2048-bit)
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
		// Generate random bytes for 2048-bit private key
		const array = new Uint8Array(this.KEY_SIZE / 8);
		crypto.getRandomValues(array);
		return BigInt('0x' + Array.from(array).map(b => b.toString(16).padStart(2, '0')).join(''));
	}

	getPublicKey(): string {
		const publicKeyHex = this.publicKey.toString(16).padStart(this.KEY_SIZE / 4, '0');
		const publicKeyBytes = this.hexToBytes(publicKeyHex);
		const primeBytes = this.hexToBytes(this.prime.toString(16).padStart(this.KEY_SIZE / 4, '0'));
		
		// Calculate sizes
		const sequenceSize = 4;  // SEQUENCE header
		const innerSequenceSize = 3;  // Inner SEQUENCE
		const oidSize = 11;  // Object identifier
		const paramsSequenceSize = 3;  // Parameters SEQUENCE
		const primeSize = 3 + primeBytes.length;  // Prime INTEGER
		const generatorSize = 3;  // Generator INTEGER
		const publicKeySize = 4 + publicKeyBytes.length;  // BIT STRING for public key
		
		const totalSize = sequenceSize + innerSequenceSize + oidSize + 
						 paramsSequenceSize + primeSize + generatorSize + publicKeySize;
		
		// Create DER encoding
		const derPublicKey = new Uint8Array(totalSize);
		let offset = 0;
		
		// Outer SEQUENCE
		derPublicKey[offset++] = 0x30;  // SEQUENCE tag
		derPublicKey[offset++] = 0x82;  // Long form, 2 bytes
		derPublicKey[offset++] = ((totalSize - 4) >> 8) & 0xff;  // Length high byte
		derPublicKey[offset++] = (totalSize - 4) & 0xff;  // Length low byte
		
		// Inner SEQUENCE
		derPublicKey[offset++] = 0x30;
		derPublicKey[offset++] = 0x81;
		derPublicKey[offset++] = totalSize - 7;
		
		// Object Identifier
		derPublicKey[offset++] = 0x06;
		derPublicKey[offset++] = 0x09;
		derPublicKey[offset++] = 0x2A;
		derPublicKey[offset++] = 0x86;
		derPublicKey[offset++] = 0x48;
		derPublicKey[offset++] = 0x86;
		derPublicKey[offset++] = 0xF7;
		derPublicKey[offset++] = 0x0D;
		derPublicKey[offset++] = 0x01;
		derPublicKey[offset++] = 0x03;
		derPublicKey[offset++] = 0x01;
		
		// Parameters SEQUENCE
		derPublicKey[offset++] = 0x30;
		derPublicKey[offset++] = 0x81;
		derPublicKey[offset++] = primeSize + generatorSize;
		
		// Prime INTEGER
		derPublicKey[offset++] = 0x02;
		derPublicKey[offset++] = 0x81;
		derPublicKey[offset++] = primeBytes.length;
		derPublicKey.set(primeBytes, offset);
		offset += primeBytes.length;
		
		// Generator INTEGER
		derPublicKey[offset++] = 0x02;
		derPublicKey[offset++] = 0x01;
		derPublicKey[offset++] = 0x02;
		
		// Public Key BIT STRING
		derPublicKey[offset++] = 0x03;  // BIT STRING tag
		derPublicKey[offset++] = 0x81;  // Long form, 1 byte
		derPublicKey[offset++] = publicKeyBytes.length + 1;  // Length including leading zero
		derPublicKey[offset++] = 0x00;  // Leading zero byte
		derPublicKey.set(publicKeyBytes, offset);
		
		console.debug('[DH] Generated public key DER (hex):', 
				Array.from(derPublicKey).map(b => b.toString(16).padStart(2, '0')).join(''));
		
		return btoa(String.fromCharCode(...Array.from(derPublicKey)));
	}

	computeSharedSecret(serverPublicKeyBase64: string): void {
		try {
			const derBytes = Uint8Array.from(atob(serverPublicKeyBase64), c => c.charCodeAt(0));
			console.debug('[DH] Received public key bytes (hex):', 
				Array.from(derBytes).map(b => b.toString(16).padStart(2, '0')).join(''));

			// Find the BIT STRING tag for the public key
			let offset = 0;
			let found = false;

			// Find the BIT STRING with either format:
			// 1. 0x03 0x81 0x00 (server format 1)
			// 2. 0x03 0x81 0x01 0x00 (server format 2)
			while (offset < derBytes.length - 4) {
				if (derBytes[offset] === 0x03 && // BIT STRING tag
					derBytes[offset + 1] === 0x81) { // Long form length
					if (derBytes[offset + 2] === 0x00) { // Format 1
						offset += 4;
						found = true;
						break;
					} else if (derBytes[offset + 2] === 0x01 && 
							 derBytes[offset + 3] === 0x00) { // Format 2
						offset += 5;
						found = true;
						break;
					}
				}
				offset++;
			}

			if (!found) {
				throw new Error("Invalid DER encoding: public key not found");
			}

			// Verify we have enough bytes remaining
			if (offset + (this.KEY_SIZE / 8) > derBytes.length) {
				throw new Error("Invalid DER encoding: insufficient data");
			}

			const publicKeyBytes = derBytes.slice(offset, offset + (this.KEY_SIZE / 8));
			console.debug('[DH] Extracted public key (hex):', 
				Array.from(publicKeyBytes).map(b => b.toString(16).padStart(2, '0')).join(''));

			const serverPublicKey = BigInt('0x' + Array.from(publicKeyBytes)
				.map(b => b.toString(16).padStart(2, '0')).join(''));

			const secret = this.modPow(serverPublicKey, this.privateKey, this.prime);
			this.sharedSecret = this.hexToBytes(secret.toString(16).padStart(this.KEY_SIZE / 4, '0'));
			
			console.debug('[DH] Generated shared secret (hex):', 
				Array.from(this.sharedSecret).map(b => b.toString(16).padStart(2, '0')).join(''));
		} catch (error) {
			console.error('[DH] Failed to compute shared secret:', error);
			throw new Error('Failed to compute shared secret');
		}
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
			console.debug('[Encrypt] Shared secret (hex):', 
				Array.from(this.sharedSecret).map(b => b.toString(16).padStart(2, '0')).join(''));

			const keyMaterial = await crypto.subtle.digest('SHA-256', this.sharedSecret);
			console.debug('[Encrypt] Key material (hex):', 
				Array.from(new Uint8Array(keyMaterial)).map(b => b.toString(16).padStart(2, '0')).join(''));

			const key = await crypto.subtle.importKey(
				'raw',
				keyMaterial,
				{ name: 'AES-GCM' },
				false,
				['encrypt']
			);

			const iv = crypto.getRandomValues(new Uint8Array(12));
			console.debug('[Encrypt] IV (hex):', 
				Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''));

			const encodedPassword = new TextEncoder().encode(password);
			console.debug('[Encrypt] Input text length:', encodedPassword.length);

			const encryptedData = await crypto.subtle.encrypt(
				{
					name: 'AES-GCM',
					iv,
					additionalData: new Uint8Array(),
					tagLength: 128
				},
				key,
				encodedPassword
			);

			const ciphertext = new Uint8Array(encryptedData).slice(0, -16);
			const tag = new Uint8Array(encryptedData).slice(-16);

			console.debug('[Encrypt] Ciphertext (hex):', 
				Array.from(ciphertext).map(b => b.toString(16).padStart(2, '0')).join(''));
			console.debug('[Encrypt] Tag (hex):', 
				Array.from(tag).map(b => b.toString(16).padStart(2, '0')).join(''));

			const combined = new Uint8Array(iv.length + ciphertext.byteLength + tag.byteLength);
			combined.set(iv);
			combined.set(new Uint8Array(ciphertext), iv.length);
			combined.set(tag, iv.length + ciphertext.byteLength);

			const result = btoa(String.fromCharCode(...Array.from(combined)));
			console.debug('[Encrypt] Final base64:', result);
			return result;
		} catch (error) {
			console.error('[Encrypt] Failed:', error);
			throw new Error('Failed to encrypt password');
		}
	}
}