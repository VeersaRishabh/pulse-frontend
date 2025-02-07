import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import AuthGuard from '../guard/AuthGuard';

const FeedbackComponent = lazy(() => import('../components/feedback/Feedback'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const DashboardMain = lazy(
  () => import('../components/dashboard/dashboard-main/DashboardMain')
);
const MyFeedbacks = lazy(
  () => import('../components/dashboard/my-feedbacks/MyFeedbacks')
);
const Login = lazy(() => import('../pages/login/Login'));

const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <Login />
        </AuthGuard>
      </Suspense>
    ),
  },
  {
    path: '/feedback/:id',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <FeedbackComponent />
        </AuthGuard>
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <DashboardMain />,
      },
    ],
  },
  {
    path: '/my-feedbacks',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <MyFeedbacks />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
];

export default appRoutes;
