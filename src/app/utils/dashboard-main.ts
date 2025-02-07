import React, { SetStateAction } from 'react';
import { PendingFeedbackType } from '../types/dashboard-main';

export const loadMoreFeedbacks = (
  visibleFeedbacks: PendingFeedbackType[],
  allFeedbacks: PendingFeedbackType[],
  setVisibleFeedbacks: React.Dispatch<SetStateAction<PendingFeedbackType[]>>,
  feedbacksPerLoad: number
) => {
  const currentLength = visibleFeedbacks.length;
  const newFeedbacks = allFeedbacks.slice(
    currentLength,
    currentLength + feedbacksPerLoad
  );
  setVisibleFeedbacks((prev) => [...prev, ...newFeedbacks]);
};

export const collapseFeedbacks = (
  setVisibleFeedbacks: React.Dispatch<SetStateAction<PendingFeedbackType[]>>,
  allFeedbacks: PendingFeedbackType[],
  feedbacksPerLoad: number
) => {
  setVisibleFeedbacks(allFeedbacks.slice(0, feedbacksPerLoad));
};

export const getUrgentFeedbacks = (feedbacks: PendingFeedbackType[]) => {
  return (
    feedbacks?.filter((item) => new Date(item.dueDate) <= new Date())?.length ??
    0
  );
};

export const countDueWithinWeek = (feedbacks: PendingFeedbackType[]) => {
  const now = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);

  return (
    feedbacks?.filter((item) => {
      const dueDate = new Date(item.dueDate);
      return dueDate >= now && dueDate <= oneWeekFromNow;
    })?.length ?? 0
  );
};
