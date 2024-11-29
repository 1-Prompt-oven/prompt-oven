import CommonMethodSvg from "./CommonMethodSvg"
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
	general: [
		{
			icon: <CommonMethodSvg isActive={true} word="Card" pixel="8" />,
			iconNone: <CommonMethodSvg isActive={false} word="Card" pixel="8" />,
			label: "CARD",
		},
		{
			icon: <CommonMethodSvg isActive={true} word="Trans" pixel="8" />,
			iconNone: <CommonMethodSvg isActive={false} word="Trans" pixel="8" />,
			label: "TRANSFER",
		},
		{
			icon: <CommonMethodSvg isActive={true} word="VirAcc" pixel="7" />,
			iconNone: <CommonMethodSvg isActive={false} word="VirAcc" pixel="7" />,
			label: "VIRTUAL_ACCOUNT",
		},
		{
			icon: <CommonMethodSvg isActive={true} word="MobPH" pixel="7" />,
			iconNone: <CommonMethodSvg isActive={false} word="MobPH" pixel="7" />,
			label: "MOBILE_PHONE",
		},
		{
			icon: <CommonMethodSvg isActive={true} word="CGC" pixel="9" />,
			iconNone: <CommonMethodSvg isActive={false} word="CGC" pixel="9" />,
			label: "CULTURE_GIFT_CERTIFICATE",
		},
		{
			icon: <CommonMethodSvg isActive={true} word="FEP" pixel="9" />,
			iconNone: <CommonMethodSvg isActive={false} word="FEP" pixel="9" />,
			label: "FOREIGN_EASY_PAY",
		},
	],
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
}

export default MethodGroup
