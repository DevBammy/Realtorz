import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { signInSuccess } from '../redux/features/userSlice';
import toast from 'react-hot-toast';

const OAuth = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      nav('/profile');
      toast.success('Welcome to your dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="bg-red-500  text-white p-3 rounded-lg  hover:opacity-95 disabled:opacity-80"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
