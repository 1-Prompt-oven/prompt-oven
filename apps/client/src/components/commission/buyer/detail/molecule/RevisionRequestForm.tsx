import React, { useState } from "react"
import { Button } from "@repo/ui/button"
import { Textarea } from "@repo/ui/textarea"
import type { RevisionRequest } from "@/types/commission/commissionType"

interface RevisionFormProps {
	commissionId: string
	onSubmit: (revision: RevisionRequest) => void
	onCancel: () => void
}

function RevisionRequestForm({
	commissionId,
	onSubmit,
	onCancel,
}: RevisionFormProps) {
	const [revisionNote, setRevisionNote] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({ commissionId, revisionNote })
	}
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<h3 className="text-lg font-semibold text-white">Revision Request</h3>
				<Textarea
					value={revisionNote}
					onChange={(e) => setRevisionNote(e.target.value)}
					placeholder="Describe what changes you'd like to request..."
					className="min-h-[100px] border-gray-700 bg-gray-900 text-white"
					required
				/>
			</div>
			<div className="flex gap-4">
				<Button type="submit" className="bg-purple-600 hover:bg-purple-700">
					Submit Request
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default RevisionRequestForm