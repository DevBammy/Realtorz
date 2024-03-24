import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const upLoadTask = uploadBytesResumable(storageRef, file);

    upLoadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFileProgress(progress);
        if (fileProgress <= 100) {
          toast.success('Uploading file...');
        }
      },
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(upLoadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, photo: downloadURL });
          toast.success('File uploaded succesfully!');
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-2 items-center w-full">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          <img
            src={formData.photo || user.photo}
            alt=""
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 rounded-full object-cover cursor-pointer self-center mt-2"
          />
          <FaRegEdit className="absolute bottom-0 right-2 m-2 text-slate-800 cursor-pointer" />
        </div>

        <p className="text-red-500 my-2 font-medium">
          {fileProgress > 0 && fileProgress < 100
            ? `uploading file ${fileProgress}%`
            : fileProgress === 100
            ? 'File upload successfully'
            : ''}
        </p>

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
