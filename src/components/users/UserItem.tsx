import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

type UserItemProps = {
  name: string;
  role?: string;
};

export default function UserItem({ name, role }: UserItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex laptop:flex-col">
      <div className="flex justify-between pl-4 py-4 border-b-2 bg-[#FAFAFA] laptop:w-[47rem] desktop:w-[68rem] ml-12">
        <div className="flex space-x-8">
          <div className="w-fit">
            <p className="ml-2 font-raleway desktop:w-[20rem] laptop:w-[17rem]">
              {name}
            </p>
            <div className="flex flex-nowrap w-full mt-4">
              <p className="text-sm px-2 font-raleway">
                {role ? role : 'No role specified'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-6 laptop:mr-16 desktop:mr-16 items-center">
          <span className="mt-2 font-raleway">March 15</span>
          <button onClick={() => setIsOpen(!isOpen)} className="font-raleway">
            <AiOutlineDown className={isOpen ? 'mt-2 rotate-180' : 'mt-2'} />
          </button>
        </div>
      </div>
    </div>
  );
}
