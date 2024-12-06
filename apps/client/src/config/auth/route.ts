export const sellerRoutes = {
	seller: "/seller",
	sellerRegistration: "/seller/registration",
}

// -- middleware에서 사용될 routes
// routes를 추가, 수정할 때마다 middleware.ts에서 routesList를 갱신해줘야 하는 불편함이 있어서 목적에 맞게 따로 분리
export const withOutAuthRoutes = {
	signIn: "/sign-in",
	signUp: "/sign-up",
}
export const withAuthRoutes = {
	...sellerRoutes,
	best: "/best",
	cart: "/cart",
	favorite: "/favorite",
	profile: "/profile",
	promptDetail: "/prompt-detail",
	prompts: "/prompts",
	purchase: "/purchase",
	specialExhibition: "/special-exhibition",
	settings: "/settings",
	dashboard: "/dashboard",
	account: "/account",
}


