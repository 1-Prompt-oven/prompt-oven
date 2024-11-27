// "use client"

// import { useRef, useState } from "react"
// import { Button } from "@repo/ui/button"
// import type { PromptTopType } from "@/types/prompts/promptsType"
// import PromptTopItemStash from "../molecule/PromptTopItemStash"

// interface PromptsTopListProps {
// 	promptTop: PromptTopType[]
// }

// export default function PromptsTopListStash({
// 	promptTop,
// }: PromptsTopListProps) {
// 	const [angle, setAngle] = useState(0)
// 	const rotateAngle = window.innerWidth < 768 ? 36 : 36
// 	const carouselRef = useRef<HTMLDivElement>(null)

// 	const rotateCarousel = () => {
// 		if (carouselRef.current) {
// 			carouselRef.current.style.transform = `rotateY(${angle}deg)`
// 		}
// 	}

// 	const nextSlide = () => {
// 		setAngle((prevAngle) => prevAngle + rotateAngle)
// 	}

// 	const prevSlide = () => {
// 		setAngle((prevAngle) => prevAngle - rotateAngle)
// 	}

// 	// useEffect(() => {
// 	// 	rotateCarousel()
// 	// }, [angle, rotateCarousel])

// 	return (
// 		<div className="mt-6 flex h-[270px] justify-between">
// 			<div className="flex items-center">
// 				<Button onClick={prevSlide}>Prev</Button>
// 			</div>

// 			<div
// 				className="preserve-3d flex flex-grow justify-center"
// 				ref={carouselRef}>
// 				{promptTop.length > 0
// 					? promptTop.map((item, index) => (
// 							<div
// 								key={item.productUuid}
// 								className="carousel-item"
// 								style={{
// 									transform: `rotateY(${index * rotateAngle}deg) translateZ(300px)`,
// 								}}>
// 								<PromptTopItemStash promptTop={item} rank={index} />
// 							</div>
// 						))
// 					: null}
// 			</div>

// 			<div className="flex items-center">
// 				<Button onClick={nextSlide}>Next</Button>
// 			</div>
// 		</div>
// 	)
// }
