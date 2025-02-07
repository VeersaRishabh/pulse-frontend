export interface FeedbackType {
  feedbackId: string;
  feedbackText: string;
  rateeId: string;
  raterId: string;
  rating: number;
  timestamp: string | Date;
}
