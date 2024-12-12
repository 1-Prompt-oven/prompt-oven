  'use server'
import { getAuthHeaders } from '@/lib/api/headers';
import { getMemberUUID } from '@/lib/api/sessionExtractor';
import type { SalesStatisticHistoryAPIResponse, SalesStatisticHistoryResonpnse, StatisticHistoryAPIResponse, StatisticHistoryResponse } from '@/types/dashboard/DashboardType';

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
      cache: "no-cache",
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

export const fetchSettlementHistory = async (
  beginDate: string,
  endDate: string
): Promise<SalesStatisticHistoryResonpnse[]> => {
  const sellerUUID = await getMemberUUID()
  const headers = await getAuthHeaders()
  const url = `${process.env.API_BASE_URL}/v2/seller/settlement/history/${sellerUUID}/${beginDate}/${endDate}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: SalesStatisticHistoryAPIResponse = await response.json();
  if (!data.isSuccess) {
    throw new Error(`API error! message: ${data.message}`);
  }
  return data.result;
};
