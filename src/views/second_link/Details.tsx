import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ValidateToken } from "../../redux/candidates/actions/CandidateAction";
import Lang from "../../components/extras/Lang";
import Header from "../../components/header/Header";
import CameraOn from "../../components/recorder/CameraOn";
import { VIEW_404, VIEW_BEFORE_STARTING } from "../../config/routes/paths";
import { State } from "../../redux/store/store";
import { UseCamera } from "../../hooks/useCamera";

const Details = () => {
  /*  */
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCameraOn, init } = UseCamera();
  const error = useSelector((state: State) => state.info.error);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const name = t("instructions.get_started");

  if (error.status === 401) {
    window.location.href = VIEW_404;
  }

  useEffect(() => {
    dispatch(ValidateToken(token!));
  }, [dispatch, token]);

  return (
    <>
      <Lang />
      <Header
        width="laptop:w-[97.5px] mobile:w-[161px] tablet:w-[154px]"
        height="laptop:h-[65px] mobile:h-[107px] tablet:h-[102px]"
      />
      <div className="grid justify-items-center laptop:w-full mobile:w-full tablet:w-full">
        <section className="grid justify-items-center content-center mobile:gap-10 laptop:gap-20 mobile:grid-rows-1 tablet:grid-cols-2 laptop:grid-cols-2 md:px-5 mt-10">
          <div>
            <CameraOn isCameraOn={isCameraOn} init={init} />
          </div>
          <div className="bg-white">
            <h2 className="font-raleway font-semibold text-cyan-color mobile:text-lg laptop:text-[22px]">
              {t("details.title")}
            </h2>
            <p className="font-raleway font-normal text-cyan-color mobile:text-base laptop:text-xl mt-2">
              {t("details.sub-title.line_1")}
              <br /> {t("details.sub-title.line_2")}
            </p>
            <ul className="list-disc font-raleway text-gray-color mobile:text-sm laptop:text-xs ml-5 mt-5 w-[283px]">
              <li className="my-2">{t("details.rules.line_1")}</li>
              <li className="my-2">{t("details.rules.line_2")}</li>
              <li className="my-2">{t("details.rules.line_3")}</li>
              <li className="my-2">{t("details.rules.line_4")}</li>
            </ul>
            <div className="grid place-content-start w-full">
              <div className="flex justify-center my-8">
                <input
                  className={`${
                    !isCameraOn ? "cursor-not-allowed" : "cursor-pointer"
                  } laptop:w-[155px] laptop:h-[59px] mobile:w-[155px] mobile:h-[59px] rounded-2xl bg-cyan-color shadow-cyan-color/50 hover:bg-cyan-color/80 shadow-lg text-white font-semibold focus:outline-none`}
                  type="submit"
                  value={name}
                  disabled={!isCameraOn ? true : false}
                  onClick={() => navigate(VIEW_BEFORE_STARTING)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Details;
