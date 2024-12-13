const DEFAULT_IMAGES = [
	"/img/product/thumbnail/poi-01.webp",
	"/img/product/thumbnail/poi-02.webp",
	"/img/product/thumbnail/poi-03.webp",
	"/img/product/thumbnail/poi-04.webp",
	"/img/product/thumbnail/poi-05.webp",
	"/img/product/thumbnail/poi-06.webp",
	"/img/product/thumbnail/poi-07.webp",
	"/img/product/thumbnail/poi-08.webp",
	"/img/product/thumbnail/poi-09.webp",
	"/img/product/thumbnail/poi-10.webp",
	"/img/product/thumbnail/poi-11.webp",
	"/img/product/thumbnail/poi-12.webp",
	"/img/product/thumbnail/poi-13.webp",
	"/img/product/thumbnail/poi-14.webp",
	"/img/product/thumbnail/poi-15.webp",
]

const DEFAULT_TEXT_PRODUCT_IMAGES = [
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-01.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-02.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-03.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-04.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-05.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-06.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-07.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-08.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-09.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-10.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-11.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-12.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-13.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-14.webp",
	"https://promptoven.s3.ap-northeast-2.amazonaws.com/product/product-text-default/poi-15.webp",
]

export const getProductImage = (
	productName: string,
	thumbnail?: string,
): string => {
	if (thumbnail) return thumbnail
	const index =
		Math.abs(getProductThumbnailHash(productName)) % DEFAULT_IMAGES.length
	return DEFAULT_IMAGES[index]
}

export const setDefaultTextProductImage = (productName: string) => {
	const index =
		Math.abs(getProductThumbnailHash(productName)) %
		DEFAULT_TEXT_PRODUCT_IMAGES.length
	return DEFAULT_TEXT_PRODUCT_IMAGES[index]
}

const getProductThumbnailHash = (str: string): number => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		// eslint-disable-next-line no-bitwise -- it's a hash function
		hash = (hash << 5) - hash + char
		// eslint-disable-next-line no-bitwise --  it's a hash function
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}
