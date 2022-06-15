import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCandidatesFiltered } from '../../redux/candidates/actions/CandidateAction';
import { AiOutlineDown } from 'react-icons/ai';
import { State } from '../../redux/store/store';
import GetAllPositions from '../../redux/positions/actions/PositionsActions';
import detectOutsideClick from '../../utils/detectOutsideClick';
import secondaryStatus from '../../config/kanban/constants';
import Apply from '../buttons/Apply';
import Checkbox from '../inputs/Checkbox';

// TODO: Better filters logic here and in backend. Check the GetCandidatesFiltered service in the candidate.service.ts file in the backend. Also change this in the Search.tsx file.

export default function Filters() {
  const dispatch = useDispatch();

  const positions = useSelector((state: State) => state.positions.data.docs);
  const currentFilters = useSelector(
    (state: State) => state.info.currentFilters,
  );

  // adds a checked property to each job object
  let positionsWithCheck = positions.map((pos) => {
    return { ...pos, checked: false };
  });

  const [position, setPosition] = useState<Array<string>>([]);
  const [secondary_status, setSecondaryStatus] = useState<Array<string>>([]);

  const [showPositionFilter, setShowPositionFilter] = useState<boolean>(false);
  const [showStatusFilter, setShowStatusFilter] = useState<boolean>(false);

  const [allPositionsSelected, setAllPositionsSelected] =
    useState<boolean>(false);
  const [allStatusSelected, setAllStatusSelected] = useState<boolean>(false);

  const wraperRef = useRef<HTMLDivElement>(null);
  detectOutsideClick(wraperRef, [setShowPositionFilter, setShowStatusFilter]);

  const handlePositionCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPosition([...position, e.target.value]);
    } else {
      setPosition([...position.filter((item) => item !== e.target.value)]);
    }
  };

  const handleStatusCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSecondaryStatus([...secondary_status, e.target.value]);
    } else {
      setSecondaryStatus([
        ...secondary_status.filter((status) => status !== e.target.value),
      ]);
    }
  };

  const handleAllPositionsCheck = (e: any) => {
    if (!allPositionsSelected) {
      const positionsChecked = positionsWithCheck.map((pos) => {
        pos.checked = !e.target.checked;
        return pos;
      });
      setPosition(positionsChecked.map((pos) => pos._id!));
      setAllPositionsSelected(true);
    } else {
      setPosition([]);
      setAllPositionsSelected(false);
    }
  };

  const handleAllStatusCheck = (e: any) => {
    if (!allStatusSelected) {
      const statusChecked = secondaryStatus.map((status) => {
        status.checked = !e.target.checked;
        return status;
      });
      setSecondaryStatus(statusChecked.map((status) => status.value));
      setAllStatusSelected(true);
    } else {
      setSecondaryStatus([]);
      setAllStatusSelected(false);
    }
  };

  const handleActionDispatch = () => {
    if (position.length === 0 && secondary_status.length === 0) return; // if no filters selected, no action is dispatched

    dispatch(
      GetCandidatesFiltered({
        position,
        status: secondary_status,
        query: '',
      }),
    );
    setShowPositionFilter(false);
    setShowStatusFilter(false);
  };

  useEffect(() => {
    dispatch(GetAllPositions('all'));
  }, [dispatch]);

  useEffect(() => {
    setPosition(currentFilters.position);
    setSecondaryStatus(currentFilters.status);
  }, [currentFilters.position, currentFilters.status]);

  return (
    <div ref={wraperRef} className="flex space-x-4 mt-2">
      <div className="relative">
        <div className="flex gap-4">
          <span className="font-raleway">Positions</span>
          <button
            onClick={() => setShowPositionFilter(!showPositionFilter)}
            className="pr-4"
          >
            <AiOutlineDown
              className={
                showPositionFilter
                  ? 'rotate-180 transition ease-in-out duration-200'
                  : 'duration-200'
              }
            />
          </button>
        </div>

        <div
          className={
            showPositionFilter
              ? 'transition ease-in-out duration-200 opacity-100 absolute z-10 rounded-sm mt-4 bg-white shadow-md'
              : 'duration-200 opacity-0 invisible absolute z-10 rounded-sm mt-2 bg-white shadow-md'
          }
        >
          <div className="flex flex-col px-4 pt-4 space-y-4">
            <button
              onClick={handleAllPositionsCheck}
              className="flex justify-end text-sm text-cyan-500 font-raleway"
            >
              {allPositionsSelected && position.length !== 0
                ? 'Unselect all'
                : 'Select all'}
            </button>
            {positions.map((pos) => (
              <div key={pos._id} className="border-b pb-2 w-64">
                <label
                  htmlFor={pos._id}
                  className="font-raleway flex justify-between"
                >
                  {pos.title}
                  <Checkbox
                    id={pos._id!.toString()}
                    onChange={handlePositionCheck}
                    className="flex items-center justify-center border border-gray-300 h-6 w-6 border rounded-md"
                    checkColor="text-cyan-color"
                    checked={position.indexOf(pos._id!) !== -1}
                    checkedSingle={position.indexOf(pos._id!) !== -1}
                    name={pos.title}
                    value={pos._id!}
                  />
                </label>
              </div>
            ))}
          </div>
          <Apply onClick={handleActionDispatch} />
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4">
          <span className="font-raleway">Status</span>
          <button
            onClick={() => setShowStatusFilter(!showStatusFilter)}
            className="pr-3"
          >
            <AiOutlineDown
              className={
                showStatusFilter
                  ? 'rotate-180 transition ease-in-out duration-200'
                  : 'duration-200'
              }
            />
          </button>
        </div>
        <div
          className={
            showStatusFilter
              ? 'transition ease-in-out duration-200 opacity-100 absolute z-10 rounded-sm mt-4 bg-white shadow-md'
              : 'duration-200 opacity-0 invisible absolute z-10 rounded-sm mt-2 bg-white shadow-md'
          }
        >
          <div className="flex flex-col px-4 pt-4 space-y-4">
            <button
              className="flex justify-end text-sm text-cyan-500 font-raleway"
              onClick={handleAllStatusCheck}
            >
              {allStatusSelected && secondary_status.length !== 0
                ? 'Unselect all'
                : 'Select all'}
            </button>
            {secondaryStatus.map((status) => (
              <div
                key={status.id}
                className="flex justify-between border-b pb-2 w-64"
              >
                <div className="flex">
                  <div
                    className={`mt-[0.3rem] w-4 h-4 rounded-xl ${status.color}`}
                  ></div>
                  <label
                    htmlFor={status.id.toString()}
                    className="ml-3 font-raleway"
                  >
                    {status.displayName}
                  </label>
                </div>
                <label
                  htmlFor={status.id.toString()}
                  className="ml-3 font-raleway"
                >
                  <Checkbox
                    id={status.id.toString()}
                    onChange={handleStatusCheck}
                    className="flex items-center justify-center border border-gray-300 h-6 w-6 border rounded-md"
                    checkColor="text-cyan-color"
                    checked={secondary_status.indexOf(status.value) !== -1}
                    checkedSingle={
                      secondary_status.indexOf(status.value) !== -1
                    }
                    name={status.displayName}
                    value={status.value}
                  />
                </label>
              </div>
            ))}
          </div>
          <Apply onClick={handleActionDispatch} />
        </div>
      </div>
    </div>
  );
}
