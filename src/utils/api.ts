const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchStores(type: string = 'all', query: string = '') {
  const params = new URLSearchParams();
  if (type !== 'all') params.append('type', type);
  if (query) params.append('query', query);

  try {
    const response = await fetch(`${API_BASE_URL}/stores?${params}`);
    if (!response.ok) throw new Error('Failed to fetch stores');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
}

export async function fetchStoreTypes() {
  try {
    const response = await fetch(`${API_BASE_URL}/store-types`);
    if (!response.ok) throw new Error('Failed to fetch store types');
    return await response.json();
  } catch (error) {
    console.error('Error fetching store types:', error);
    throw error;
  }
}

export async function fetchAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

export async function submitFeedback(feedback: {
  rating: number;
  comment: string;
  storeId?: number;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) throw new Error('Failed to submit feedback');
    return await response.json();
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}
