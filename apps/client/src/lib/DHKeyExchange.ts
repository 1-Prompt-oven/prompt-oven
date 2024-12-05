import { Buffer } from "node:buffer"
import crypto from "node:crypto"

export class DHKeyExchange {
	private dh: crypto.DiffieHellman
	private sharedSecret: Buffer | null = null

	constructor() {
		// Create DH instance with same parameters as server (2048 bits)
		this.dh = crypto.createDiffieHellman(2048)
		this.dh.generateKeys()
	}

	// Get public key to send to server
	getPublicKey(): string {
		return this.dh.getPublicKey().toString("base64")
	}

	// Generate shared secret from server's public key
	computeSharedSecret(serverPublicKeyBase64: string): void {
		const serverPublicKey = Buffer.from(serverPublicKeyBase64, "base64")
		this.sharedSecret = this.dh.computeSecret(serverPublicKey)
	}

	// Encrypt password using shared secret
	encryptPassword(password: string): string {
		if (!this.sharedSecret) {
			throw new Error("Shared secret not computed yet")
		}

		// Generate key from shared secret (same as server)
		const key = crypto.createHash("sha256").update(this.sharedSecret).digest()

		// Generate random IV
		const iv = crypto.randomBytes(16)

		// Create cipher
		const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)

    // Encrypt
    let encrypted = cipher.update(password, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    // Combine IV and encrypted data
    const combined = Buffer.concat([iv, Buffer.from(encrypted, 'base64')]);
    
    return combined.toString('base64');
  }
}