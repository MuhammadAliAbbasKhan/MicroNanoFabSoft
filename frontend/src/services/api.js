import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const getAdminHeaders = () => {
  const passcode = localStorage.getItem('adminPasscode') || 'aliabbas1234578!';
  return {
    'X-Admin-Passcode': passcode
  };
};

export const healthCheck = async () => {
  const res = await axios.get(`${API_BASE_URL}/health/`);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/products/`);
  return res.data;
};

export const requestTrial = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/request-trial/`, data);
  return res.data;
};

export const contactInquiry = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/contact/`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/signup/`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/login/`, data);
  return res.data;
};

export const processSubscription = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/subscribe/`, data);
  return res.data;
};

export const createStripePaymentIntent = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/stripe/create-payment-intent/`, data);
  return res.data;
};

export const submitServiceRequest = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/service-request/`, data);
  return res.data;
};

export const getUserServiceRequests = async (email) => {
  const res = await axios.get(`${API_BASE_URL}/service-request/my-requests/`, {
    params: { email }
  });
  return res.data;
};

export const getAdminAnalytics = async () => {
  const res = await axios.get(`${API_BASE_URL}/admin/analytics/`, {
    headers: getAdminHeaders()
  });
  return res.data;
};

export const getMongoDBStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/admin/mongodb-status/`, {
    headers: getAdminHeaders()
  });
  return res.data;
};

export const listAdminUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/admin/users/`, {
    headers: getAdminHeaders()
  });
  return res.data;
};

export const updateAdminUserPlan = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/admin/users/update-plan/`, data, {
    headers: getAdminHeaders()
  });
  return res.data;
};
