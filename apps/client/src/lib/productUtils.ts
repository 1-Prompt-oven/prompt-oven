export const promptVariableRegex = /\[[^\]]+]/g

export interface PromptVariableType {
	name: string
	value: string
}
export const extractPromptVariableFromFormat = (promptVar: string) =>
	promptVar.slice(1, -1)

export const extractPromptVariables = (
	prompt: string,
): PromptVariableType[] => {
	const matches = prompt.match(promptVariableRegex)

	if (matches) {
		const uniqueVariables = Array.from(new Set(matches)).map((variable) =>
			extractPromptVariableFromFormat(variable),
		)

		// Create a new array of fields based on the order of uniqueVariables
		return uniqueVariables.map((variable) => {
			return { name: variable, value: "" }
		})
	}
	// No variables found, remove all fields
	return []
}

export const replaceVariables = (
	prompt: string,
	variableValues: Record<string, string>,
): string => {
	return prompt.replace(promptVariableRegex, (match) => {
		const varValue = extractPromptVariableFromFormat(match)
		if (Object.prototype.hasOwnProperty.call(variableValues, varValue)) {
			return `[${variableValues[varValue]}]`
		}
		return match
	})
}

// s3 handler for image upload
interface UploadResponse {
	url: string
	signedUrl?: string
}

interface UploadError {
	message: string
}

export const handleProductImageUpload = async (
	formData: FormData,
	imageUrl: string | undefined,
	currentImageUrl: string | undefined,
	key: string,
	bucket: string,
) => {
	if (imageUrl && imageUrl !== currentImageUrl) {
		try {
			// Only proceed if the imageUrl is a base64 string (new upload)
			if (imageUrl.startsWith("data:image")) {
				// Create a new FormData for the upload
				const uploadFormData = new FormData()

				// Convert base64 to blob
				const response = await fetch(imageUrl)
				const blob = await response.blob()

				// Create a File from the Blob with a proper name
				const fileName = `${Date.now()}-${key}.${blob.type.split("/")[1] || "png"}`
				const file = new File([blob], fileName, { type: blob.type })

				uploadFormData.append("img", file)
				uploadFormData.append("keyword", `${bucket}/${key}`)

				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: uploadFormData,
				})

				if (!uploadResponse.ok) {
					const errorData = (await uploadResponse.json()) as UploadError
					throw new Error(errorData.message || "Failed to upload image")
				}

				const data = (await uploadResponse.json()) as UploadResponse

				// Update the form with the S3 URL
				formData.set(key, data.url)
				return true
			}

			// If it's already an S3 URL, just use it as is
			formData.set(key, imageUrl)
			return true
		} catch (error) {
			return false
		}
	}
	// If no new image, keep the current one
	if (currentImageUrl) {
		formData.set(key, currentImageUrl)
	}
	return true
}
//// 이미지 - S3 핸들링 END ////

// convertToBase64 start
export async function convertToBase64(imageFile: File): Promise<string> {
	const reader = new FileReader()
	return new Promise<string>((resolve, reject) => {
		reader.onloadend = () => {
			if (reader.result) {
				resolve(reader.result as string)
			} else {
				reject(new Error("Failed to convert image to base64"))
			}
		}
		reader.readAsDataURL(imageFile)
	})
}
// convertToBase64 End
