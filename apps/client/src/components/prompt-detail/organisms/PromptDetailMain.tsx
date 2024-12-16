import type {
	PromptDetailContentsType,
	PromptDetailInfoType,
} from "@/types/prompt-detail/promptDetailType"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"
import PromptDetailThumbnail from "../atoms/PromptDetailThumbnail"
import PromptDetailChoice from "../molecules/PromptDetailChoice"
import PromptDetailContents from "../molecules/PromptDetailContents"
import PromptDetailInfo from "./PromptDetailInfo"

interface PromptDetailMainProps {
	contents: PromptDetailContentsType[]
	productDetail: PromptDetailInfoType
	userCookie: CookieLatestType
}

export default async function PromptDetailMain({
	contents,
	productDetail,
	userCookie,
}: PromptDetailMainProps) {
	return (
		<div className="rounded-lg">
			<div className="flex flex-col gap-12 lg:!flex-row">
				<div className="flex flex-col gap-6">
					<PromptDetailThumbnail contents={contents} />
					<PromptDetailChoice productUuid={productDetail.productUuid} />
				</div>
				<div className="flex flex-col gap-6">
					<PromptDetailInfo productDetail={productDetail} />
					<PromptDetailContents
						productContents={productDetail.contents}
						userCookie={userCookie}
					/>
				</div>
			</div>
		</div>
	)
}
