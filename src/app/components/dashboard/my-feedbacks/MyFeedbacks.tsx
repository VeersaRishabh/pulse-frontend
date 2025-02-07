import React, { useState, useEffect } from 'react';
import { getFeedback } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { fetchFeedbacks } from '../../../redux/slices/my-feedbacks/myFeedbackSlice';
import { FeedbackType } from '../../../types/feedback';

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([
    // {
    //   id: 1,
    //   rating: 4,
    //   comment: 'Excellent team player and always delivers high-quality work!',
    //   givenBy: {
    //     name: 'John Smith',
    //     designation: 'Senior Developer',
    //     profilePicture:
    //       'https://i1.sndcdn.com/avatars-000339084123-nag0p1-t240x240.jpg',
    //   },
    //   createdAt: new Date('2024-03-15'),
    // },
    // {
    //   id: 2,
    //   rating: 3,
    //   comment: 'Great communication skills and reliable performance.',
    //   givenBy: {
    //     name: 'Sarah Johnson',
    //     designation: 'Project Manager',
    //     profilePicture:
    //       'https://i.pinimg.com/280x280_RS/60/aa/f6/60aaf6de5a1fd948969fb8c5f866c1ee.jpg',
    //   },
    //   createdAt: new Date('2024-03-10'),
    // },
  ]);
  const { user } = useAppSelector((state) => state.user);

  const myFeedbacks = useAppSelector((state) => state.myFeedbacks);

  const dispatch = useAppDispatch();

  const getRatingEmoji = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'poor.svg';
      case 2:
        return 'okay.svg';
      case 3:
        return 'good.svg';
      default:
        return 'impressive.svg';
    }
  };

  useEffect(() => {
    // if (!myFeedbacks?.length) {
    if (user?.emailId) dispatch(fetchFeedbacks(user.emailId));
    // }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 pb-4 mb-6 border-b border-gray-200">
        My Feedbacks
      </h2>

      {/* Feedback List */}
      <div className="space-y-6">
        {myFeedbacks && myFeedbacks?.length ? (
          myFeedbacks?.map((feedback: any) => (
            <div
              key={feedback.feedbackId}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              {/* Feedback Header */}
              <div className="flex justify-between items-center mb-4">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  {/* <img
                    // src={feedback?.givenBy?.profilePicture}
                    alt={feedback?.raterId}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {feedback?.feedbackText}
                    </p>
                  </div>
                  <div>
                    {/* <h3 className="font-semibold text-gray-800">
                      {feedback?.raterId}
                    </h3> */}
                    {/* <span className="text-sm text-gray-600">
                    {feedback?.givenBy?.designation}
                  </span> */}
                  </div>
                </div>

                {/* Rating Emoji */}
                <span className="text-xl" title={'Rating: ' + feedback?.rating}>
                  <img
                    className="transition-transform group-hover:scale-110 w-12 h-12"
                    src={require(`../../../../assets/emoji/${getRatingEmoji(
                      feedback?.rating
                    )}`)}
                    // src={require(`../../../assets/emoji/${getRatingEmoji(
                    //   feedback?.rating
                    // )}`)}
                    alt={`Rating: ${feedback?.rating}`}
                  />
                </span>
              </div>

              {/* Feedback Content */}
              {/* <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {feedback?.feedbackText}
                </p>
              </div> */}

              {/* Feedback Footer */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {new Date(feedback?.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No Feedbacks</div>
        )}
      </div>
    </div>
  );
};

export default MyFeedbacks;
