import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
// import { TossTest } from "./TossTest"

export default function PaymentToss() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					className="w-full bg-[#9747ff] py-2 text-white hover:bg-[#743dbd]">
					<span className="py-1">Order Now</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="h-[600px] min-w-[400px] max-w-[500px] rounded border-none bg-white lg:h-[700px] lg:min-w-[600px] lg:max-w-[900px]">
				<DialogHeader className="mb-4 ml-4 flex flex-row items-center gap-4 lg:mb-0">
					<DialogTitle className="font-bold text-white" />
					<DialogDescription className="!mt-0 text-lg font-bold text-black" />
				</DialogHeader>
				{/* <TossTest /> */}
			</DialogContent>
		</Dialog>
	)
}
