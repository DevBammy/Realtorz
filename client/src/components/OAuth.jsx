import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OAuth = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
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
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      nav('/');
      toast.success('Welcome!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-500  text-white p-3 rounded-lg  hover:opacity-95 disabled:opacity-80"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
