import { ThreeDots } from "react-loader-spinner"

export default function Generating() {
	return (
		<div className="mb-8 flex flex-col items-center justify-center">
			<ThreeDots
				visible
				height="80"
				width="80"
				color="#A913F9"
				radius="9"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
			<span className="text-xl font-medium leading-[150%] text-white">
				이미지를 생성하고 있습니다...
			</span>
		</div>
	)
}
