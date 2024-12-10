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
	result?: string
}

export interface RevisionRequest {
	commissionId: string
	revisionNote: string
}
