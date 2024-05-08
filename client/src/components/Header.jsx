import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="font-bold text-slate-500">Real</span>
              <span className="text-slate-700">torz</span>
            </h1>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="p-3 rounded-lg bg-slate-100 flex items-center justify-between"
          >
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 sm:w-60"
            />
            <button onClick={handleSubmit}>
              <FaSearch className="text-slate-500 cursor-pointer" />
            </button>
          </form>

          <ul className="flex items-center space-x-3">
            <Link to="/">
              <li className="hidden font-bold text-slate-500 sm:inline hover:text-blue-600 cursor-pointer">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className="hidden font-bold text-slate-500 sm:inline hover:text-blue-600 cursor-pointer">
                About
              </li>
            </Link>

            {user ? (
              <img
                src={user.photo}
                alt="user profile image"
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                onClick={() => navigate('/profile')}
              />
            ) : (
              <Link to="/signin">
                <li className="hidden font-bold text-slate-500 sm:inline hover:text-blue-600 cursor-pointer">
                  Sign In
                </li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
