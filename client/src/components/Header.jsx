import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
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

          <form className="p-3 rounded-lg bg-slate-100 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 sm:w-60"
            />
            <FaSearch className="text-slate-500 cursor-pointer" />
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

            <Link to="/signin">
              <li className="hidden font-bold text-slate-500 sm:inline hover:text-blue-600 cursor-pointer">
                Sign In
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
