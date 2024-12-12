import type { HTMLAttributes } from "react"
import { commonNavs } from "@/lib/navigation.ts"
import NavLink from "@/components/common/atom/NavLink.tsx"
import { cn } from "@/lib/utils.ts"

type MainHeaderLinkListProps = HTMLAttributes<HTMLUListElement>

function MainHeaderLinkList({ ...props }: MainHeaderLinkListProps) {
	return (
		<ul
			{...props}
			className={cn(
				"mx-4 hidden items-center gap-6 xl:!flex",
				props.className,
			)}>
			{commonNavs.map((nav, index) => (
				// eslint-disable-next-line react/no-array-index-key -- index is unique
				<li key={index}>
					<NavLink href={nav.href} color="#969696" activeColor="#A913F9">
						{nav.label}
					</NavLink>
				</li>
			))}
		</ul>
	)
}

export default MainHeaderLinkList
