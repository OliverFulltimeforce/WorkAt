import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiClock } from 'react-icons/fi';
import { GetCandidateInfo } from '../../redux/candidates/actions/CandidateAction';
import { getTopBorderColor } from '../../utils/candidates';
import UserDialog from '../dialog/UserDialog';
import Checkbox from '../inputs/Checkbox';
import '../../assets/scss/Card.scss';

type CardProps = {
  _id: string;
  name: string;
  position: string;
  secondary_status: string;
};

export default function Card({
  name,
  _id,
  position,
  secondary_status,
}: CardProps) {
  const dispatch = useDispatch();

  const card = getTopBorderColor(secondary_status);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isSeen, setIsSeen] = useState<boolean>(false);

  const isOpen = () => {
    dispatch(GetCandidateInfo(_id));

    setOpenDialog(true);
    setIsModalLoading(true);
  };

  const isClose = () => {
    setOpenDialog(false);
  };

  return (
    <article className={card}>
      <div className="ml-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-raleway font-semibold">{name}</p>
            <p className="font-light font-raleway">
              {position ? position : 'No position applied to'}
            </p>
          </div>
          <div className="flex pr-8">
            <label htmlFor={_id}>
              <Checkbox
                className="flex items-center ring-1 ring-gray-100 h-7 w-7 shadow-md drop-shadow-sm text-3xl rounded-md"
                checkColor="text-cyan-color"
                id={_id}
                onChange={() => setIsSeen(!isSeen)}
                checked={isSeen}
                seen={isSeen}
              />
            </label>
          </div>
        </div>
        <section className="flex flex-row gap-20 pt-4 pb-4">
          <span className="flex font-raleway pt-4">
            <FiClock className="mt-[0.25rem] mr-[0.5rem] text-lg" /> 1 week
          </span>
          <button
            onClick={isOpen}
            className="border border-black rounded-md px-5 transition ease duration-150 hover:bg-[#475564] hover:text-white font-raleway"
          >
            Open
          </button>
          {openDialog && (
            <UserDialog
              isDialogClose={isClose}
              isModalLoading={isModalLoading}
              setIsModalLoading={setIsModalLoading}
            />
          )}
        </section>
      </div>
    </article>
  );
}
