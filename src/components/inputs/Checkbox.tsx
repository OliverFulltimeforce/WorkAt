import { BsCheck2All, BsCheck } from 'react-icons/bs';

type CheckboxProps = {
  checkedSingle?: boolean;
  checked?: boolean;
  seen?: boolean;
  checkColor?: string;
  name?: string;
  className?: string;
  htmlFor?: string;
  id: string;
  value?: string;
  onChange: (value: any) => void;
};

export default function Checkbox({
  checkedSingle,
  checked,
  name,
  seen,
  checkColor,
  onChange,
  value,
  className,
  id,
}: CheckboxProps) {
  return (
    <div className="flex">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        className="w-0 opacity-0 hover:cursor-pointer"
        onChange={onChange}
        checked={checked}
      />
      <div className={`${className} hover:cursor-pointer`}>
        {checkedSingle ? (
          <BsCheck className={checkColor} />
        ) : seen ? (
          <BsCheck2All className={checkColor} />
        ) : null}
      </div>
    </div>
  );
}
