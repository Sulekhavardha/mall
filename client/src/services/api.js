const API_BASE = '/api';

export const api = {
  // Stores
  async getStores(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/stores${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch stores');
    return res.json();
  },

  // Bookings
  async getBookings() {
    const res = await fetch(`${API_BASE}/bookings`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create booking');
    }
    return res.json();
  },

  async cancelBooking(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to cancel booking');
    return res.json();
  },

  // Concierge & Visit Plans
  async getInquiries() {
    const res = await fetch(`${API_BASE}/concierge`);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async createInquiry(inquiryData) {
    const res = await fetch(`${API_BASE}/concierge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to submit concierge inquiry');
    }
    return res.json();
  },

  // Stats & Health
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Failed to fetch health');
    return res.json();
  },
};

