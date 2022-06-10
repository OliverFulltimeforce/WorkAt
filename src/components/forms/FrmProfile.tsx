import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store/store';
import { getStorageItem } from '../../utils/localStorage';
import { UpdateInfo } from '../../redux/users/actions/UserAction';
import Text from '../inputs/Text';
import Date from '../inputs/Date';
import SingleSelect from '../inputs/SingleSelect';
import Countries from '../../assets/json/Countries.json';
import LoaderSpinner from '../../assets/loaderSpinner';

type FrmProfileProps = {
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
};

export default function FrmProfile({
  isEditable,
  setIsEditable,
}: FrmProfileProps) {
  const dispatch = useDispatch();

  const updating = useSelector((state: State) => state.user.updating);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState(undefined);
  const [password, setPassword] = useState<string>('');
  const [position_name, setPosition_name] = useState<string>('');
  const [workingSince, setWorkingSince] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [country, setCountry] = useState({ id: 0, name: '' });

  /* json file information */
  const [optionValues] = useState({
    nation: Countries,
  });

  const { nation } = optionValues;

  const currentUser = getStorageItem('user');

  /* Regular Expressions */
  const RegExp = {
    general: /^\s*/,
    characters: /[0-9]/g,
    numbers: /\D/g,
  };

  const userCountry = useMemo(() => {
    const getUserCountry = () => {
      return { id: 0, name: currentUser.country ? currentUser.country : '' };
    };
    return getUserCountry();
  }, [currentUser.country]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(
      UpdateInfo(currentUser._id, {
        name,
        email,
        phone,
        position_name,
        working_since: workingSince,
        country: country.name,
      }),
    );
  };

  useEffect(() => {
    setName(currentUser.name ? currentUser.name : '');
    setEmail(currentUser.email ? currentUser.email : '');
    setPhone(currentUser.phone ? currentUser.phone : undefined);
    setWorkingSince(currentUser.working_since ? currentUser.working_since : '');
    setPosition_name(
      currentUser.position_name ? currentUser.position_name : '',
    );
    setCountry(userCountry);
  }, [
    currentUser.name,
    currentUser.email,
    currentUser.phone,
    currentUser.working_since,
    currentUser.position_name,
    userCountry,
  ]);

  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="name" className="ml-4 font-raleway font-medium">
            Name:
          </label>
          <Text
            id="name"
            label="Name"
            type="text"
            name="name"
            RegExp={RegExp.characters}
            setValue={isEditable ? setName : false}
            width="w-[26.5rem]"
            value={name}
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="ml-4 font-raleway font-medium">
            Email:{' '}
            {isEditable && currentUser.google_sign_in ? (
              <span className="text-red-500">*This field cannot be edited</span>
            ) : null}
          </label>
          <Text
            id="email"
            type="email"
            name="email"
            RegExp={RegExp.characters}
            setValue={
              currentUser.google_sign_in ? false : isEditable ? setEmail : false
            }
            width="w-[26.5rem]"
            value={email}
            placeholder="Email"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="phone" className="ml-4 font-raleway font-medium">
            Phone:
          </label>
          <Text
            id="phone"
            type="text"
            name="phone"
            RegExp={RegExp.numbers}
            setValue={isEditable ? setPhone : false}
            width="w-[26.5rem]"
            value={phone}
            placeholder="Phone"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Country" className="ml-4 font-raleway font-medium">
            Country:
          </label>
          <SingleSelect
            data={nation}
            display="flex"
            id="country"
            for="country"
            label="Country"
            placeholder="Country"
            setValue={isEditable ? setCountry : false}
            showAlert={false}
            value={country}
            width="w-[26.5rem]"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="position" className="ml-4 font-raleway font-medium">
            Position:
          </label>
          <Text
            id="position"
            type="text"
            name="position"
            RegExp={RegExp.characters}
            setValue={isEditable ? setPosition_name : false}
            width="w-[26.5rem]"
            value={position_name}
            placeholder="Position"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="workingSince"
            className="ml-4 font-raleway font-medium"
          >
            Working Since:
          </label>
          <Date
            id="workingSince"
            label="Working Since"
            name="workingSince"
            placeholder="Working Since"
            setValue={isEditable ? setWorkingSince : false}
            width="w-[26.5rem]"
            value={workingSince}
          />
        </div>
      </div>
      {!currentUser.google_sign_in ? (
        <div className="flex flex-col mt-4 space-y-5">
          <div className="flex items-center ml-4 gap-x-3 text-gray-400 font-raleway text-sm">
            <div>Edit Password</div>
            <div className="w-[44.3rem] h-[0.1rem] bg-gray-300"></div>
          </div>
          <div className="flex">
            <Text
              id="password"
              type="password"
              name="password"
              RegExp={RegExp.general}
              setValue={setPassword}
              width="w-[26.5rem]"
              value={password}
              placeholder="New password"
            />
            <Text
              id="password-confirm"
              type="password"
              name="password-confirm"
              RegExp={RegExp.general}
              setValue={setConfirmPassword}
              width="w-[26.5rem]"
              value={confirmPassword}
              placeholder="Confirm Password"
            />
          </div>
        </div>
      ) : null}
      {isEditable ? (
        <div className="flex space-x-4 pt-8">
          <button
            className="flex items-center justify-center cursor-pointer border-2 border-cyan-color hover:bg-slate-100 rounded-2xl bg-white text-cyan-color font-bold font-raleway mobile:py-2 mobile:h-[59px] mobile:w-[106px] laptop:h-[59px] laptop:w-[106px] focus:outline-none active:bg-slate-300"
            onClick={() => setIsEditable(!isEditable)}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={handleSubmit}
            className="flex items-center justify-center cursor-pointer rounded-2xl bg-cyan-color shadow-cyan-color/50 hover:bg-cyan-color/80 shadow-lg text-white font-semibold font-raleway mobile:py-2 mobile:h-[59px] mobile:w-[106px] laptop:h-[59px] laptop:w-[106px] focus:outline-none"
          >
            {updating ? (
              <LoaderSpinner
                width="w-7"
                height="h-7"
                stroke="white"
                fill="white"
              />
            ) : (
              'Save'
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
