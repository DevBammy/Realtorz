import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Listing = () => {
  const [files, setFiles] = useState();
  const [formData, setFormData] = useState({
    imgUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'sale',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUplaod = (e) => {
    setIsLoading(true);
    if (files.length > 0 && files.length + formData.imgUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imgUrls: formData.imgUrls.concat(urls),
          });
          setIsLoading(false);
          toast.success('Images uploaded successfully');
        })
        .catch((error) => {
          toast.error('error uploading images (max 2MB per image)');
          setIsLoading(false);
        });
    } else {
      toast.error('you can only upload 6 images ');
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (i) => {
    setFormData({
      ...formData,
      imgUrls: formData.imgUrls.filter((_, index) => index !== i),
    });
    toast.success('image removed');
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);
  const handleSubmitListing = async (e) => {
    e.preventDefault();
    try {
      if (formData.imgUrls.length < 1)
        return toast.error('Please upload atleast one image');
      if (+formData.regularPrice < +formData.discountedPrice)
        return toast.error(
          'regular price should be less than discounted price'
        );
      if (+formData.regularPrice === 0)
        return toast.error('regular price cannot be zero');
      setLoading(true);
      const res = await fetch('api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: user._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
      }
      navigate(`/listing/${data._id}`);
      toast.success('Listing created succesfully! Redirecting...');
      setLoading(false);
      navigate('/profile');
    } catch (error) {
      toast.error('Error creating listing');
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form
        onSubmit={handleSubmitListing}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            placeholder="Name of listing "
            className="border p-3 rounded-lg"
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Description of listing "
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address of listing "
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.type === 'sale'}
                id="sale"
                className="w-5 h-5"
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={formData.type === 'rent'}
                className="w-5 h-5"
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.parking}
                id="parking"
                className="w-5 h-5"
                onChange={handleChange}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={formData.furnished}
                className="w-5 h-5"
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={formData.offer}
                className="w-5 h-5"
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span>No of bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span>No of bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price </p>
                <span className="text-[12px]">($/Month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  required
                  onChange={handleChange}
                  value={formData.discountedPrice}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price </p>
                  <span className="text-[12px]">($/Month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images:{' '}
            <span className="font-normal text-gray-400 ml-2">
              the first image will be the cover (maximum image is 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="imgUrls"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageUplaod}
              className="p-3 text-white border-0 outline-0  my-4 bg-green-700 rounded uppercase hover:opacity-90 disabled:opacity-70"
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          <div className=" grid grid-cols-3 gap-2 w-full my-4">
            {formData.imgUrls.length > 0 &&
              formData.imgUrls.map((image, i) => (
                <div className="flex flex-col gap-2" key={i}>
                  <img
                    src={image}
                    alt="listing image"
                    className="w-40 h-40 object-cover rounded-lg "
                  />
                  <span
                    onClick={() => handleDelete(i)}
                    className="font-semibold text-red-500"
                  >
                    Delete
                  </span>
                </div>
              ))}
          </div>

          <button
            disabled={loading || isLoading}
            className=" p-3 bg-slate-700 text-white rounded-lg mt-4 hover:opacity-90 disabled:opacity-70"
            type="submit"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Listing;
