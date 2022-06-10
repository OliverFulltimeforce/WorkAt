import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Webcam from 'react-webcam';

interface Props {
  webcamRef?: any;
  isCameraOn: boolean;
  init: any;
}

const CameraOn: React.FC<Props> = ({ webcamRef, isCameraOn, init }) => {
  /*  */
  const { t } = useTranslation();

  /*  */
  useEffect(() => {
    const onClick = async () => {
      const constraints = {
        video: {
          width: 400,
          height: 320,
        },
      };
      await init(constraints);
    };
    onClick();
  }, [init]);

  return (
    <div
      className={`${
        isCameraOn
          ? ''
          : 'bg-light-color border-light-color rounded-2xl laptop:w-[400px] laptop:h-[320px] mobile:w-[333px] mobile:h-[266px]'
      } relative`}
    >
      <div className="z-10">
        <Webcam audio={true} ref={webcamRef} height={320} width={400} />
      </div>
      <div
        className={`${
          !isCameraOn ? 'block' : 'hidden'
        } absolute laptop:top-[145px] laptop:left-[115px] mobile:top-[115px] mobile:left-[85px]`}
      >
        <span className="font-raleway text-gray-color text-xs">
          {t('details.turn_camera')}
        </span>
      </div>
    </div>
  );
};

export default CameraOn;
