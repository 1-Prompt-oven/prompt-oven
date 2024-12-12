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
	| "REJECTED"

export interface CommissionListType {
	commissionUuid: string
	title: string
	clientUuid: string
	price: number
	deadline: string
	status: CommissionStatus
	requestedDate: string
}

export interface CommissionDetailType {
	commissionUuid: string
	clientUuid: string
	creatorUuid: string
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

export interface RevisionRequest {
	commissionId: string
	revisionNote: string
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
