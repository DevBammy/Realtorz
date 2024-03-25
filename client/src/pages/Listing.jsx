const Listing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            placeholder="Name of listing "
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Description of listing "
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address of listing "
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5 h-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 h-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 h-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 h-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 h-5" />
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
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span>No of bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="reguularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price </p>
                <span className="text-[12px]">($/Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price </p>
                <span className="text-[12px]">($/Month)</span>
              </div>
            </div>
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
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-white border-0 outline-0  my-4 bg-green-700 rounded uppercase hover:opacity-90 disabled:opacity-70">
              Upload
            </button>
          </div>
          <button
            className=" p-3 bg-slate-700 text-white rounded-lg mt-4 hover:opacity-90 disabled:opacity-70"
            type="submit"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default Listing;
