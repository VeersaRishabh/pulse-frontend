import { useMsal } from '@azure/msal-react';
import './Dashboard.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hook';
import { logoutUser } from '../../redux/slices/user-slice/userSlice';

const Dashboard = () => {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
    instance.logoutRedirect();
  };

  return (
    <div>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-comments text-blue-600 text-2xl mr-2"></i>
                <span className="text-xl font-bold">PULSE</span>
              </div>
              <div className="hidden md:flex items-center ml-10 space-x-8">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/my-feedbacks"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }
                >
                  My Feedbacks
                </NavLink>
                {/* <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }
                >
                  Team
                </NavLink>
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }
                >
                  Reports
                </NavLink> */}
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 pl-10 pr-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div> */}
              {/* <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <i className="fas fa-bell text-gray-600"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    5
                  </span>
                </button>
              </div> */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                {/* <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  JS
                </div>
                <span className="text-gray-700 font-medium"></span>
                <i className="fas fa-chevron-down text-gray-400 text-sm"></i> */}
              </div>
              <button className="bg-blue-500 p-2 text-white" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 mt-16 min-h-screen">
        <Outlet />
      </main>

      {/* <div className="fixed bottom-8 right-8">
        <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-150">
          <i className="fas fa-plus text-xl"></i>
        </button>
      </div> */}
    </div>
  );
};

export default Dashboard;
