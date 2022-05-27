import { useCallback, useEffect, useRef, useState } from "react";
import { MdRestartAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VIEW_VIDEO_COMPLETED } from "../../config/routes/paths";
import CameraOn from "./CameraOn";
import Stop from "./control/Stop";
import { UseCounter } from "../../hooks/useCounter";
import { UseCamera } from "../../hooks/useCamera";
import ProgressVideoBar from "../extras/ProgressVideoBar";
import Recording from "../extras/Recording";

const Stream = () => {
  /*  */
  const navigate = useNavigate();

  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [capture, setCapture] = useState(false);
  const { time, startTimer, pauseTimer, resetTimer, progress } = UseCounter();
  const { isCameraOn, init } = UseCamera();

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  /* START RECORDING */
  /* const handleStartCaptureClick = useCallback(() => {
    setCapture(true);
    startTimer();
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm;codecs=vp9,opus",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [startTimer, handleDataAvailable]); */

  useEffect(() => {
    if (isCameraOn) {
      setCapture(true);
      startTimer();
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm;codecs=vp9,opus",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
    console.log("It's recording");
  }, [handleDataAvailable, isCameraOn, startTimer]);

  /* STOP RECORDING */
  const handleStopCaptureClick = useCallback(() => {
    setCapture(false);
    pauseTimer();
    mediaRecorderRef.current.stop();
  }, [pauseTimer]);

  /* REMAKE RECORDING */
  const handleRemakeCaptureClick = useCallback(() => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm;codecs=vp9,opus",
    });
    if (recordedChunks.length) {
      const url = URL.createObjectURL(blob);
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
    resetTimer();
  }, [recordedChunks, resetTimer]);

  const handleSubmitCapture = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp9,opus",
      });

      const video_url = URL.createObjectURL(blob);
      const formData = new FormData();
      formData.append("video", blob);
      navigate(VIEW_VIDEO_COMPLETED);
      window.URL.revokeObjectURL(video_url);
      setRecordedChunks([]);
    }
  }, [navigate, recordedChunks]);

  useEffect(() => {
    if (time.minute === 2) {
      handleStopCaptureClick();
    }
  }, [handleStopCaptureClick, time.minute]);

  return (
    <div className="relative">
      {/* COUNTERDOWN FOR REFERENCES OF TIME */}
      <div className="hidden">
        <div className="absolute top-5 left-5 z-10 text-white font-raleway">
          <span>{time.minute >= 10 ? time.minute : "0" + time.minute}</span>
          &nbsp;:&nbsp;
          <span>{time.second >= 10 ? time.second : "0" + time.second}</span>
        </div>
      </div>

      {/* ANIMATION OF RECORDING */}
      <div className={`${capture ? "block" : "hidden"}`}>
        <Recording />
        <ProgressVideoBar value={progress} />
      </div>

      {/* CAMERA */}
      <CameraOn webcamRef={webcamRef} isCameraOn={isCameraOn} init={init} />

      {/* VALIDATION IF RECORDING */}
      {capture && <Stop onClick={handleStopCaptureClick} />}

      {/* VALIDATION WHEN RECORDING STOP */}
      {recordedChunks.length > 0 && (
        <div className="flex flex-row mobile:justify-center laptop:justify-start font-raleway w-full mt-5">
          <button
            className="cursor-pointer rounded-2xl bg-white text-gray-color font-bold text-sm py-3 px-7 w-[140px] h-[54px] shadow-lg border border-gray-color mt-5"
            onClick={handleRemakeCaptureClick}
          >
            <div className="flex items-center justify-between">
              Remake &nbsp;{" "}
              <MdRestartAlt className="text-gray-color w-[20px] h-[20px]" />
            </div>
          </button>

          <button
            className="cursor-pointer rounded-2xl bg-white text-cyan-color font-bold text-sm py-3 px-7 w-[172px] h-[54px] shadow-lg border border-cyan-color mt-5 ml-5"
            onClick={handleSubmitCapture}
          >
            Save & Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Stream;
