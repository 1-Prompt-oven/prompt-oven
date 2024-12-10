'use server'
import { getMemberUUID } from '@/lib/api/sessionExtractor';
import { StatisticHistoryAPIResponse, StatisticHistoryResponse } from '@/types/dashboard/DashboardType';

export const fetchStatisticHistory = async (
  beginDate: string,
  endDate: string
): Promise<StatisticHistoryResponse[]> => {
const memberUUID = await getMemberUUID()
const url = `${process.env.API_BASE_URL}/v1/profile/history/${memberUUID}/${beginDate}/${endDate}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: StatisticHistoryAPIResponse = await response.json();
    if (!data.isSuccess) {
      throw new Error(`API error! message: ${data.message}`);
    }
    return data.result;
};
