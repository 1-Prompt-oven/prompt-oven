export interface CommissionFormDataType {
	title: string
	description: string
	price: number
	deadline: string
}

export type CommissionStatus =
	| "requested"
	| "in_progress"
	| "completed"
	| "revision_requested"
	| "rejected"

export interface Commission {
	id: string
	title: string
	description: string
	price: number
	deadline: string
	status: CommissionStatus
	createdAt: string
	requester: Requester
	result?: string
	revisionNote?: string
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
