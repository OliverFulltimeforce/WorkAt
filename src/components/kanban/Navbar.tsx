import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {
  VIEW_EXPERT,
  VIEW_KANBAN,
  VIEW_OPEN_POSITIONS,
  VIEW_PROFILE,
  VIEW_USERS,
} from '../../config/routes/paths';
import { LogOut } from '../../redux/users/actions/UserAction';
import { getStorageItem } from '../../utils/localStorage';
import detectOutsideClick from '../../utils/detectOutsideClick';
import NavItem from './NavItem';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const currentUser = getStorageItem('user');

  const profileMenuRef = useRef<HTMLDivElement>(null);
  detectOutsideClick(profileMenuRef, [setShowProfileMenu]);

  const handleLogout = () => {
    dispatch(LogOut());
  };

  const isAdmin = true;

  const handleProfileNavigate = () => {
    navigate(VIEW_PROFILE);
    setShowProfileMenu(false);
  };

  return (
    <header className="absolute top-0 left-0 w-screen">
      <nav className="flex flex-row text-white items-center justify-evenly p-4 bg-[#475564]">
        <div className="relative" ref={profileMenuRef}>
          <div className="flex space-x-3">
            {currentUser?.picture ? (
              <img
                src={currentUser.picture}
                alt="profile pic"
                className="w-10 h-10 rounded-full"
              />
            ) : null}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="font-semibold font-raleway"
            >
              Hello {currentUser?.name.split(' ')[0] || 'User'}
            </button>
          </div>
          <div
            className={
              showProfileMenu
                ? 'transition ease-in-out duration-200 opacity-100 origin-top-left absolute w-52 bg-white mt-2 rounded-md shadow-lg'
                : 'duration-200 opacity-0 invisible absolute w-52 mt-2'
            }
          >
            <button
              className="text-black px-3 py-2 font-raleway"
              onClick={handleProfileNavigate}
            >
              My Profile
            </button>
          </div>
        </div>
        <div className="text-lg text-white mr-16 font-light">
          <ul className="flex divide-x divide-solid">
            <NavItem to={VIEW_OPEN_POSITIONS} text="Open Positions" />
            {isAdmin ? <NavItem to={VIEW_USERS} text="Users" /> : null}
            <NavItem to={VIEW_KANBAN} text="Candidates Status" />
            <NavItem to={VIEW_EXPERT} text="Expert" />
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="flex font-semibold font-raleway hover:cursor-pointer hover:bg-white hover:text-black py-2 px-3 rounded-md hover:transition ease-in-out duration-200"
        >
          Log Out <FiLogOut className="mt-1 ml-2" />
        </button>
      </nav>
    </header>
  );
}
