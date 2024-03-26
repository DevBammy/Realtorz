import { useEffect } from 'react';

const Userlistings = ({ handleListing, listings }) => {
  useEffect(() => {
    handleListing();
  }, []);

  return (
    <>
      {listings &&
        listings.length > 0 &&
        listings.map((listing, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 border-b"
          >
            {/* <img src={listing.imgUrls[0]} alt="" /> */}
          </div>
        ))}
    </>
  );
};

export default Userlistings;
