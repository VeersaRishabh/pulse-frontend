import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Feedback.scss';
import { submitFeedback } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';
import { fetchPendingFeedbacks } from '../../redux/slices/pending-feedbacks/pendingFeedbacksSlice';
import { toast, ToastContainer } from 'react-toastify';

const FeedbackComponent = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    feedbackText: '',
  });
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [ratingOptions] = useState([
    { value: 1, label: 'POOR', name: 'Poor' },
    { value: 2, label: 'OKAY', name: 'Okay' },
    { value: 3, label: 'GOOD', name: 'Good' },
    { value: 4, label: 'IMPRESSIVE', name: 'Impressive' },
  ]);
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const { feedbacks } = useAppSelector((state) => state.pendingFeedbacks);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Handle changes in the form inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFeedbackForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle rating changes
  const onRatingChange = (rating: any) => {
    setFeedbackForm((prevState) => ({
      ...prevState,
      rating,
    }));
  };

  // Handle form submission
  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const feedbackData = feedbacks.find(
        (feedback) => feedback.pendingFeedbackId === id
      );
      console.log(feedbackForm, feedbackData);
      if (feedbackForm.rating && user) {
        await submitFeedback({
          pendingFeedbackId: id,
          raterId: user.emailId,
          raterName: user.name,
          rateeId: feedbackData?.rateeId,
          rateeName: feedbackData?.rateeName,
          rating: feedbackForm?.rating,
          feedbackText: feedbackForm?.feedbackText,
        });

        setShowThankYouMessage(true);
        setFeedbackForm({
          rating: 0,
          feedbackText: '',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      }
    } catch (e: any) {
      if (e.response?.data?.message === `feedback text can't be empty`) {
        toast.error('Feedback text cannot be empty!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // Return appropriate emoji based on rating
  const getEmoji = (rating: number): string => {
    const emojiMap: { [key: number]: string } = {
      1: 'poor.svg',
      2: 'okay.svg',
      3: 'good.svg',
      4: 'impressive.svg',
    };

    return emojiMap[rating];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-montserrat">
      <ToastContainer />
      <div className="background w-full h-full absolute -z-10 bg-[#FFF8F0]"></div>
      <div className="w-full max-w-2xl">
        {/* Thank You Message */}
        {showThankYouMessage ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center animate-fadeIn">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Thank You for your feedback!
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We greatly appreciate you taking the time to share your thoughts
                with us. Your feedback is invaluable in helping us improve and
                provide better service.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                You will be redirected to the dashboard in a few seconds.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
              Share Your Feedback
            </h1>
            <p className="text-gray-600 text-center mb-8">
              We value your input! Please take a moment to share your thoughts
              about your recent interaction.
            </p>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Rating Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  How would you rate this interaction?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      title={option.name}
                      onClick={() => onRatingChange(option.value)}
                      className={`group relative w-full h-24 rounded-lg transition-all duration-300 border-2 ${
                        feedbackForm.rating === option.value
                          ? 'border-green-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <img
                          className="text-4xl transition-transform group-hover:scale-110 w-12 h-12"
                          src={require(`../../../assets/emoji/${getEmoji(
                            option.value
                          )}`)}
                          alt={option.label}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Comment Section */}
              <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Additional Comments
                </label>
                <textarea
                  id="feedbackText"
                  name="feedbackText"
                  value={feedbackForm.feedbackText}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 resize-vertical placeholder-gray-400"
                  placeholder="Please share your thoughts here..."
                />
              </div>

              <button
                type="submit"
                disabled={!feedbackForm.rating}
                className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-300 text-lg"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackComponent;
