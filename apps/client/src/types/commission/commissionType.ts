export interface CommissionFormDataType {
	title: string
	description: string
	price: number
	deadline: string
}

export type CommissionStatus =
	| "REQUESTED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "REVISION_REQUESTED"
	| "REVISION_COMPLETED"
	| "REJECTED"

export interface CommissionListResponseType {
	commissionUuid: string
	title: string
	clientUuid: string
	creatorUuid: string
	price: number
	deadline: string
	status: CommissionStatus
	requestedDate: string
}

export interface CommissionListType extends CommissionListResponseType {
	clientName: string
	creatorName: string
}

export interface CommissionDetailType {
	commissionUuid: string
	clientUuid: string
	clientName: string
	creatorUuid: string
	creatorName: string
	commissionTitle: string
	commissionDescription: string
	commissionPrice: number
	commissionDeadline: string
	commissionModel: string
	commissionRequest: string
	commissionModifyRequest: string
	commissionStatus: CommissionStatus
	commissionResult: string
	role: string
}

export interface RevisionRequestType {
	commissionUuid: string
	commissionModifyRequest: string
}

export interface Requester {
	id: string
	name: string
}

export interface CreateCommissionRequestType {
	commissionTitle: string
	clientUuid: string
	creatorUuid: string
	commissionDescription: string
	commissionPrice: number
	commissionDeadline: string
	commissionModel: string
	commissionRequest: string
	commissionModifyRequest?: string
}

export interface CommissionStatusUpdateRequestType {
	commissionUuid: string
	status: CommissionStatus
}
