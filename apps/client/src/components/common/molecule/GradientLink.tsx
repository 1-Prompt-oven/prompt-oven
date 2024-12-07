import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react"
import Link from "next/link"
import GradientButton from "@/components/common/atom/GradientButton.tsx"

interface GradientLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
	innerButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
	children: ReactNode
}

function GradientLink({
	innerButtonProps,
	children,
	href,
	...props
}: GradientLinkProps) {
	return (
		<Link href={href} {...props}>
			<GradientButton {...innerButtonProps}>{children}</GradientButton>
		</Link>
	)
}

export default GradientLink
