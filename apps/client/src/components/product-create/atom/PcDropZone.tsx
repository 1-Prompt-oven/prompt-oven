import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { FileUp, Pencil } from "@repo/ui/lucide"

interface PcDropZoneProps {
	onFileDrop?: (file: File) => void
}

function PcDropZone({ onFileDrop }: PcDropZoneProps) {
	const [file, setFile] = useState<File | null>(null)

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				setFile(acceptedFiles[0])
				onFileDrop ? onFileDrop(acceptedFiles[0]) : null
			}
		},
		[onFileDrop],
	)

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".png", ".jpg", ".gif"],
		},
		noClick: true,
		noKeyboard: true,
	})

	const handleEditClick = (event: React.MouseEvent | React.KeyboardEvent) => {
		event.stopPropagation()
		if (!file) {
			open()
		}
	}

	return (
		<div
			{...getRootProps()}
			role="button"
			tabIndex={0}
			onClick={handleEditClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleEditClick(e)
				}
			}}
			className={`"overflow-hidden relative flex h-60 w-44 !cursor-auto flex-col items-center justify-center gap-2 rounded-lg border-2 border-[#CBD5E1] bg-[#2F2F2F] p-8 py-8 ${
				file ? "" : "!cursor-pointer"
			}`}>
			<input {...getInputProps()} />

			{file ? (
				<>
					<Image
						src={URL.createObjectURL(file)}
						alt={file.name}
						fill
						className="rounded-md object-cover"
					/>

					<button
						type="button"
						onClick={open}
						className="absolute right-2 top-2 flex cursor-pointer items-center justify-center rounded-full bg-white p-1 opacity-0 transition-opacity hover:opacity-100">
						<Pencil className="h-5 w-5 text-po-black-150" />
					</button>
				</>
			) : (
				<FileUp className="h-8 w-8 text-slate-400" />
			)}
		</div>
	)
}

export default PcDropZone
