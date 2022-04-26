import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  return (
    <header className="absolute top-0 left-0 w-screen">
      <nav className="flex flex-row text-white items-center justify-evenly p-4 bg-[#475564]">
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="font-medium"
          >
            Hello {userName}
          </button>
          {showProfileMenu ? (
            <div className="absolute w-52 bg-white mt-2 rounded-md shadow-lg">
              <button className="text-black px-3 py-2">My Profile</button>
            </div>
          ) : null}
        </div>
        <div className="flex text-lg text-white mr-16 font-light">
          <ul className="divide-x divide-solid">
            <button className="px-3 focus:text-cyan-400 focus:underline focus:underline-offset-8">
              Open Positions
            </button>
            <NavLink
              to="/admin/dashboard/candidate-status"
              className={({ isActive }) =>
                `px-3 ${isActive} ? text-cyan-400 underline underline-offset-8 : text-white`
              }
            >
              Candidates Status
            </NavLink>
            <button className="px-3 focus:text-cyan-400 focus:underline focus:underline-offset-8">
              Expert
            </button>
          </ul>
        </div>
        <button className="font-medium w-24 hover:cursor-pointer hover:bg-white hover:text-black p-2 rounded-md hover:transition ease-in-out duration-300">
          Log Out
        </button>
      </nav>
    </header>
  );
}
