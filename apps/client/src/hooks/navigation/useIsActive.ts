import { usePathname, useSearchParams } from "next/navigation"

interface ActiveLink {
	href: string
	query: Record<string, string>
}

export function useIsActive() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const isActive = ({ href, query }: ActiveLink): boolean => {
		// Check if the current pathname matches the href
		if (pathname !== href) {
			return false
		}

		// Check if all query parameters match
		for (const [key, value] of Object.entries(query)) {
			if (searchParams.get(key) !== value) {
				return false
			}
		}

		return true
	}

	return isActive
}
