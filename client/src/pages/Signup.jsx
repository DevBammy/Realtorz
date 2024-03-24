import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OAuth from '../components/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        toast.error(data.message);
        return;
      }
      setIsLoading(false);
      toast.success('Welcome, Sign in to you account');
      nav('/signin');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-3 w-max-lg sm:w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">SignUp</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
          {isLoading ? 'Creating your account...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>
          Have an account?{' '}
          <Link to="/signin">
            <span className="text-blue-700">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
