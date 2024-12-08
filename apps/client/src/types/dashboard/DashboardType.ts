export interface StatisticHistoryHeader {
  memberUUID : string,
  targetDate : Date
}

export interface StatisticHistoryResponse {
  targetDate: string;
  memberUUID: string;
  viewer: number;
  sales: number;
  rank: number;
  rating: number;
  follower: number;
}