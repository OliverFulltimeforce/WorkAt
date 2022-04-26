import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { HiPlusCircle } from 'react-icons/hi';
import { State } from '../../redux/store/store';
import {
  GetAllCandidates,
  CleanErrors,
  CleanFilters,
  CleanSearch,
  SetAppliedFilters,
} from '../../redux/candidates/actions/CandidateAction';
import Filters from './Filters';
import Search from './Search';

export default function KanbanOptions() {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(
    (state: State) => state.info.appliedFilters,
  );

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleCleanFilters = () => {
    if (!appliedFilters) {
      return;
    }

    dispatch(CleanErrors());
    dispatch(CleanFilters());
    dispatch(CleanSearch());
    dispatch(SetAppliedFilters());
    dispatch(GetAllCandidates());
  };

  return (
    <div className="flex justify-between pb-2 mt-36 ml-48 w-[80rem] border-b-2">
      <div className="flex space-x-4">
        <Filters />
        <label
          htmlFor="query"
          className="mt-[0.75rem] hover:cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        >
          {' '}
          <BsSearch />{' '}
        </label>
        {showSearch ? <Search /> : null}
        <button
          className="text text-sky-400 font-medium transition ease duration-300 hover:bg-sky-400 hover:text-white px-2 rounded-md"
          onClick={handleCleanFilters}
        >
          Clean Filters
        </button>
      </div>
      <div className="mr-16">
        <button className="flex bg-sky-400 text-white font-medium rounded-3xl px-4 py-2 w-44">
          Create New <HiPlusCircle className="ml-8 text-2xl" />
        </button>
      </div>
    </div>
  );
}
