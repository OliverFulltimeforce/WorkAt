import { useDispatch, useSelector } from 'react-redux';
import {
  ClearSuccess,
  SetIsActive,
} from '../../redux/positions/actions/PositionsActions';
import { State } from '../../redux/store/store';

type ToggleProps = {
  inactive: boolean;
  _id: string;
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
};

export default function Toggle({
  inactive,
  _id,
  isToggled,
  setIsToggled,
}: ToggleProps) {
  const dispatch = useDispatch();

  const updating = useSelector((state: State) => state.positions.updating);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    dispatch(SetIsActive(_id));

    setTimeout(() => {
      dispatch(ClearSuccess(dispatch));
    }, 3000);
  };

  return (
    <label className="relative w-[3rem] h-[1.80rem] rounded-full bg-[#F0F0F4] mt-2 hover:cursor-pointer border-2">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0 cursor-pointer"
        checked={isToggled}
        onChange={handleToggle}
      />
      {inactive ? (
        <span
          className={
            isToggled && !updating
              ? "before:absolute before:top-[0.05rem] before:left-[-13px] before:bottom-[4px] before:content-[''] before:w-[1.5rem] before:h-[1.5rem] cursor-pointer before:bg-[#00ADEF] before:transition ease-in-out duration-1100 before:transform before:translate-x-8 before:rounded-full"
              : "before:absolute before:top-[0.05rem] before:left-[-13px] before:bottom-[4px] before:content-[''] before:w-[1.5rem] before:h-[1.5rem] cursor-pointer before:bg-[#475564] before:transition ease-in-out duration-1100 before:rounded-full before:transform before:translate-x-3.5"
          }
        />
      ) : (
        <span
          className={
            isToggled && !updating
              ? "before:absolute before:top-[0.05rem] before:left-[-13px] before:bottom-[4px] before:content-[''] before:w-[1.5rem] before:h-[1.5rem] cursor-pointer before:bg-[#475564] before:transition ease-in-out duration-1100 before:transform before:translate-x-3.5 before:rounded-full"
              : "before:absolute before:top-[0.05rem] before:left-[-13px] before:bottom-[4px] before:content-[''] before:w-[1.5rem] before:h-[1.5rem] cursor-pointer before:bg-[#00ADEF] before:transition ease-in-out duration-1100 before:rounded-full before:transform before:translate-x-8"
          }
        />
      )}
    </label>
  );
}
