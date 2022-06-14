import CurrencyInput from 'react-currency-input-field';
import Alert from '../extras/Alert';
import SelectCoin from './SelectCoin';

interface Props {
  id: string;
  label: string;
  placeholder: string;
  RegExp: string | object;
  setValue?: any;
  showAlert: any;
  value: string;
  width: string;
  data: any;
  coin: any;
  setCoin: any;
}

const Currency: React.FC<Props> = ({
  id,
  placeholder,
  label,
  RegExp,
  width,
  showAlert,
  setValue,
  value,
  data,
  coin,
  setCoin,
}) => {
  /*  */
  const onChange = (evt: any) => {
    setValue(evt.target.value.replace(RegExp, ''));
  };

  /* const currency_value = `${t("currency_value")}`; */

  return (
    <div className={`${width} w-full p-3 mt-auto`}>
      <div className="relative">
        <div className="mobile:block laptop:hidden tablet:hidden">
          <label
            htmlFor={label}
            className="font-raleway font-light text-sm text-gray-color ml-2"
          >
            {label}
          </label>
        </div>
        {showAlert && <Alert />}
        <CurrencyInput
          id={id}
          placeholder={placeholder}
          allowDecimals={false}
          className={`${
            showAlert
              ? 'bg-white border-red-color border'
              : 'bg-light-color border-light-color'
          } ${value && '!border-cyan-color bg-light-blue'}
          focus:outline-none focus:bg-white block appearance-none laptop:rounded-2xl mobile:rounded-[10px] py-3 mobile:pl-[60px] tablet:pl-[70px] laptop:pl-[70px] pr-4 min-w-full mobile:w-[161px] mobile:h-[35px] tablet:w-[241px] tablet:h-[54px] laptop:w-[287px] laptop:h-[54px] leading-tight mobile:text-xs laptop:text-[15px] desktop:text-base font-raleway font-light text-gray-color focus:border-cyan-color border focus:shadow-cyan-color/50 focus:shadow-sm placeholder:text-gray-color placeholder:font-raleway`}
          prefix=""
          step={10}
          value={value}
          onChange={onChange}
        />
        <SelectCoin
          data={data}
          value={coin}
          setValue={setCoin}
          placeholder="U$D"
        />
      </div>
    </div>
  );
};

export default Currency;
