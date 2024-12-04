export interface SearchResultPromptType {
	id: string
	model: string
	title: string
	rating: number
	price: string
	thumbnail: string
}

export interface SearchResultCreatorType {
	backgroundImg: string
	thumbnail: string
	nickname: string
	rank: number
	rating: number
	follower: number
	id: string
}
