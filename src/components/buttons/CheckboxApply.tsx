interface Props {
  id: string;
  classes?: string;
  direction?: string;
  htmlFor: string;
  message: string;
  subMessage?: string;
  value: any;
  setValue: any;
  width: string;
}

const CheckboxApply: React.FC<Props> = ({
  id,
  classes,
  direction,
  message,
  subMessage,
  htmlFor,
  value,
  setValue,
  width,
}) => {
  /*  */
  const onChange = (evt: any) => {
    setValue(evt.target.checked);
  };

  return (
    <div className={`grid ${classes} w-full mt-6`}>
      <div className={`flex ${direction} items-center pl-2 pr-4`}>
        <input
          id={id}
          className="ml-2 mr-2 focus:outline-none"
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        <label
          className={`${width} font-raleway font-light mobile:text-xs laptop:text-[15px]`}
          htmlFor={htmlFor}
        >
          <span className="text-gray-color">{message}</span>
          <span className="text-gray-color font-semibold">{subMessage}</span>
        </label>
      </div>
    </div>
  );
};

export default CheckboxApply;
