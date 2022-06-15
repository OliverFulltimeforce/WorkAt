import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RiEdit2Fill } from 'react-icons/ri';

import Submit from '../../components/buttons/Submit';
import Lang from '../../components/extras/Lang';
import Header from '../../components/header/Header';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { ValidateToken } from '../../redux/candidates/actions/CandidateAction';
import {
  VIEW_BEFORE_STARTING,
  VIEW_REQUIRED_STEPS,
  VIEW_WELCOME_THANKS,
} from '../../config/routes/paths';
import { State } from '../../redux/store/store';

import { useTranslation } from 'react-i18next';
import VideoPlayer from '../../components/recorder/player/VideoPlayer';

// TODO: Render each video in the slider and play them.
// TODO: Add functionality to remake button. Use the videos URL in localStorage to set the video to remake in the Stream.tsx file.

const VideoCompleted = () => {
  /*  */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const candidateDetail = useSelector((state: State) => state.info.detail);

  const {
    skills,
    available_from,
    salary_expectations,
    working_reason,
    academic_training,
  } = candidateDetail;

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    dispatch(ValidateToken(token!));
  }, [dispatch, token]);

  const redirectEdition = () => {
    return navigate(`${VIEW_REQUIRED_STEPS}?token=${token}&edit=true`);
  };

  const redirectVideoMaker = () => {
    navigate(`${VIEW_BEFORE_STARTING}?token=${token}`);
  };

  const handleThanksRedirect = () => {
    navigate(
      `${VIEW_WELCOME_THANKS}?stage=interview&cleanStorage=true&finished=true`,
    );
  };

  useEffect(() => {
    window.mediaStreamObject.getTracks().forEach((track: any) => track.stop());
  }, []);

  return (
    <div>
      <Lang />
      <Header
        width="laptop:w-[97.5px] mobile:w-[113px] tablet:w-[154px]"
        height="laptop:h-[65px] mobile:h-[75px] tablet:h-[102px]"
      />
      <div className="grid justify-items-center mobile:px-5 mb-5 mobile:mt-8 laptop:mt-0">
        {candidateDetail && (
          <section className="grid justify-items-center content-center mobile:gap-10 laptop:gap-10 mobile:grid-rows-1 tablet:grid-cols-2 laptop:grid-cols-2 md:px-5 w-full">
            <div className="font-raleway text-gray-color bg-white w-4/5">
              <h2 className="mobile:text-lg laptop:text-2xl">
                {t('video-completed.title')}
              </h2>
              <span className="mobile:text-sm laptop:text-base">
                {t('video-completed.sub-title')}
              </span>
              <div className="mobile:block tablet:hidden laptop:hidden">
                <VideoPlayer
                  onClick={() => {
                    redirectEdition();
                  }}
                />
              </div>
              <hr className="w-ful my-5" />
              <p className="mobile:text-xs laptop:text-sm flex flex-row justify-between">
                {t('video-completed.studies')}{' '}
                <span className="text-cyan-color font-bold">
                  {academic_training}
                </span>
                <button
                  type="submit"
                  onClick={redirectEdition}
                  className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-500"
                >
                  <RiEdit2Fill className="cursor-pointer" />
                </button>
              </p>
              <hr className="w-ful my-5" />
              <h2 className="font-raleway font-normal mobile:text-xs laptop:text-sm text-font-color mb-2">
                {t('video-completed.text-area-title')}
              </h2>
              <div className="relative bg-light-color rounded-[10px] px-2 py-1 min-w-full mobile:w-[336px] mobile:h-[121px] laptop:w-[350px] laptop:h-[121px]">
                <p className="text-gray-color font-raleway font-light text-sm p-2 text-justify">
                  {working_reason}
                  <button
                    className="absolute bottom-[15px] right-[10px] rounded-full p-2 hover:bg-gray-300 active:bg-gray-500"
                    type="submit"
                    onClick={redirectEdition}
                  >
                    <RiEdit2Fill className="cursor-pointer" />
                  </button>
                </p>
              </div>
              <hr className="w-ful my-5" />
              <p className="mobile:text-xs laptop:text-sm">
                {t('video-completed.skill-title')}{' '}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {skills &&
                  skills.map((ability: string, index: number) => (
                    <span
                      key={index}
                      className="bg-cyan-color/90 rounded-2xl p-1 text-white text-center text-xs font-light font-raleway w-36"
                    >
                      {skills && ability}
                    </span>
                  ))}
              </div>
              <hr className="w-ful my-5" />
              <p className="mobile:text-xs laptop:text-sm flex flex-row justify-between">
                {t('video-completed.salary-title')} {salary_expectations}
                <button
                  type="submit"
                  onClick={redirectEdition}
                  className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-500"
                >
                  <RiEdit2Fill className="cursor-pointer" />
                </button>
              </p>
              <hr className="w-ful my-5" />
              <p className="mobile:text-xs laptop:text-sm flex flex-row justify-between">
                {t('video-completed.available-title')} {available_from}
                <button
                  type="submit"
                  onClick={redirectEdition}
                  className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-500"
                >
                  <RiEdit2Fill className="cursor-pointer" />
                </button>
              </p>
            </div>
            <div className="w-4/5">
              <div className="mobile:hidden tablet:block laptop:block">
                <VideoPlayer
                  onClick={() => {
                    redirectVideoMaker();
                  }}
                />
              </div>
              <div className="grid justify-items-center mobile:w-auto tablet:w-[400px] laptop:w-[400px] mobile:mt-[-5px] tablet:mt-[39px] laptop:mt-[39px]">
                <Submit
                  name={t('video-completed.send')}
                  onSubmit={handleThanksRedirect}
                  width="laptop:w-[163px] laptop:h-[59px] mobile:w-[163px] mobile:h-[59px]"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VideoCompleted;
