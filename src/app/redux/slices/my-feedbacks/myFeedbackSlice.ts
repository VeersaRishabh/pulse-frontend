import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedback } from '../../../api';
import { AppDispatch } from '../../store';
import { FeedbackType } from '../../../types/feedback';

// Define the state type
// interface FeedbackState {
//   feedbacks: FeedbackType[];
// }

// Initial state
const initialState: any = [];

// Feedback slice
const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    setFeedbacks(state, action: PayloadAction<FeedbackType[]>) {
      return action.payload;
    },
  },
});

// Export actions
export const { setFeedbacks } = feedbackSlice.actions;

export default feedbackSlice.reducer;

// Thunk for fetching feedbacks
export const fetchFeedbacks =
  (employeeId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await getFeedback(employeeId);
      if (Array.isArray(response)) {
        dispatch(setFeedbacks(response));
      } else {
        dispatch(setFeedbacks([]));
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  };
