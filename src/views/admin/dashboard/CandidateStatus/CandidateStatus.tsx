import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store/store';
import {
  CleanCandidateErrors,
  ClearCandidateSuccess,
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
import { sortByColumn } from '../../../../utils/candidates';

// TODO: Google Calendar integration for Meet invite when a candidate goes to the Meeting stage.
// TODO: Email integration for when the Applying URL is generated.

export default function CandidateStatus() {
  const dispatch = useDispatch();

  const success = useSelector((state: State) => state.info.success);
  const error = useSelector((state: State) => state.info.error);
  const isAuthenticated = useSelector(
    (state: State) => state.user.authenticated,
  );
  let candidates = useSelector((state: State) => state.info.candidates);

  candidates = sortByColumn(candidates);

  if (success.message !== '') {
    setTimeout(() => {
      dispatch(ClearCandidateSuccess(dispatch));
    }, 3000);
  }

  useEffect(() => {
    batch(() => {
      dispatch(CleanCandidateErrors(dispatch));
      dispatch(GetAllCandidates());
    });
    window.document.title = 'WorkAt - Candidate Status';
  }, [dispatch, isAuthenticated]);

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
            error.message !== '' && error.message.includes('Network')
              ? 'transform -translate-y-10 transition ease-in-out duration-200 absolute z-10 bg-[#F84D44] p-2 text-center rounded-lg'
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
