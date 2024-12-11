export const sellerRoutes = {
	seller: "/seller",
	sellerRegistration: "/seller/registration",
}

// -- middleware에서 사용될 routes
// routes를 추가, 수정할 때마다 middleware.ts에서 routesList를 갱신해줘야 하는 불편함이 있어서 목적에 맞게 따로 분리
export const commonAuthRoutes = {
	promptDetail: "/prompt-detail",
	prompts: "/prompts",
	specialExhibition: "/special-exhibition",
	best: "/best",
}
export const withOutAuthRoutes = {
	signIn: "/sign-in",
	signUp: "/sign-up",
	...commonAuthRoutes,
}
export const withAuthRoutes = {
	...commonAuthRoutes,
	...sellerRoutes,
	cart: "/cart",
	favorite: "/favorite",
	profile: "/profile",
	settings: "/settings",
	dashboard: "/dashboard",
	purchase: "/purchase",
	account: "/account",
}
