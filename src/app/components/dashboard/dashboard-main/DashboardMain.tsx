import { useEffect, useState } from 'react';
import { FeedbackCard } from '../../feedback-card/FeedbackCard';
import { PendingFeedbackType } from '../../../types/dashboard-main';
import {
  collapseFeedbacks,
  countDueWithinWeek,
  getUrgentFeedbacks,
  loadMoreFeedbacks,
} from '../../../utils/dashboard-main';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { fetchPendingFeedbacks } from '../../../redux/slices/pending-feedbacks/pendingFeedbacksSlice';

const DashboardMain = () => {
  const [visibleFeedbacks, setVisibleFeedbacks] = useState<
    PendingFeedbackType[]
  >([]);
  const [urgentFeedbacks, setUrgentFeedbacks] = useState<number>(0);
  const [dueWithinWeekFeedbacks, setDueWithinWeekFeedbacks] =
    useState<number>(0);
  const dispatch = useAppDispatch();
  const { feedbacks, total } = useAppSelector(
    (state) => state.pendingFeedbacks
  );
  const { user } = useAppSelector((state) => state.user);

  const feedbacksPerLoad = 5;

  useEffect(() => {
    if (user?.emailId) dispatch(fetchPendingFeedbacks(user.emailId));
  }, []);

  useEffect(() => {
    setUrgentFeedbacks(getUrgentFeedbacks(feedbacks));
    setDueWithinWeekFeedbacks(countDueWithinWeek(feedbacks));
    setVisibleFeedbacks(feedbacks.slice(0, feedbacksPerLoad));
  }, [feedbacks]);

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Urgent Feedbacks Card */}
        <div className="card bg-white rounded-lg shadow p-6 border-l-4 border-red-500 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Urgent Feedbacks</p>
              <p className="text-2xl font-bold text-red-600">
                {urgentFeedbacks}
              </p>
              <div className="mt-2 flex items-center text-sm text-red-600">
                {/* <i className="fas fa-arrow-up mr-1"></i>
                <span>4 more than yesterday</span> */}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Due This Week Card */}
        <div className="card bg-white rounded-lg shadow p-6 border-l-4 border-orange-500 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Due This Week</p>
              <p className="text-2xl font-bold text-orange-600">
                {dueWithinWeekFeedbacks}
              </p>
              {/* <div className="mt-2 flex items-center text-sm text-orange-600">
                <i className="fas fa-clock mr-1"></i>
                <span>Next 7 days</span>
              </div> */}
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <i className="fas fa-calendar text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Total Pending Card */}
        <div className="card bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-blue-600">{total}</p>
              <div className="mt-2 flex items-center text-sm text-blue-600">
                {/* <i className="fas fa-chart-line mr-1"></i>
                <span>View analytics</span> */}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-list-check text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Feedback List Section */}
      <div className="bg-white rounded-lg shadow">
        {/* List Header */}
        {/* <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Pending Feedbacks: {total}</h2>
        </div> */}

        <div
          className="divide-y overflow-y-auto"
          style={{
            maxHeight: '28rem',
          }}
        >
          {visibleFeedbacks.map((feedback, index) => (
            <FeedbackCard
              key={`${feedback.rateeName}-${index}`}
              feedback={feedback}
            />
          ))}
        </div>

        {visibleFeedbacks.length < feedbacks.length && (
          <div className="p-6 text-center border-t flex justify-center gap-4">
            <button
              onClick={() =>
                loadMoreFeedbacks(
                  visibleFeedbacks,
                  feedbacks,
                  setVisibleFeedbacks,
                  feedbacksPerLoad
                )
              }
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-150"
            >
              Load More Feedbacks
            </button>
          </div>
        )}
        {visibleFeedbacks?.length === feedbacks?.length &&
          visibleFeedbacks?.length > 5 && (
            <div className="p-6 text-center border-t flex justify-center gap-4">
              <button
                onClick={() =>
                  collapseFeedbacks(
                    setVisibleFeedbacks,
                    feedbacks,
                    feedbacksPerLoad
                  )
                }
                className="text-red-600 font-medium hover:text-red-700 transition-colors duration-150"
              >
                Collapse Feedbacks
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default DashboardMain;
