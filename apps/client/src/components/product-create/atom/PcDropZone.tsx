import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { FileUp, Pencil } from "@repo/ui/lucide"

interface PcDropZoneProps {
	onFileDrop?: (file: File) => void
	currentImage: File | null
	resetImage?: () => void
}

function PcDropZone({ onFileDrop, currentImage }: PcDropZoneProps) {
	const [error, setError] = useState<string>("")

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setError("")
			if (acceptedFiles.length > 0) {
				onFileDrop ? onFileDrop(acceptedFiles[0]) : null
			}
		},
		[onFileDrop],
	)

	const onDropRejected = useCallback(() => {
		setError("File size is larger than 5MB")
	}, [])

	const onFileDialogOpen = useCallback(() => {
		setError("")
	}, [])

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		onDropRejected,
		onFileDialogOpen,
		accept: {
			"image/*": [".jpeg", ".png", ".jpg", ".gif"],
		},
		noClick: true,
		noKeyboard: true,
		maxSize: 5 * 1024 * 1024,
	})

	const handleEditClick = (event: React.MouseEvent | React.KeyboardEvent) => {
		event.stopPropagation()
		if (!currentImage) {
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
				currentImage ? "" : "!cursor-pointer"
			}`}>
			<input {...getInputProps()} />

			{currentImage ? (
				<>
					<Image
						src={URL.createObjectURL(currentImage)}
						alt={currentImage.name}
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
				<>
					<FileUp className="h-8 w-8 text-slate-400" />
					{error ? (
						<span className="mt-2 text-center text-xs text-red-500">
							{error}
						</span>
					) : null}
				</>
			)}
		</div>
	)
}

export default PcDropZone
