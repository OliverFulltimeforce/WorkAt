import Multiselect from 'multiselect-react-dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Alert from '../extras/Alert';
import './../../assets/scss/MultiSelect.scss';

interface OptionValues {
  id: number;
  name: string;
}

interface Props {
  data: OptionValues[];
  display?: string;
  showAlert?: any;
  width: string;
  value: any;
  setValue: any;
}

const MultipleSelect: React.FC<Props> = (props) => {
  /*  */
  const onSelection = (selectedList: any) => {
    props.setValue(selectedList);
  };

  const onRemoving = (selectedList: any) => {
    props.setValue(selectedList);
  };

  return (
    <div className={`${props.width} p-3 mt-auto`}>
      <div className="relative">
        <div className="laptop:hidden mobile:block tablet:hidden">
          <label
            htmlFor="Skills"
            className="font-raleway font-light text-sm text-gray-color ml-2"
          >
            Skills:
          </label>
        </div>
        {props.showAlert && <Alert />}
        <Multiselect
          options={props.data}
          placeholder="Skills"
          hidePlaceholder={true}
          avoidHighlightFirstOption={true}
          onSelect={onSelection}
          onRemove={onRemoving}
          selectedValues={props.value}
          displayValue="name"
        />
        <span
          className={`mobile:${props.display} laptop:hidden ml-3 absolute mobile:inset-y-[42px] tablet:inset-y-7 laptop:inset-y-7 right-0 items-center pr-2 pointer-events-none`}
        >
          <RiArrowDropDownLine
            className="h-8 w-8 text-gray-color"
            aria-hidden="true"
          />
        </span>
      </div>
    </div>
  );
};

export default MultipleSelect;
