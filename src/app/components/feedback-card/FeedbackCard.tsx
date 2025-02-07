import { NavLink } from 'react-router-dom';

interface FeedbackCardProps {
  feedback: {
    pendingFeedbackId: string;
    rateeName: string;
    rateeId: string;
    meetingDate: string | Date;
    designation: string;
    initials: string;
    dueDate: string | Date;
    status: string;
  };
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  let dueLabel: string = '';
  let dueClass: string = '';
  let icon: string = '';

  // Assign proper labels and styles based on feedback type
  switch (feedback.status) {
    case 'Completed':
      dueLabel = 'Due Today';
      dueClass = 'bg-red-100 text-red-800';
      icon = 'fas fa-clock-rotate-left';
      break;
    case 'Pending':
      dueLabel = `Due in ${Math.ceil(
        (new Date(feedback.dueDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )} days`;
      dueClass = 'bg-orange-100 text-orange-800';
      icon = 'fas fa-clock-rotate-left';
      break;
    case 'Overdue':
      dueLabel = `Due on ${new Date(feedback.dueDate).toLocaleDateString()}`;
      dueClass = 'bg-red-400 text-black-100';
      icon = 'fas fa-clock-rotate-left';
      break;
    default:
      dueLabel = `Due on ${new Date(feedback.dueDate).toLocaleDateString()}`;
      dueClass = 'bg-red-500 text-gray-800';
      icon = 'fas fa-calendar-alt';
  }

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-150 border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Initials Circle */}
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
            {feedback?.initials}
          </div>
          <div>
            <p className="font-medium">{feedback?.rateeName}</p>
            <p className="text-sm text-gray-600">{feedback?.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${dueClass} flex items-center gap-1`}
          >
            <i className={`${icon} text-xs`}></i>
            {dueLabel}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${dueClass} flex items-center gap-1`}
          >
            {feedback?.status}
          </span>
          <NavLink
            to={`/feedback/${feedback.pendingFeedbackId}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-150"
          >
            Provide Feedback
          </NavLink>
          {/* <a
            href="/feedback"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-150"
          >
            Provide Feedback
          </a> */}
        </div>
      </div>
    </div>
  );
};
