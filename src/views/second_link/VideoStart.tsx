import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ValidateToken } from '../../redux/candidates/actions/CandidateAction';
import { VIEW_404 } from '../../config/routes/paths';
import { State } from '../../redux/store/store';
import Lang from '../../components/extras/Lang';
import QskInterview from '../../components/extras/QskInterview';
import Header from '../../components/header/Header';
import Stream from '../../components/recorder/Stream';

const VideoStart = () => {
  const dispatch = useDispatch();

  const [videoCounter, setVideoCounter] = useState(1);

  const error = useSelector((state: State) => state.info.error);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (error.status === 401) {
    window.location.href = VIEW_404;
  }

  useEffect(() => {
    dispatch(ValidateToken(token!));

    return () => {
      window.mediaStreamObject
        .getTracks()
        .forEach((track: any) => track.stop());
    };
  }, [dispatch, token]);

  return (
    <>
      <Lang />
      <Header
        width="laptop:w-[97.5px] mobile:w-[113px] tablet:w-[154px]"
        height="laptop:h-[65px] mobile:h-[75px] tablet:h-[102px]"
      />
      <div className="grid justify-items-center">
        <section className="grid justify-items-center content-center mobile:gap-10 laptop:gap-10 mobile:grid-rows-1 laptop:grid-cols-2 md:px-5 mt-10">
          <div>
            <Stream
              videoCounter={videoCounter}
              setVideoCounter={setVideoCounter}
              token={token!}
            />
          </div>
          <div>
            <QskInterview
              classes="text-[15px]"
              videoCounter={videoCounter}
              isRecording={true}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoStart;
