interface PaymentTitleProps {
	title: string
}

export default function PaymentTitle({ title }: PaymentTitleProps) {
	return (
		<p className="font-semibold">
			<span className="text-sm">{title}</span>
		</p>
	)
}
