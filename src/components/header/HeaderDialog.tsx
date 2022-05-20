import { useSelector } from 'react-redux';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { State } from '../../redux/store/store';
import secondaryStatus from '../../config/kanban/constants';
import Dropdown from '../inputs/Dropdown';
import getCandidateDetailHeader from '../../utils/getCandidateDetailHeader';

interface Props {
  isClose: any;
  color: string;
}

const HeaderDialog: React.FC<Props> = ({ isClose, color }) => {
  const details = useSelector((state: State) => state.info.detail);
  const position_applied = details.position?.title;

  const headerColor = secondaryStatus.find(
    (status) => status.value === details.secondary_status,
  )?.color;

  const headerMainText = getCandidateDetailHeader(details.main_status);

  return (
    <h4 className={headerColor ? headerColor : color}>
      <div className="flex justify-center relative">
        <span className="text-white text-[15px] font-semibold font-raleway uppercase py-2">
          {headerMainText} {position_applied ? position_applied : 'N/A'}
        </span>
        <Dropdown />
        <button className="absolute top-[7px] right-[15px]" onClick={isClose}>
          <IoCloseCircleOutline className="text-white w-[24px] h-[24px]" />
        </button>
      </div>
    </h4>
  );
};

export default HeaderDialog;
