import { DHKeyExchange } from "@/lib/DHKeyExchange";

export const encryptPasswordWithDH = async (password: string) => {
	try {
		// Generate session ID
		const sessionId = crypto.randomUUID()

		// Create DH instance
		const dh = new DHKeyExchange()
                
		// Step 1: Initialize key exchange
		const serverPublicKey = await fetch(
			`${process.env.API_BASE_URL}/v2/key-exchange/init`,
			{
				method: "POST",
				headers: {
					"X-Session-ID": sessionId,
				},
		})
		.then((res) => res.text())

		// Step 2: Complete key exchange
		await fetch(`${process.env.API_BASE_URL}/v2/key-exchange/complete`, {
			method: "POST",
			headers: {
				"X-Session-ID": sessionId,
				"Content-Type": "text/plain",
			},
			body: dh.getPublicKey(),
		});
        
		// Generate shared secret
		dh.computeSharedSecret(serverPublicKey)

		// Encrypt password
		const encryptedPassword = dh.encryptPassword(password)

		return {
			encryptedPassword,
			sessionId
		}
	} catch (error) {
		// eslint-disable-next-line no-console -- 오류 출력
		console.error("DH encryption error:", error)
		throw error
	}
}

export const destroyDHSession = async (sessionId: string): Promise<void> => {
	try {
		await fetch(`${process.env.API_BASE_URL}/v2/key-exchange/destroy`, {
			method: "POST",
			headers: {
				"X-Session-ID": sessionId,
			},
		});
	} catch (error) {
        // eslint-disable-next-line no-console -- 오류 출력
		console.error("Failed to destroy DH session:", error);
		// We might want to just log this error rather than throwing
		// since this is cleanup code
	}
};
