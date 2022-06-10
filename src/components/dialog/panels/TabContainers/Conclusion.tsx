import { useEffect, useState, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import InputConclusion from '../../../inputs/InputConclusion';
import LoaderSpinner from '../../../../assets/loaderSpinner';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCandidateConclusion } from '../../../../redux/candidates/actions/CandidateAction';
import { State } from '../../../../redux/store/store';
import { IConclusionInv } from '../../../../redux/candidates/types/data';
import { getStorageItem } from '../../../../utils/localStorage';

const Conclusion = () => {
  /*  */
  const dispatch = useDispatch();

  const [goodComment, setGoodComment] = useState<string>('');
  const [badComment, setBadComment] = useState<string>('');

  const currentCandidate = useSelector((state: State) => state.info.detail);
  const updating = useSelector((state: State) => state.info.updating);

  const lastGoodConclusion = useRef<HTMLDivElement>(null);
  const lastBadConclusion = useRef<HTMLDivElement>(null);

  const { _id, name, conclusions, main_status } = currentCandidate;

  const currentUser = getStorageItem('user');

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    if (!goodComment && !badComment) {
      return;
    } else {
      dispatch(
        UpdateCandidateConclusion(_id, {
          good:
            goodComment !== ''
              ? {
                  comment: goodComment,
                  context: main_status,
                  user: currentUser,
                }
              : undefined,
          bad:
            badComment !== ''
              ? {
                  comment: badComment,
                  context: main_status,
                  user: currentUser,
                }
              : undefined,
        }),
      );
    }
    /* clean input field */
    setGoodComment('');
    setBadComment('');
  };

  useEffect(() => {
    lastGoodConclusion.current?.scrollIntoView(false);
  }, [conclusions.good]);

  useEffect(() => {
    lastBadConclusion.current?.scrollIntoView(false);
  }, [conclusions.bad]);

  return (
    <div className="grid justify-items-center">
      <div className="mt-[48px] grid justify-items-start w-[85%]">
        <p className="font-raleway font-semibold text-gray-color text-[20px]">
          {name}
        </p>
      </div>
      <section className="grid justify-items-center grid-cols-2 gap-[10px] w-[85%]">
        <div className="w-full">
          <div className="my-[32px]">
            <p className="font-raleway text-gray-color text-[15px] font-bold uppercase my-3">
              Yes
            </p>
            <div className="relative bg-light-color border-light-color rounded-[5px] w-[435px] h-[372px]">
              <div className="absolute top-5 right-[21px] z-10 h-[18rem] space-y-2 overflow-y-auto">
                {conclusions.good.length === 0
                  ? ''
                  : conclusions.good.map(
                      (value: IConclusionInv, index: number) => (
                        <div key={index}>
                          <div className="flex h-[0.7rem] items-center justify-between">
                            <div className="w-36 h-[0.1rem] bg-gray-300"></div>
                            <div className="text-sm text-gray-400 font-raleway capitalize">
                              {value.context}
                            </div>
                            <div className="w-36 h-[0.1rem] bg-gray-300"></div>
                          </div>
                          <div className="flex flex-row-reverse gap-[11px]">
                            {value.user?.picture ? (
                              <img
                                className="rounded-full h-8"
                                src={value.user?.picture}
                                alt="profile"
                              />
                            ) : null}
                            <div className="bg-cyan-color rounded-[5px] w-[336px] h-auto my-2">
                              <p className="break-words font-raleway text-white text-xs text-right py-1 px-4">
                                {value.comment}
                              </p>
                            </div>
                          </div>
                          <div
                            ref={
                              conclusions.good.indexOf(value) ===
                              conclusions.good.length - 1
                                ? lastGoodConclusion
                                : null
                            }
                          ></div>
                        </div>
                      ),
                    )}
              </div>
              <div className="absolute bottom-4 left-5">
                <hr className="border-[1px] mb-[6px]" />
                <div className="flex items-center">
                  <form onSubmit={onSubmit}>
                    <InputConclusion
                      id="positive"
                      name="positive"
                      placeholder="Aa"
                      value={goodComment}
                      setValue={setGoodComment}
                    />
                  </form>
                  <button onClick={onSubmit} disabled={updating}>
                    {updating ? (
                      <LoaderSpinner width="w-5" height="h-5" classes="ml-3" />
                    ) : (
                      <IoSend className="text-gray-color w-[16px] h-[14px] ml-[8px] cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="my-[32px]">
            <p className="font-raleway text-gray-color text-[15px] font-bold uppercase my-3">
              No
            </p>
            <div className="relative bg-light-color border-light-color rounded-[5px] w-[435px] h-[372px]">
              <div className="absolute top-5 right-[21px] z-10 h-[18rem] space-y-2 overflow-y-auto">
                {conclusions.bad.length === 0
                  ? ''
                  : conclusions.bad.map(
                      (value: IConclusionInv, index: number) => (
                        <div key={index}>
                          <div className="flex h-[0.7rem] items-center justify-between">
                            <div className="w-36 h-[0.1rem] bg-gray-300"></div>
                            <div className="text-sm text-gray-400 font-raleway capitalize">
                              {value.context}
                            </div>
                            <div className="w-36 h-[0.1rem] bg-gray-300"></div>
                          </div>
                          <div className="flex flex-row-reverse gap-[11px]">
                            {value.user?.picture ? (
                              <img
                                className="rounded-full h-8"
                                src={value.user?.picture}
                                alt="profile"
                              />
                            ) : null}
                            <div className="bg-cyan-color rounded-[5px] w-[336px] h-auto my-2">
                              <p className="break-words font-raleway text-white text-xs text-right py-1 px-4">
                                {value.comment}
                              </p>
                            </div>
                          </div>
                          <div
                            ref={
                              conclusions.bad.indexOf(value) ===
                              conclusions.bad.length - 1
                                ? lastBadConclusion
                                : null
                            }
                          ></div>
                        </div>
                      ),
                    )}
              </div>
              <div className="absolute bottom-4 left-5">
                <hr className="border-[1px] mb-[6px]" />
                <div className="flex items-center">
                  <form onSubmit={onSubmit}>
                    <InputConclusion
                      id="negative"
                      name="negative"
                      placeholder="Aa"
                      value={badComment}
                      setValue={setBadComment}
                    />
                  </form>
                  <button onClick={onSubmit} disabled={updating}>
                    {updating ? (
                      <LoaderSpinner width="w-5" height="h-5" classes="ml-3" />
                    ) : (
                      <IoSend className="text-gray-color w-[16px] h-[14px] ml-[8px] cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conclusion;
