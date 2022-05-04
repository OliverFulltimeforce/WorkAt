import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineDown } from 'react-icons/ai';
import { IColumnInfo } from '../../config/kanban/columnGuideInfo';
import { ICandidate } from '../../redux/candidates/types/data';
import { State } from '../../redux/store/store';
import Collapsable from './Collapsable';
import Card from './Card';

type ColumnProps = {
  title: string;
  column_info: IColumnInfo;
  items: ICandidate[];
};

export default function Column({ title, column_info, items }: ColumnProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isLoading = useSelector((state: State) => state.info.loading);
  const error = useSelector((state: State) => state.info.error);

  return (
    <div className="w-80 relative">
      <button
        className="flex font-medium ml-24 text-2xl text-center pb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} <AiOutlineDown className="w-4 mt-2 ml-4" />
      </button>
      <>
        <Collapsable info={column_info} />
        <div
          className={
            isOpen
              ? 'transform translate-y-52 transition ease-in-out duration-500 absolute top-10 bg-[#F0F0F4] h-[42rem] w-80 rounded-lg pt-4 pb-4 space-y-1 overflow-y-auto overflow-x-hidden scroll-smooth'
              : 'transition ease-out duration-300 absolute top-12 bg-[#F0F0F4] h-[42rem] w-80 rounded-lg pt-4 pb-4 space-y-1 overflow-y-auto overflow-x-hidden scroll-smooth'
          }
        >
          {isLoading ? (
            <svg
              className="absolute top-40 left-32 h-14 w-12 animate-spin text-cyan-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                stroke="currentColor"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              {items.length === 0 && !error.message ? (
                <p className="text-center mt-40 text-lg font-bold">
                  No candidates...
                </p>
              ) : error.message !== '' ? (
                <p className="text-center mt-40 text-lg font-bold">
                  {error.message}
                </p>
              ) : (
                items.map((item: ICandidate) => (
                  <Card
                    key={item._id}
                    name={item.name}
                    position={item.position?.title}
                    secondary_status={item.secondary_status!}
                  />
                ))
              )}
            </>
          )}
        </div>
      </>
    </div>
  );
}
