import AmazonPayNone from "./off/AmazonPayNone"
import ApplePayNone from "./off/ApplePayNone"
import MasterCardNone from "./off/MasterCardNone"
import PaypalNone from "./off/PaypalNone"
import StripeNone from "./off/StripeNone"
import AmazonPay from "./on/AmazonPay"
import ApplePay from "./on/ApplePay"
import MasterCard from "./on/MasterCard"
import Paypal from "./on/Paypal"
import Stripe from "./on/Stripe"

const MethodGroup = {
	// general: [
	// 	{ label: "CARD" },
	// 	{ label: "TRANSFER" },
	// 	{ label: "VIRTUAL_ACCOUNT" },
	// 	{ label: "MOBILE_PHONE" },
	// 	{ label: "CULTURE_GIFT_CERTIFICATE" },
	// 	{ label: "FOREIGN_EASY_PAY" },
	// ],
	eWallet: [
		{
			icon: <MasterCard />,
			iconNone: <MasterCardNone />,
			label: "Master Card",
		},
		{ icon: <Paypal />, iconNone: <PaypalNone />, label: "Paypal" },
		{ icon: <AmazonPay />, iconNone: <AmazonPayNone />, label: "Amazon Pay" },
		{ icon: <ApplePay />, iconNone: <ApplePayNone />, label: "Apple Pay" },
		{ icon: <Stripe />, iconNone: <StripeNone />, label: "Toss Payments" },
	],
	bankbook: [
		{ icon: <AmazonPay />, iconNone: <AmazonPayNone />, label: "Amazon Pay" },
		{ icon: <ApplePay />, iconNone: <ApplePayNone />, label: "Apple Pay" },
		{ icon: <Stripe />, iconNone: <StripeNone />, label: "Toss Payments" },
	],
}

export default MethodGroup
