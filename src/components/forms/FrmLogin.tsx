import { useEffect, useState } from 'react';
import { BsEyeSlashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store/store';
import { Login } from '../../redux/users/actions/UserAction';
import { VIEW_KANBAN } from '../../config/routes/paths';
import LoaderSpinner from '../../assets/loaderSpinner';
import ErrorMessages from './ErrorMessages';
import GoogleButton from '../buttons/GoogleButton';

const FrmLogin = () => {
  /*  */
  const dispatch = useDispatch();

  const loading = useSelector((state: State) => state.user.loading);
  const success = useSelector((state: State) => state.user.success);
  const error = useSelector((state: State) => state.user.error);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<string>('password');
  const typePassword = hidePassword;
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const expiredSessionError = window.localStorage.getItem('refresh_error');

  useEffect(() => {
    window.document.title = 'WorkAt - Login';
  }, [dispatch]);

  const RegExp = {
    general: /^\s*/,
  };

  const showPassword = () => {
    if (hidePassword === 'password') {
      setHidePassword('text');
    } else {
      setHidePassword('password');
    }
  };

  const isFormValid = () => {
    !username ? setUsernameValid(true) : setUsernameValid(false);
    !password ? setPasswordValid(true) : setPasswordValid(false);
  };

  const handleUsername = (evt: any) => {
    setUsername(evt.target.value.replace(RegExp, ''));
  };

  const handlePassword = (evt: any) => {
    setPassword(evt.target.value.replace(RegExp, ''));
  };

  const handleLogin = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    isFormValid();

    dispatch(Login({ email: username, password }));
  };

  if (success.message.includes('Login')) {
    window.location.assign(VIEW_KANBAN);
  }

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSuccess = (result: any) => {
    dispatch(Login({ tokenId: result.credential }, true));
  };

  const handleRegister = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
  };

  return (
    <section className="grid justify-items-center mobile:mt-8 mobile:mx-[5px] tablet:mx-0 laptop:mx-0 laptop:mt-0">
      <section className="flex flex-col align-middle justify-center bg-white p-2 w-auto -mx-3">
        <div className="w-full p-3 mt-auto">
          <div className="relative">
            <div className="block mb-[12px]">
              {expiredSessionError ? (
                <span className="flex items-center justify-center text-red-500 font-raleway">
                  {expiredSessionError}
                </span>
              ) : null}
              <ErrorMessages
                errorTerms={['Invalid']}
                errorState={error}
                className="flex justify-center"
              />
              <label
                htmlFor="username"
                className="font-raleway font-semibold text-[15px] leading-[17.61px] text-gray-color"
              >
                Email:
              </label>
            </div>
            <input
              className={`${
                usernameValid
                  ? 'bg-white border-red-color border'
                  : 'bg-light-color border-light-color'
              } ${
                username && '!border-cyan-color bg-light-blue'
              } focus:outline-none focus:bg-white block appearance-none rounded-[6px] py-3 px-4 min-w-full laptop:w-[448px] laptop:h-[64px] mobile:w-[162px] mobile:h-[35px] tablet:w-[241px] tablet:h-[54px] leading-tight mobile:text-xs tablet:text-[15px] laptop:text-[15px] font-light font-raleway text-gray-color focus:border-cyan-color border`}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsername}
            />
            <ErrorMessages
              errorTerms={['Email', 'must be an email', 'FullTimeForce']}
              errorState={error}
              className="flex flex-col mt-2"
            />
          </div>
        </div>

        <div className="w-full p-3 mt-auto">
          <div className="relative">
            <div className="block mb-[12px]">
              <label
                htmlFor="password"
                className="font-raleway font-semibold text-[15px] leading-[17.61px] text-gray-color"
              >
                Password:
              </label>
            </div>
            <div className="relative">
              <input
                className={`${
                  passwordValid
                    ? 'bg-white border-red-color border'
                    : 'bg-light-color border-light-color'
                } ${
                  password && '!border-cyan-color bg-light-blue'
                } focus:outline-none focus:bg-white block appearance-none rounded-[6px] py-3 px-4 min-w-full laptop:w-[448px] laptop:h-[64px] mobile:w-[162px] mobile:h-[35px] tablet:w-[241px] tablet:h-[54px] leading-tight mobile:text-xs tablet:text-[15px] laptop:text-[15px] font-light font-raleway text-gray-color focus:border-cyan-color border`}
                type={typePassword}
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
              <span className="absolute top-[20px] right-[20px]">
                <BsEyeSlashFill
                  onClick={showPassword}
                  className="w-[28px] h-[24px] text-gray-color cursor-pointer hover:text-silver-color"
                />
              </span>
            </div>
          </div>
          <ErrorMessages
            errorTerms={['Password']}
            errorState={error}
            className="flex flex-col mt-2"
          />
        </div>

        {/* buttons to login or register */}
        <div className="flex flex-row align-middle justify-center gap-5 mt-[34px]">
          <div className="flex justify-center mb-3 mobile:mt-5 laptop:mt-5 tablet:mt-16">
            <input
              className={`w-[132px] h-[54px] rounded-[10px] bg-white border border-cyan-color text-cyan-color font-semibold font-raleway focus:outline-none`}
              type="submit"
              value="Register"
              onClick={handleRegister}
            />
          </div>
          <div className="flex justify-center mb-3 mobile:mt-5 laptop:mt-5 tablet:mt-16">
            {loading ? (
              <LoaderSpinner height="h-8" width="w-[8.2rem]" classes="mt-2" />
            ) : (
              <button
                disabled={loading}
                onClick={handleLogin}
                className="w-[132px] h-[54px] cursor-pointer rounded-[10px] bg-cyan-color hover:bg-cyan-color/80 shadow-lg text-white font-semibold font-raleway focus:outline-none"
              >
                {loading ? (
                  <LoaderSpinner height="h-8" width="w-[8.2rem]" />
                ) : (
                  'Log In'
                )}
              </button>
            )}
          </div>
        </div>
        <div className="text-center mt-[17px]">
          <span className="text-gray-color font-raleway font-semibold font-[15px] leading-[17.61px]">
            Forgot your password?
          </span>
        </div>
        <div className="flex flex-row align-middle justify-center mt-[17px]">
          <div className="border w-[172px] h-[1px] mt-[7px] text-light-color"></div>
          <div className="text-gray-color font-raleway font-semibold font-[15px] leading-[17.61px] mx-2">
            or
          </div>
          <div className="border w-[172px] h-[1px] mt-[7px] text-light-color"></div>
        </div>

        {/* Button to login with google */}
        <GoogleButton
          handleSuccess={handleSuccess}
          text="signin_with"
          CLIENT_ID={CLIENT_ID!}
        />
      </section>
    </section>
  );
};

export default FrmLogin;
