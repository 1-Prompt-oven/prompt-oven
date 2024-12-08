import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"
import { Button } from "@repo/ui/button"
import { ThreeDots } from "react-loader-spinner"

interface DeleteConfirmDialogProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	productName: string
	isLoading: boolean
}
function SpDeleteProductConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	productName,
	isLoading,
}: DeleteConfirmDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="border-[#E2ADFF]/25 bg-[#120F1E] text-white">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this product?
					</DialogTitle>
					<DialogDescription className="text-gray-400">
						This action cannot be undone. This will permanently delete the
						product &#34;{productName}&#34;.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={onClose}
						className="border-white/15 bg-transparent text-white hover:bg-white/5">
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={onConfirm}
						className="bg-red-600 text-white hover:bg-red-700"
						disabled={isLoading}>
						{isLoading ? (
							<ThreeDots color="#ffffff" height={24} width={24} />
						) : (
							"Delete"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default SpDeleteProductConfirmDialog
