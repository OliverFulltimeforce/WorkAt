import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import LoaderSpinner from '../../assets/loaderSpinner';
import { State } from '../../redux/store/store';

interface Props {
  alt: string;
  classes: boolean;
  image: string;
  isVerify: any;
  message?: string;
  onClick: any;
  setValue: any;
  status?: string;
  title?: string;
  value: boolean;
}

const Modal: React.FC<Props> = ({
  alt,
  classes,
  image,
  isVerify,
  message,
  onClick,
  setValue,
  status,
  title,
  value,
}) => {
  /*  */
  const { t } = useTranslation();

  const updatingCandidate = useSelector((state: State) => state.info.updating);
  const updatingPosition = useSelector(
    (state: State) => state.positions.updating,
  );
  const updatingUser = useSelector((state: State) => state.user.updating);

  return (
    <Transition.Root show={value} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        onClose={setValue}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[613px] h-[330px]">
              <button
                className="absolute top-[10px] right-[20px] focus:outline-none"
                onClick={onClick}
              >
                <IoCloseCircleOutline className="text-gray-color w-[20px] h-[20px]" />
              </button>
              <div className="bg-white px-4 pt-5 pb-4">
                <div className="w-full">
                  <div className="relative mt-[10px] grid justify-items-center">
                    <Dialog.Title as="div" className="mb-[15px]">
                      <img
                        src={process.env.PUBLIC_URL + `/images/${image}.svg`}
                        alt={alt}
                        className="w-[104px] h-[104px]"
                      />
                    </Dialog.Title>
                    <div className="mt-2 w-[366px]">
                      <p className="text-center text-[15px] font-raleway">
                        {title}
                        <span
                          className={`${
                            classes ? 'font-bold text-gray-color' : 'hidden'
                          }`}
                        >
                          {status}
                        </span>
                      </p>
                      <p className="text-center text-[15px] font-medium text-gray-color font-raleway">
                        {message}
                      </p>
                      <div className="flex justify-center">
                        {alt === 'reject' && <div></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center gap-[20px] mt-[15px]">
                <button
                  type="button"
                  className="w-[132px] h-[54px] rounded-[10px] border border-cyan-color px-4 py-2 text-[15px] font-bold text-cyan-color focus:outline-none"
                  onClick={onClick}
                >
                  {t('modal.buttons.cancel')}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-[132px] h-[54px] rounded-[10px] border border-cyan-color px-4 py-2 bg-cyan-color text-[15px] font-bold text-white focus:outline-none"
                  onClick={isVerify}
                >
                  {updatingCandidate || updatingPosition || updatingUser ? (
                    <LoaderSpinner
                      height="h-7"
                      width="w-7"
                      stroke="white"
                      fill="white"
                    />
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
