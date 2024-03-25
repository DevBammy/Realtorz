import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/features/userSlice';
import toast from 'react-hot-toast';
import OAuth from '../components/OAuth';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        setIsLoading(false);
        return;
      }
      dispatch(signInSuccess(data));
      setIsLoading(false);
      nav('/');
      toast.success(`Welcome ${formData.email}`);
    } catch (error) {
      toast.error(data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 w-max-lg sm:w-[500px] mx-auto">
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
        {/* <OAuth /> */}
      </form>

      <div className="flex gap-2 mt-5">
        <p>
          Dont have an account?{' '}
          <Link to="/signup">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
