import { useSelector, useDispatch } from 'react-redux';
import {
  ClearSuccess,
  ClearErrors,
} from '../../../../redux/positions/actions/PositionsActions';
import { State } from '../../../../redux/store/store';
import FrmPosition from '../../../../components/forms/FrmPosition';

export default function NewPosition() {
  const dispatch = useDispatch();
  const success = useSelector((state: State) => state.positions.success);
  const error = useSelector((state: State) => state.positions.error);

  if (success.message !== '') {
    setTimeout(() => {
      dispatch(ClearSuccess(dispatch));
    }, 3000);
  }

  if (error.message !== '') {
    setTimeout(() => {
      dispatch(ClearErrors(dispatch));
    }, 5000);
  }

  return (
    <div className="flex flex-col">
      <span className="flex justify-center text-[#475564] text-2xl font-semibold mt-32">
        Create New Position
      </span>
      <FrmPosition />
      <div
        className={
          error.message !== ''
            ? 'transform -translate-y-10 transition ease-in-out duration-200 flex flex-col w-full items-center space-y-2 justify-center mt-20'
            : 'duration-200 opacity-0 invisible'
        }
      >
        {error.message !== '' &&
          error.message.map((message: string) => (
            <span
              key={message}
              className="px-3 text-red-500 text-center font-bold"
            >
              {message}
            </span>
          ))}
      </div>
      <div
        className={
          success.message !== ''
            ? 'transform -translate-y-10 transition ease-in-out duration-200 flex justify-center mt-20'
            : 'duration-200 opacity-0 invisible'
        }
      >
        {success.message !== '' && (
          <span className="p-2 px-3 bg-green-500 rounded-full text-white text-center font-seibold">
            {success.message}
          </span>
        )}
      </div>
    </div>
  );
}
