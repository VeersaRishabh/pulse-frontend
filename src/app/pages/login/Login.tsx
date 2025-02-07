import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Login.scss';
import { useAppDispatch } from '../../redux/hooks/hook';
import { login } from '../../redux/slices/user-slice/userSlice';

interface LoginFormInputs {
  emailId: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Login attempt:', data);
    navigate('/dashboard');
  };

  const loginPopup = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ['user.read'],
      });
      console.log('Login successful', response);
      dispatch(
        login({
          // isLoggedIn:true,
          id: response?.uniqueId,
          name: response?.account?.name,
          emailId: response?.account?.username,
          // role: 'Admin',
        })
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      navigate('/login');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please enter your details</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="input-group">
              <span className="material-symbols-rounded">person</span>
              <input
                type="email"
                placeholder="Email"
                {...register('emailId', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
              {errors.emailId && (
                <p className="error">{errors.emailId.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="input-group">
              <span className="material-symbols-rounded">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              <span
                className="material-symbols-rounded password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="options">
              <label>
                <input type="checkbox" {...register('rememberMe')} />
                Remember me
              </label>
              <a className="forgot-password" href="/forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit">Sign In</button>

            {/* Veersa ID Login Button */}
            <button type="button" className="mt-3" onClick={loginPopup}>
              Sign In Using Veersa ID
            </button>

            {/* Signup Link */}
            <p className="signup-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
