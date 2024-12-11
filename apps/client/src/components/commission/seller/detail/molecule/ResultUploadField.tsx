import { useState } from "react"
import { Button } from "@repo/ui/button"
import { Textarea } from "@repo/ui/textarea"

interface ResultUploadProps {
	onUpload: (result: string) => void
}

function ResultUploadField({ onUpload }: ResultUploadProps) {
	const [result, setResult] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onUpload(result)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Textarea
				value={result}
				onChange={(e) => setResult(e.target.value)}
				placeholder="Enter the commission result here..."
				className="min-h-[200px] border-gray-700 bg-gray-900 text-white"
				required
			/>
			<Button type="submit" className="bg-purple-600 hover:bg-purple-700">
				Upload Result
			</Button>
		</form>
	)
}

export default ResultUploadField
