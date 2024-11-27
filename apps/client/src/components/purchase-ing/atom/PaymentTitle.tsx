interface PaymentTitleProps {
	title: string
	option?: string
}

export default function PaymentTitle({ title, option }: PaymentTitleProps) {
	return (
		<p className={`font-semibold ${option ? option : ""}`}>
			<span className="text-sm">{title}</span>
		</p>
	)
}
