import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store/store';
import {
  CleanErrors,
  ClearSuccess,
  GetAllCandidates,
} from '../../../../redux/candidates/actions/CandidateAction';
import Column from '../../../../components/kanban/Column';
import KanbanOptions from '../../../../components/kanban/KanbanOptions';
import {
  InterestedInfo,
  ApplyingInfo,
  MeetingInfo,
  ChosenInfo,
} from '../../../../config/kanban/columnGuideInfo';
import getCandidatesByColumn from '../../../../utils/getCandidatesByColumn';

export default function CandidateStatus() {
  const dispatch = useDispatch();
  const success = useSelector((state: State) => state.info.success);
  let candidates = useSelector((state: State) => state.info.candidates);

  candidates = getCandidatesByColumn(candidates);

  if (success.message !== '') {
    setTimeout(() => {
      dispatch(ClearSuccess(dispatch));
    }, 3000);
  }

  useEffect(() => {
    batch(() => {
      dispatch(CleanErrors(dispatch));
      dispatch(GetAllCandidates());
    });
  }, [dispatch]);

  return (
    <div>
      <KanbanOptions />
      <div className="flex justify-center pt-8">
        <main className="flex flex-row gap-3">
          <Column
            title="Interested"
            column_info={InterestedInfo}
            items={candidates.interested}
          />
          <Column
            title="Applying"
            column_info={ApplyingInfo}
            items={candidates.applying}
          />
          <Column
            title="Meeting"
            column_info={MeetingInfo}
            items={candidates.meeting}
          />
          <Column
            title="Chosen"
            column_info={ChosenInfo}
            items={candidates.chosen}
          />
        </main>
      </div>
      <div className="flex items-start justify-center mt-[25rem]">
        <div
          className={
            success.message !== ''
              ? 'transform -translate-y-10 transition ease-in-out duration-200 absolute z-10 bg-green-500 p-2 text-center rounded-lg'
              : 'duration-200 opacity-0 invisible absolute'
          }
        >
          {success.message !== '' && (
            <span className="text-white">{success.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
