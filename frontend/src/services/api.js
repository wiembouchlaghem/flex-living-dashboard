import axios from "axios";

const API_URL = "/api/reviews";

export const getHostawayReviews = () => axios.get(`${API_URL}/hostaway`);
export const approveReview = (id) => axios.patch(`${API_URL}/hostaway/${id}/approve`);
export const getApprovedReviews = (listingName) => {
  const url = listingName
    ? `${API_URL}/hostaway/approved?listing=${encodeURIComponent(listingName)}`
    : `${API_URL}/hostaway/approved`;
  return axios.get(url);
};
export const getHostawayStats = () => axios.get(`${API_URL}/hostaway/stats/property`);
