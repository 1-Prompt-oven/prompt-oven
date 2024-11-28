import PaymentTitle from "../atom/PaymentTitle"
import PaymentRadioGroup from "../molecule/PaymentRadioGroup"
import PaymentSelect from "../molecule/PaymentSelect"
import methodGroup from "../atom/icon/MethodGroup"

interface SelectedMethod {
	type: keyof typeof methodGroup // methodGroup 객체의 키 중 하나를 선택할 수 있는 타입
	payment?: string // 선택된 결제 방법
}

interface PaymentMethodProps {
	method: SelectedMethod // selectedMethod를 props로 받음
	setMethod: React.Dispatch<React.SetStateAction<SelectedMethod>> // setSelectedMethod를 props로 받음
}

export default function PaymentMethod({
	method,
	setMethod,
}: PaymentMethodProps) {
	// const [selectedMethod, setSelectedMethod] = useState<{
	// 	type: keyof typeof methodGroup // keyof : methodGroup 객체의 키 중 하나를 선택할 수 있는 타입
	// 	payment?: string
	// }>({
	// 	type: "eWallet", // 기본 결제 유형
	// 	payment: undefined, // 선택된 결제 방법
	// })

	const handleSelectChange = (value: keyof typeof methodGroup) => {
		setMethod({ type: value, payment: undefined }) // 결제 유형 변경 시 결제 방법 초기화
	}

	const onChangePayment = (value: string) => {
		setMethod((prev) => ({ ...prev, payment: value }))
	}

	const currentMethodGroup = methodGroup[method.type]

	return (
		<div className="flex h-[380px] flex-col gap-4 overflow-y-auto rounded-md bg-white p-4">
			<PaymentTitle title="Select Payment Method" />
			<PaymentSelect
				// selectedType={selectedMethod.type}
				onSelectChange={handleSelectChange}
			/>
			<PaymentRadioGroup
				currentMethodGroup={currentMethodGroup}
				selectedPayment={method.payment}
				onChangePayment={onChangePayment}
			/>
		</div>
	)
}
