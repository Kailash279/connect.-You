import { Store } from '@/types/store';

interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: string;
}

interface StoresResponse {
  stores: Store[];
  total: number;
  timestamp: string;
}

interface StoreTypesResponse {
  types: string[];
  total: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const handleApiError = (error: any, message: string): never => {
  console.error(`API Error: ${message}`, error);
  throw new Error(error.message || message);
};

export async function fetchStores(type: string = 'all', query: string = ''): Promise<StoresResponse> {
  try {
    const params = new URLSearchParams();
    if (type !== 'all') params.append('type', type);
    if (query) params.append('query', query);

    const response = await fetch(`${API_BASE_URL}/stores?${params}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch stores');
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Failed to fetch stores');
  }
}

export async function fetchStoreTypes(): Promise<StoreTypesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/store-types`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch store types');
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Failed to fetch store types');
  }
}

export async function fetchAnalytics(): Promise<ApiResponse<{
  total_stores: number;
  stores_by_type: Record<string, number>;
  average_rating: number;
  total_reviews: number;
  top_rated: Array<Pick<Store, 'name' | 'rating' | 'type'>>;
}>> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch analytics');
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Failed to fetch analytics');
  }
}

export async function submitFeedback(feedback: {
  rating: number;
  comment: string;
  storeId?: number;
}): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit feedback');
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Failed to submit feedback');
  }
}
