import { FaRegStopCircle } from "react-icons/fa";

interface Props {
  onClick(): void;
}

const Stop: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="mt-5 font-raleway mobile:grid mobile:justify-items-center laptop:flex laptop:items-start">
      <button
        className="cursor-pointer rounded-2xl bg-white text-gray-color font-bold text-sm py-3 px-7 laptop:w-[145px] laptop:h-[54px] shadow-lg border border-gray-color mt-5"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          Stop &nbsp;{" "}
          <FaRegStopCircle className="text-gray-color w-[20px] h-[20px]" />
        </div>
      </button>
    </div>
  );
};

export default Stop;
