"use client"

import React from "react"

function maskEmail(email: string): string {
	const [localPart, domain] = email.split("@")
	if (localPart.length < 2) {
		return email
	}

	const maskedLocalPart =
		localPart[0] +
		"*".repeat(Math.max(0, localPart.length - 4)) +
		localPart.slice(-3)
	return `${maskedLocalPart}@${domain}`
}

function ShowEmail({ email }: { email: string }) {
	const maskedEmail = maskEmail(email)
	return (
		<div className="mx-6 flex py-4 text-xl text-white">
			Your Email:
			<br />
			{maskedEmail}
		</div>
	)
}

export default ShowEmail
