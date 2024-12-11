export interface StatisticHistoryHeader {
  beginDate: string
  endDate: string
}

export interface StatisticHistoryResponse {
  targetDate: string
  memberUUID: string
  viewer: number
  sales: number
  rank: number
  rating: number
  follower: number
}

export interface StatisticHistoryAPIResponse {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  result: StatisticHistoryResponse[];
}