import { Button } from "@repo/ui/button"
import PaymentTitle from "../atom/PaymentTitle"

export default function PaymentOrder() {
	return (
		<div className="flex h-full w-[350px] flex-col gap-4 rounded-md bg-white p-4 text-sm">
			<PaymentTitle title="Message" />
			<textarea
				name="message"
				placeholder="Leave a message"
				className="h-[130px] resize-none rounded-lg border border-[#d8d8d8] p-3"
			/>

			<div className="flex flex-col gap-3 border-t-2 border-black pt-4 font-semibold">
				<div className="flex justify-between">
					<p>Total Order</p>
					<p className="flex gap-2">x7 Product</p>
				</div>
				<div className="flex justify-between">
					<p>Total Payment</p>
					<p className="flex gap-4">
						<span className="text-xl font-bold text-[#9747ff]">$6460</span>
					</p>
				</div>
			</div>

			<Button
				type="submit"
				className="bg-[#9747ff] text-white hover:bg-[#743dbd]">
				<span>Order Now</span>
			</Button>
		</div>
	)
}
