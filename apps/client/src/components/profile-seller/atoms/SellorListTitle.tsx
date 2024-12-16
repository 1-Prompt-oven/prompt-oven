import ChattingButtion from "./ChattingButtion"

interface SellorListTitleProps {
	initialRequest: { sellerUuid: string }
}

export default function SellorListTitle({
	initialRequest,
}: SellorListTitleProps) {
	const { sellerUuid } = initialRequest // sellerUuid 추출

	return (
		<div className="gradient-filter mx-6 flex h-[3.75rem] w-full items-center justify-between rounded-lg border border-white/20 p-4 xl:!w-[86%]">
			<span className="font-mulish text-xl font-bold text-white">
				판매자의 상품 리스트
			</span>
			<ChattingButtion sellerUuid={sellerUuid} />
		</div>
	)
}
