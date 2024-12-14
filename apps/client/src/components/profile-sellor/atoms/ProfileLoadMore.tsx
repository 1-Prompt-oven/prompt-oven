import React from "react"

// interface ProfileLoadMoreProps {
// 	onClick: () => void
// 	loading: boolean
// }

export default function ProfileLoadMore() {
	return (
		<div className="mt-20 flex justify-center">
			<button
				type="button"
				className="rounded-full bg-[#fc466b] px-6 py-3 text-white">
				Load More
			</button>
		</div>
	)
}

/* <button
				onClick={onClick}
				className={`rounded bg-blue-500 px-4 py-2 text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`}
				disabled={loading}>
				{loading ? "Loading..." : "Load More"}
			</button> */
