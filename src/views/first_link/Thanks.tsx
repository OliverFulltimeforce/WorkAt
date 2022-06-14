import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { lastStageOpts } from '../../utils/lastStageOpts';
import { VIEW_404 } from '../../config/routes/paths';
import Header from '../../components/header/Header';

interface Props {
  title: string;
  FirstLine: string;
  SecondLine: string;
}

const Thanks: React.FC<Props> = ({ title, FirstLine, SecondLine }) => {
  const [searchParams] = useSearchParams();

  const stage = searchParams.get('stage');
  const cleanStorageData = searchParams.get('cleanStorage');
  const finished = searchParams.get('finished');

  useEffect(() => {
    if (stage) {
      if (lastStageOpts[stage as keyof typeof lastStageOpts]) {
        lastStageOpts[stage as keyof typeof lastStageOpts](
          cleanStorageData!,
          finished!,
        );
      }
    } else {
      window.location.assign(VIEW_404);
    }
  }, [stage, cleanStorageData, finished]);

  return (
    <div className="grid justify-center items-center h-screen">
      <Header
        width="laptop:w-[240px] mobile:w-[154px] tablet:w-[263px]"
        height="laptop:h-[160px] mobile:h-[102px] tablet:h-[174px]"
      />
      <div className="flex flex-col text-center font-raleway text-gray-color mobile:-mt-[380px] tablet:-mt-[900px] laptop:-mt-96">
        <div className="flex justify-center items-center flex-col">
          <span className="font-semibold mobile:text-lg tablet:text-lg laptop:text-2xl mt-10 text-gray-color">
            {title}
          </span>
          <span className="text-base text-center mobile:text-sm tablet:text-sm laptop:text-base">
            {FirstLine}
            <br />
            {SecondLine}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
