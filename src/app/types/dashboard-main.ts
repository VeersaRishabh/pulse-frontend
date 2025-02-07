export interface PendingFeedbackType {
  pendingFeedbackId: string;
  rateeName: string;
  rateeId: string;
  meetingDate: string | Date;
  designation: string;
  initials: string;
  dueDate: string | Date;
  status: string;
}
