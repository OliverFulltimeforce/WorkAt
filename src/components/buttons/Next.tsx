import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  link: string;
  width: string;
  cursor?: string;
}

const Next: React.FC<Props> = ({ name, link, width, cursor }) => {
  /*  */
  const navigate = useNavigate();

  const onClick = () => {
    navigate(link);
  };

  return (
    <div className="flex justify-center my-8">
      <input
        className={`${width} ${cursor} rounded-2xl bg-cyan-color shadow-cyan-color/50 hover:bg-cyan-color/80 shadow-lg text-white font-semibold mobile:w-[106px] mobile:h-[59px] laptop:w-[106px] laptop:h-[59px]  focus:outline-none`}
        type="submit"
        value={name}
        onClick={onClick}
      />
    </div>
  );
};

export default Next;
