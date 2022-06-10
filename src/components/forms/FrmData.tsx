import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* Components */
import Loading from '../extras/Loading';
import Submit from '../buttons/Submit';
import SingleSelect from '../inputs/SingleSelect';
import TextArea from '../inputs/TextArea';
import Currency from '../inputs/Currency';

/* Paths */
import { VIEW_DETAILS, VIEW_VIDEO_COMPLETED } from '../../config/routes/paths';

/* Json files */
import Training from '../../assets/json/College.json';
import Available from '../../assets/json/Available.json';
import Skills from '../../assets/json/Skills.json';
import Coins from '../../assets/json/Coin.json';

/* Redux */
import { State } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClearCandidateSuccess,
  UpdateCandidateInfo,
} from '../../redux/candidates/actions/CandidateAction';
import MultipleSelect from '../inputs/MultipleSelect';

type Props = {
  token: string;
};

const FrmData: React.FC<Props> = ({ token }) => {
  /*  */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /* Regular Expressions */
  const RegExp = {
    numbers: /\D/g,
  };

  /* json file information */
  const [optionValues] = useState({
    training: Training,
    time: Available,
    skills: Skills,
    coins: Coins,
  });

  const { skills, training, time, coins } = optionValues;

  const candidateDetail = useSelector((state: State) => state.info.detail);

  const { _id } = candidateDetail;

  /* States from the component */
  let [college, setCollege] = useState({ id: 0, name: '' });
  let [currency, setCurrency] = useState({ id: 0, name: '' });
  let [salary, setSalary] = useState('');
  let [available, setAvailable] = useState({ id: 0, name: '' });
  let [skill, setSkill] = useState<{ id: number; name: string }[]>([]);
  let [description, setDescription] = useState('');

  /* Values which will be validated */
  const [isCollegeValid, setIsCollegeValid] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCurrencyValid, setIsCurrencyValid] = useState(false);
  const [isSalaryValid, setIsSalaryValid] = useState(false);
  const [isSkillValid, setIsSkillValid] = useState(false);

  /* GET EDIT DATA TOGGLE */
  const [searchParams] = useSearchParams();
  const toEdit = searchParams.get('edit');

  /*  */
  const AddNewCandidate = (user: any) =>
    dispatch(UpdateCandidateInfo(_id, user));

  const loading = useSelector((state: State) => state.info.loading);
  const success = useSelector((state: State) => state.info.success);

  /* Function to store validation */
  const isFormValid = () => {
    college.name === '' ? setIsCollegeValid(true) : setIsCollegeValid(false);
    currency.name === '' ? setIsCurrencyValid(true) : setIsCurrencyValid(false);
    salary === '' ? setIsSalaryValid(true) : setIsSalaryValid(false);
    !skill ? setIsSkillValid(true) : setIsSkillValid(false);
  };

  /* OnSubmit */
  const onSubmit = (evt: any) => {
    evt.preventDefault();

    isFormValid();

    if (!college || !currency || !salary || !skill) {
      return;
    } else {
      let skills = skill.map((skill) => skill.name);

      AddNewCandidate({
        academic_training: college.name,
        available_from: available.name,
        skills,
        salary_expectations: `${currency.name} ${salary}`,
        working_reason: description,
      });
    }
  };

  const handleEditClick = (evt: any) => {
    evt.preventDefault();

    isFormValid();

    if (!salary || !skill) {
      return;
    } else {
      let skills = skill.map((skill) => skill.name);

      AddNewCandidate({
        academic_training: college.name,
        available_from: available.name,
        skills,
        salary_expectations: `${currency.name} ${salary}`,
        working_reason: description,
      });
    }
  };

  const handleCancelClick = () => {
    navigate(`${VIEW_VIDEO_COMPLETED}?token=${token}`);
  };

  const name = candidateDetail.name;

  useEffect(() => {
    if (toEdit === 'true') {
      const collegeToEdit = training.find(
        (t) => t.name === candidateDetail.academic_training,
      );

      const currencyToEdit = coins.find(
        (c) => c.name === candidateDetail.salary_expectations.split(' ')[0],
      );

      const availableToEdit = time.find(
        (t) => t.name === candidateDetail.available_from,
      );

      const skillsToEdit = candidateDetail.skills.reduce(
        (prev: any, skill: any) => {
          return [...prev, { id: 0, name: skill }];
        },
        [],
      );

      setDescription(candidateDetail.working_reason);
      setCollege(collegeToEdit!);
      setSalary(candidateDetail.salary_expectations.split(' ')[1]);
      setCurrency(currencyToEdit!);
      setAvailable(availableToEdit!);
      setSkill(skillsToEdit!);
    }
  }, [toEdit, candidateDetail, coins, training, time]);

  useEffect(() => {
    if (!loading && success.message !== '' && toEdit === 'true') {
      navigate(`${VIEW_VIDEO_COMPLETED}?token=${token}`);
    } else if (!loading && success.message !== '' && !toEdit) {
      navigate(`${VIEW_DETAILS}?token=${token}`);
    }
  }, [loading, success, toEdit, token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(ClearCandidateSuccess(dispatch));
    };
  }, [dispatch]);

  return (
    <section className="grid place-items-center h-full mt-10 bg-white mobile:p-5">
      <h2 className="font-raleway text-gray-color mobile:text-sm laptop:text-xl mb-3 mobile:w-full laptop:w-9/12 tablet:w-11/12">
        {t('greetings')}, {name}
      </h2>
      <section className="laptop:w-9/12 mobile:w-full tablet:w-11/12 bg-white">
        <div className="flex flex-wrap -mx-3">
          <SingleSelect
            display="hidden"
            data={training}
            for="college"
            id="college"
            label={t('info.idiom.label')}
            placeholder={t('info.idiom.placeholder')}
            setValue={setCollege}
            showAlert={isCollegeValid}
            value={college}
            width="laptop:w-1/3 mobile:w-full tablet:w-1/3"
          />
          <Currency
            id="salary"
            label={t('info.currency.placeholder')}
            placeholder={t('info.currency.placeholder')}
            RegExp={RegExp.numbers}
            setValue={setSalary}
            showAlert={isSalaryValid}
            value={salary}
            data={coins}
            coin={currency}
            setCoin={setCurrency}
            width="laptop:w-1/3 mobile:w-1/2 tablet:w-1/3"
          />
          <SingleSelect
            display="hidden"
            data={time}
            for="available"
            id="available"
            label={t('info.available.label')}
            placeholder={t('info.available.placeholder')}
            setValue={setAvailable}
            value={available}
            width="laptop:w-1/3 mobile:w-1/2 tablet:w-1/3"
          />
          <MultipleSelect
            data={skills}
            display="flex"
            showAlert={isSkillValid}
            value={skill}
            setValue={setSkill}
            width="laptop:w-full mobile:w-full tablet:w-full"
          />
          <TextArea
            id="description"
            setValue={setDescription}
            value={description}
          />
        </div>
        {!toEdit ? (
          <Submit
            name={t('submit_button.name')}
            width="w-full tablet:w-28"
            onSubmit={onSubmit}
          />
        ) : (
          <div className="flex justify-center">
            <Submit
              name="Cancel"
              width="w-full tablet:w-28 mx-2 bg-transparent text-cyan-color border-cyan-color border hover:bg-transparent shadow-none"
              onSubmit={handleCancelClick}
            />
            <Submit
              name="Save"
              width="w-full tablet:w-28 mx-2"
              onSubmit={handleEditClick}
            />
          </div>
        )}
      </section>
      {loading && <Loading />}
    </section>
  );
};

export default FrmData;
