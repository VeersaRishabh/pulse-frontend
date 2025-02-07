import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { getPendingFeedback } from '../../../api';
import { PendingFeedbackType } from '../../../types/dashboard-main';

// Define the shape of the state
interface PendingFeedbackState {
  feedbacks: PendingFeedbackType[];
  total: number;
}

const initialState: PendingFeedbackState = {
  feedbacks: [],
  total: 0,
};

// Feedback slice
const myPendingFeedbackSlice = createSlice({
  name: 'pendingFeedbacks',
  initialState,
  reducers: {
    setPendingFeedbacks(
      state,
      action: PayloadAction<{ feedbacks: any[]; total: number }>
    ) {
      state.feedbacks = action.payload.feedbacks;
      state.total = action.payload.total;
    },
  },
});

// Export actions
export const { setPendingFeedbacks } = myPendingFeedbackSlice.actions;

export default myPendingFeedbackSlice.reducer;

// Thunk for fetching feedbacks
export const fetchPendingFeedbacks =
  (employeeId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await getPendingFeedback(employeeId);
      const total = response?.totalPendingFeedbacks ?? 0;

      const formattedFeedbacks = response.pendingFeedbacks.map(
        (feedback: any) => {
          return {
            pendingFeedbackId: feedback?.pendingFeedbackId,
            rateeId: feedback?.rateeId,
            rateeName: feedback?.rateeName,
            meetingDate: feedback?.meetingDate,
            initials: feedback?.rateeName
              ?.split(' ')
              .map((item: string) => item[0]?.toUpperCase())
              .join(''),
            dueDate: feedback?.dueDate,
            status: feedback?.status,
          };
        }
      );
      const sortedPendingFeedbacks =
        formattedFeedbacks.sort(
          (a: PendingFeedbackType, b: PendingFeedbackType) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        ) ?? [];

      dispatch(
        setPendingFeedbacks({
          feedbacks: sortedPendingFeedbacks,
          total,
        })
      );
    } catch (error) {
      dispatch(
        setPendingFeedbacks({
          feedbacks: [],
          total: 0,
        })
      );
      console.error('Failed to fetch pending feedbacks:', error);
    }
  };
