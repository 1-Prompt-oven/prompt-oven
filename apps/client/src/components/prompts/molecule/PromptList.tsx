import PromptCard from "@/components/common/organism/PromptCard"
import type { PromptItemType } from "@/types/prompts/promptsType"

interface PromptsListProps {
	promptList: PromptItemType[]
}

export default function PromptList({ promptList }: PromptsListProps) {
	return (
		<div>
			{promptList.length > 0 ? (
				<ul className="grid grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{promptList.map((item, index) => (
						// eslint-disable-next-line react/no-array-index-key -- index is unique
						<PromptCard productInfo={item} key={item.productUuid + index} />
					))}
				</ul>
			) : (
				<p className="flex h-[400px] items-center justify-center text-center text-gray-500">
					No prompts available.
				</p> // 빈 리스트일 때 메시지 표시
			)}
		</div>
	)
}
