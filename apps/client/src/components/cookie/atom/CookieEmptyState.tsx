import { Cookie } from "@repo/ui/lucide"

export function CookieEmptyState() {
	return (
		<div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-white/15 bg-[#111111]">
			<Cookie className="mb-4 h-16 w-16 text-[#E2ADFF]" />
			<h3 className="mb-2 text-xl font-semibold text-white">
				No cookie record found
			</h3>
			<p className="max-w-[300px] text-center text-sm text-gray-400">
				There are no cookie record.
			</p>
		</div>
	)
}
