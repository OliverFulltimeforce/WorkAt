import { useState } from 'react';
import { FiClock } from 'react-icons/fi';
import getItemBorderColor from '../../utils/getItemBorderColor';
import '../../assets/scss/Card.scss';
import UserDialog from '../dialog/UserDialog';

type CardProps = {
  name: string;
  position: string;
  secondary_status: string;
};

export default function Card({ name, position, secondary_status }: CardProps) {
  const card = getItemBorderColor(secondary_status);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const isOpen = () => {
    setOpenDialog(true);
  };

  const isClose = () => {
    setOpenDialog(false);
  };

  return (
    <article className={card}>
      <div className="ml-4">
        <p className="font-medium text-lg">{name}</p>
        <p className="font-light">
          {position ? position : 'No position applied'}
        </p>
        <section className="flex flex-row gap-24 pt-4 pb-4">
          <span className="flex font-light pt-4">
            <FiClock className="mt-[0.25rem] mr-[0.5rem] text-lg" /> 1 week
          </span>
          <button
            onClick={isOpen}
            className="border border-black rounded-md w-20 transition ease duration-200 hover:bg-slate-500 hover:text-white"
          >
            Open
          </button>
          {openDialog && <UserDialog isDialogClose={isClose} />}
        </section>
      </div>
    </article>
  );
}