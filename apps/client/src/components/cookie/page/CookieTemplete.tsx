import type { GetCookieListRequestType } from "@/types/cookie/cookieResponseType"
import { getCookieList } from "@/action/cookie/cookieAction"
import CookieHistory from "../molecule/CookieHistory"
import CookieCharge from "../molecule/CookieCharge"
import CookieTitle from "../atom/CookieTitle"
import CookieRemain from "../molecule/CookieRemain"

export interface CookieTempleteProps {
	userUuid: string // 필수
	searchParams: GetCookieListRequestType
}

export default async function Cookie({
	userUuid,
	searchParams,
}: CookieTempleteProps) {
	const request: GetCookieListRequestType = {
		userUuid,
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Ensures robust fallback for potential nullish values
		startDate: searchParams?.startDate ?? "",
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Ensures robust fallback for potential nullish values
		endDate: searchParams?.endDate ?? "",
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Optional properties
		paymentType: searchParams?.paymentType,
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Optional properties
		lastId: searchParams?.lastId,
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Fallback default value
		pageSize: searchParams?.pageSize ?? 10,
	}

	const initData = (await getCookieList(request)).result

	return (
		<div className="mx-auto mt-4 flex max-w-screen-xl flex-col gap-8">
			<CookieTitle />
			<div className="flex justify-between px-8">
				<CookieRemain />
				<CookieCharge />
			</div>
			<CookieHistory initData={initData} initRequest={request} />
			{/* <CookieGuidance /> */}
		</div>
	)
}
