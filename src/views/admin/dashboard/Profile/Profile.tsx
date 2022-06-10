import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { State } from '../../../../redux/store/store';
import FrmProfile from '../../../../components/forms/FrmProfile';
import { ClearUserSuccess } from '../../../../redux/users/actions/UserAction';

export default function Profile() {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const success = useSelector((state: State) => state.user.success);
  const error = useSelector((state: State) => state.user.error);

  if (success.message !== '') {
    setTimeout(() => {
      dispatch(ClearUserSuccess(dispatch));
    }, 3000);
  }

  useEffect(() => {
    if (success.message !== '') {
      setIsEditable(false);
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center mt-36 md:w-screen overflow-x-hidden">
      <div className="mb-16 space-x-6">
        <span className="font-raleway font-semibold text-xl text-[#475564]">
          My Profile
        </span>
        <button
          className="p-2 rounded-full hover:bg-gray-300 active:bg-gray-500"
          disabled={isEditable}
          onClick={() => setIsEditable(!isEditable)}
        >
          <AiFillEdit className={isEditable ? 'text-gray-200' : ''} />
        </button>
      </div>
      <FrmProfile isEditable={isEditable} setIsEditable={setIsEditable} />
      <div className="flex items-center justify-center mt-44">
        <div
          className={
            error.message !== '' && error.message.includes('Network')
              ? 'transform -translate-y-10 transition ease-in-out duration-200 absolute z-10 bg-[#F84D44] p-2 text-center rounded-md'
              : 'duration-200 opacity-0 invisible absolute'
          }
        >
          {error.message !== '' && (
            <span className="text-white font-raleway">
              There was an error while connecting to the server. Please check
              your internet connection and try again.
            </span>
          )}
        </div>
        <div
          className={
            success.message !== ''
              ? 'transform -translate-y-10 transition ease-in-out duration-200 absolute z-10 bg-[#35C549] p-2 text-center rounded-lg'
              : 'duration-200 opacity-0 invisible absolute'
          }
        >
          {success.message !== '' && (
            <span className="text-white font-raleway">{success.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
