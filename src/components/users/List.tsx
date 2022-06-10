import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { IUser } from '../../redux/users/types/data';
import UserItem from './UserItem';
import Modal from '../extras/Modal';
import {
  ClearUserSuccess,
  DeleteUser,
} from '../../redux/users/actions/UserAction';
import { State } from '../../redux/store/store';

type UserListProps = {
  users: IUser[];
};

export default function UserList({ users }: UserListProps) {
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const success = useSelector((state: State) => state.user.success);

  const handleClick = (_id: string) => {
    setSelectedItem(_id);
    setShowWarning(!showWarning);
  };

  const handleClose = () => {
    setShowWarning(!showWarning);
    setSelectedItem('');
  };

  const handleDelete = () => {
    dispatch(DeleteUser(selectedItem));

    setTimeout(() => {
      dispatch(ClearUserSuccess(dispatch));
    }, 3000);
  };

  useEffect(() => {
    setSelectedItem('');
    setShowWarning(false);
  }, [success.message]);

  return (
    <div>
      <div className="flex justify-between laptop:w-[52.5rem] desktop:w-[73.5rem] ml-44">
        <div className="flex">
          <span className="flex ml-10 text-[#475564] gap-5 text-2xl font-raleway font-semibold">
            Users
          </span>
        </div>
      </div>
      <div className="mt-8 ml-44">
        {users.map((user) => (
          <div key={user._id} className="flex">
            <UserItem name={user.name} role={user.role?.name} />
            <div className="mt-2">
              <button
                onClick={() => handleClick(user._id!)}
                className="mt-4 ml-6 h-8"
              >
                {' '}
                <MdDelete />{' '}
              </button>
            </div>
          </div>
        ))}
      </div>
      {showWarning && selectedItem !== '' && (
        <Modal
          alt="Delete Position"
          classes={true}
          image="reject"
          isVerify={handleDelete}
          message="Are you sure you want to delete this position?"
          onClick={handleClose}
          setValue={handleClose}
          value={showWarning}
        />
      )}
    </div>
  );
}
