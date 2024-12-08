import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { LucideProps } from "@repo/ui/lucide"
import {
	FileText,
	Heart,
	LayoutDashboard,
	LogIn,
	Package,
	Settings,
	ShoppingBag,
	Store,
	TagsIcon,
	User,
	UserPlus,
	Wallet,
} from "@repo/ui/lucide"
import type { UserAuthType } from "@/lib/userAuth.ts"

export type MenuIconType = ForwardRefExoticComponent<
	Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>

export type NavQueryType = Record<string, string>
export interface BaseMenuItemType {
	icon: MenuIconType
	label: string
	href: string
	query: NavQueryType
}
export interface SubMenuItemType extends Omit<BaseMenuItemType, "icon"> {
	icon?: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>
}

export interface MenuNavItemType extends BaseMenuItemType {
	subMenu?: SubMenuItemType[]
}

export interface HeaderNavType
	extends Omit<BaseMenuItemType, "query" | "icon"> {
	icon?: MenuIconType
}

// todo : href를 고정 문자열이 아니라 route 파일에서 값을 받아오게 수정하기
export const mainNavs: HeaderNavType[] = [
	{
		label: "HOME",
		href: "/",
	},
	{
		label: "PROMPTS",
		href: "/prompts",
	},
	{
		label: "SPECIAL EXHIBITION",
		href: "/special-exhibition",
	},
	{
		label: "BEST",
		href: "/best",
	},
]

// ----------------- Avatar Navs -----------------

export const sellerNavs: MenuNavItemType[] = [
	{
		icon: LayoutDashboard,
		label: "Overview",
		href: "/account",
		query: { view: "overview" },
	},
	{
		icon: Package,
		label: "Product",
		href: "account",
		query: { view: "product-list" },
		subMenu: [
			{
				label: "Create Product",
				href: "/account",
				query: { view: "create-product" },
			},
			{
				label: "Product List",
				href: "/account",
				query: { view: "product-list" },
			},
			{
				label: "Category",
				href: "/account",
				query: { view: "product-category" },
			},
		],
	},
	{
		icon: User,
		label: "Profile",
		href: "/account",
		query: { view: "profile" },
	},
	{
		icon: FileText,
		label: "Prompts",
		href: "/account",
		query: { view: "prompts" },
	},
	{
		icon: TagsIcon,
		label: "Sales",
		href: "/account",
		query: { view: "sales" },
	},
	{
		icon: Wallet,
		label: "Payouts",
		href: "/account",
		query: { view: "payouts" },
	},
	{
		icon: ShoppingBag,
		label: "Purchases",
		href: "/account",
		query: { view: "purchases" },
		subMenu: [
			{
				label: "Ongoing",
				href: "/account",
				query: { view: "purchase-ongoing" },
			},
			{
				label: "Completed",
				href: "/account",
				query: { view: "purchase-completed" },
			},
		],
	},
	{
		icon: Heart,
		label: "Favorites",
		href: "/account",
		query: { view: "favorites" },
	},
	{
		icon: Settings,
		label: "Settings",
		href: "/account",
		query: { view: "settings" },
	},
]

export const userNavs: MenuNavItemType[] = [
	{
		label: "To Be Seller",
		href: "/seller/registration",
		query: {},
		icon: Store,
	},
	{
		icon: User,
		label: "Profile",
		href: "/account",
		query: { view: "profile" },
	},
	{
		icon: ShoppingBag,
		label: "Purchases",
		href: "/account",
		query: { view: "purchases" },
	},
	{
		icon: Settings,
		label: "Settings",
		href: "/account",
		query: { view: "settings" },
	},
]

export const guestNavs: MenuNavItemType[] = [
	{
		icon: LogIn,
		label: "Sign In",
		href: "/sign-in",
		query: {},
	},
	{
		icon: UserPlus,
		label: "Sign Up",
		href: "/sign-up",
		query: {},
	},
]

// ----------------- SideBar Menu Navs -----------------

export const getUserAuthNavitems = (userAuth: UserAuthType) => {
	let menuItems!: MenuNavItemType[]
	if (userAuth === "seller" || userAuth === "admin") {
		menuItems = sellerNavs
	} else if (userAuth === "member") {
		menuItems = userNavs
	} else {
		menuItems = guestNavs
	}
	return menuItems
}
