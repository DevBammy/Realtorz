import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-2 items-center w-full">
        <img
          src={user.photo}
          alt=""
          className="h-24 w-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg  w-max-lg w-full"
          id="username"
          defaultValue={user.username}
        />

        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg  w-max-lg w-full"
          id="email"
          defaultValue={user.email}
        />

        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg  w-max-lg w-full"
          id="password"
          defaultValue={user.password}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 w-full">
          Update Profile
        </button>
      </form>

      <div className="flex justify-between items-center my-2">
        <span className="font-bold text-slate-500 cursor-pointer">
          Sign Out
        </span>
        <span className="text-red-500 font-medium cursor-pointer">
          Delete Account
        </span>
      </div>
    </div>
  );
};

export default Profile;
