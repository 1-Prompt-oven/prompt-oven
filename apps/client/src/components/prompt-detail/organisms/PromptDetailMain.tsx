import type {
	PromptDetailContentsType,
	PromptDetailInfoType,
} from "@/types/prompt-detail/promptDetailType"
import PromptDetailThumbnail from "../atoms/PromptDetailThumbnail"
import PromptDetailInfo from "./PromptDetailInfo"

interface PromptDetailMainProps {
	contents: PromptDetailContentsType[]
	productUuid: string
	productDetail: PromptDetailInfoType
}

export default function PromptDetailMain({
	contents,
	productUuid,
	productDetail,
}: PromptDetailMainProps) {
	return (
		<div className="rounded-lg">
			<div className="flex flex-col gap-12 lg:!flex-row">
				<PromptDetailThumbnail
					thumbnailUrl={contents[0].contentUrl}
					productUuid={productUuid}
				/>

				<PromptDetailInfo productDetail={productDetail} />
			</div>
		</div>
	)
}
