interface RevisionNoteDisplayProps {
	note: string
}

function RevisionNoteDisplay({ note }: RevisionNoteDisplayProps) {
	return (
		<div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
			<h3 className="mb-2 text-lg font-semibold text-yellow-500">
				Revision Requested
			</h3>
			<p className="text-gray-300">{note}</p>
		</div>
	)
}

export default RevisionNoteDisplay
