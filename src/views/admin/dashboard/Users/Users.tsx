import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store/store';
import { GetAllUsers } from '../../../../redux/users/actions/UserAction';
import CreateNew from '../../../../components/buttons/CreateNew';
import UserList from '../../../../components/users/List';
import LoaderSpinner from '../../../../assets/loaderSpinner';

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector((state: State) => state.user.users);
  const loading = useSelector((state: State) => state.user.loading);

  useEffect(() => {
    dispatch(GetAllUsers());
    window.document.title = 'WorkAt - Users';
  }, [dispatch]);

  return (
    <div className="mt-36 md:w-screen overflow-x-hidden">
      <div className="flex justify-end laptop:mr-[18rem] desktop:mr-[23rem]">
        <CreateNew onClick={() => console.log('clicked')} />
      </div>
      <div>
        <UserList users={users} />
        {loading ? (
          <div className="absolute w-full h-[55rem] top-0 left-0">
            <LoaderSpinner
              width="w-10"
              height="h-10"
              classes="absolute laptop:top-40 laptop:left-[40rem] dektop:top-40 desktop:left-[55rem]"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
