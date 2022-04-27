import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import './../../assets/scss/Slider.scss';

interface Props {
  direction: string;
  moveSlide(): void;
}

const SliderControl: React.FC<Props> = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={`${
        direction === 'next'
          ? 'btn-slide next focus:outline-none'
          : 'btn-slide prev focus:outline-none'
      }`}
    >
      <div>
        {direction === 'next' ? (
          <RiArrowRightSLine className="icons-color" />
        ) : (
          <RiArrowLeftSLine className="icons-color" />
        )}
      </div>
    </button>
  );
};

export default SliderControl;
