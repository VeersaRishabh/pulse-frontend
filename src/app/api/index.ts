import axios from 'axios';

//const BASE_URL = 'http://localhost:5248/api/Feedback'; // Update with your actual backend URL
const BASE_URL = 'https://pulse-api-latest.onrender.com/api/Feedback';

export const submitFeedback = async (feedback: any) => {
  // try {
  const response = await axios.post(`${BASE_URL}`, feedback);
  return response.data;
  // } catch (error: any) {
  //   console.error(
  //     'Error submitting feedback:',
  //     error.response?.data || error.message
  //   );
  // }
};

export const getFeedback = async (employeeId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${employeeId}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error getting feedback:',
      error.response?.data || error.message
    );
  }
};

export const getPendingFeedback = async (employeeId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pendingfeedback/${employeeId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error getting pending feedback:',
      error.response?.data || error.message
    );
  }
};
