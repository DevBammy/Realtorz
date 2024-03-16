import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signinFailed,
  signinSuccess,
} from '../redux/features/userSlice';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailed(data.message));
        return;
      }
      dispatch(signinSuccess(data.user));
      nav('/');
    } catch (error) {
      dispatch(signinFailed(error.message));
    }
  };

  return (
    <div className="p-3 w-max-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Signin</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg  hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? 'Signing you in...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>
          Dont have an account?{' '}
          <Link to="/signup">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </div>

      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
