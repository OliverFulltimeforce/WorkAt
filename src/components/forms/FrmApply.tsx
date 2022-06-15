import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* Components */
import Text from '../inputs/Text';
import SingleSelect from '../inputs/SingleSelect';
import File from '../inputs/File';
import CheckboxApply from '../buttons/CheckboxApply';
import Submit from '../buttons/Submit';
import Loading from '../extras/Loading';
import Date from '../inputs/Date';
import ErrorMessages from '../forms/ErrorMessages';

/* Paths */
import { VIEW_APPLY_THANKS } from '../../config/routes/paths';

/* Json files */
import Countries from '../../assets/json/Countries.json';
import English from '../../assets/json/Language.json';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store/store';
import {
  CleanCandidateErrors,
  CreateCandidate,
} from '../../redux/candidates/actions/CandidateAction';
import { getPositionInfo } from '../../redux/positions/actions/PositionsActions';

interface Props {
  _id: string | null;
}

const FrmApply: React.FC<Props> = ({ _id }) => {
  /*  */
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maxFileSize = 10000000;

  const positionInfo = useSelector((state: State) => state.positions.info);
  const candidateError = useSelector((state: State) => state.info.error);

  /* Regular Expressions */
  const RegExp = {
    general: /^\s*/,
    characters: /[0-9]/g,
    numbers: /\D/g,
  };

  /* json file information */
  const [optionValues] = useState({
    country: Countries,
    english: English,
  });

  const { country, english } = optionValues;

  /* It will capture id of job position */
  useEffect(() => {
    const JobInfo = () => dispatch(getPositionInfo(_id!));
    JobInfo();
  }, [_id, dispatch]);

  /* States from the component */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [idiom, setIdiom] = useState({ id: 0, name: '' });
  const [nation, setNation] = useState({ id: 0, name: '' });
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [file, setFile] = useState<string | Blob | any>();
  const [terms, setTerms] = useState(false);
  const [upload, setUpload] = useState(false);

  /* Values which will be validated */
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isIdiomValid, setIsIdiomValid] = useState(false);
  const [isNationValid, setIsNationValid] = useState(false);
  const [isTermsValid, setIsTermsValid] = useState(false);
  const [isFileHigh, setIsFileHigh] = useState(false);
  const [message, setMessage] = useState('');

  /* Function to store validation */
  const isFormValid = () => {
    name === '' ? setIsNameValid(true) : setIsNameValid(false);
    email === '' ? setIsEmailValid(true) : setIsEmailValid(false);
    phone === '' ? setIsPhoneValid(true) : setIsPhoneValid(false);
    idiom.name === '' ? setIsIdiomValid(true) : setIsIdiomValid(false);
    nation.name === '' ? setIsNationValid(true) : setIsNationValid(false);
    terms === false
      ? setIsTermsValid(!isTermsValid)
      : setIsTermsValid(isTermsValid);
  };

  const onChange = (evt: any) => {
    setFile(evt.target.files[0]);
  };

  useEffect(() => {
    /* validates if a file has been selected to change icon in File component */
    if (!file) {
      setUpload(false);
      return;
    } else {
      setUpload(true);
      if (file.size > maxFileSize) {
        setIsFileHigh(true);
        setMessage('File is too large. Maximum file size is 10MB');
      } else if (file.type === 'application/pdf') {
        dispatch(CleanCandidateErrors(dispatch));
      } else {
        setIsFileHigh(false);
      }
    }

    if (terms) {
      dispatch(CleanCandidateErrors(dispatch));
    }
  }, [file, dispatch, terms]);

  /*  */
  const loading = useSelector((state: State) => state.info.loading);
  const success = useSelector((state: State) => state.info.success);

  /* OnSubmit */
  const onSubmit = (evt: any) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('birth_date', birth);
    formData.append('phone', phone);
    formData.append('english_level', idiom.name);
    formData.append('country', nation.name);
    formData.append('linkedin', linkedin);
    formData.append('portfolio', portfolio);
    formData.append('position', positionInfo._id!);
    formData.append('terms', terms ? 'true' : 'false');
    formData.append('cv', file);

    evt.preventDefault();

    isFormValid();

    if (!name || !email || !phone || !idiom || !nation) {
      return;
    } else {
      dispatch(CreateCandidate(formData));
    }
  };

  if (!loading && success.status === 201) {
    window.location.assign(
      `${VIEW_APPLY_THANKS}?stage=application&cleanStorage=true&finished=true`,
    );
  }

  let job_title = positionInfo.title;

  return (
    <section className="grid justify-items-center mobile:mt-8 mobile:mx-[5px] tablet:mx-0 laptop:mx-0 laptop:mt-0">
      <span className="font-raleway font-normal text-sm text-gray-color tablet:mt-8 laptop:mt-0">
        {t('applying')}
      </span>
      <h2 className="font-raleway font-semibold text-cyan-color mobile:text-lg laptop:text-2xl tablet:mb-8 laptop:mb-0">
        {t('job_title', { job_title })}
      </h2>
      <section className="mobile:w-full laptop:w-9/12 tablet:w-11/12 bg-white p-2">
        <div className="flex items-center justify-center py-3">
          <ErrorMessages
            errorState={candidateError}
            errorTerms={['registered']}
            textClass="text-red-500"
          />
        </div>
        <div className="flex flex-wrap -mx-3">
          <Text
            id="name"
            label={t('data.name.label')}
            name="name"
            placeholder={t('data.name.placeholder')}
            RegExp={RegExp.characters}
            setValue={setName}
            showAlert={isNameValid}
            type="text"
            value={name}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <Text
            id="email"
            label={t('data.email.label')}
            name="email"
            placeholder={t('data.email.placeholder')}
            RegExp={RegExp.general}
            setValue={setEmail}
            showAlert={isEmailValid}
            type="email"
            value={email}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <Date
            id="birth"
            label={t('data.birth.label')}
            name="birth"
            placeholder=" "
            setValue={setBirth}
            value={birth}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <Text
            id="phone"
            label={t('data.phone.label')}
            name="phone"
            placeholder={t('data.phone.placeholder')}
            RegExp={RegExp.numbers}
            setValue={setPhone}
            showAlert={isPhoneValid}
            type="text"
            value={phone}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <SingleSelect
            data={english}
            display="flex"
            id="idiom"
            for="idiom"
            label={t('data.idiom.label')}
            placeholder={t('data.idiom.placeholder')}
            setValue={setIdiom}
            showAlert={isIdiomValid}
            value={idiom}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <SingleSelect
            data={country}
            display="flex"
            id="country"
            for="country"
            label={t('data.nation.label')}
            placeholder={t('data.nation.placeholder')}
            setValue={setNation}
            showAlert={isNationValid}
            value={nation}
            width="laptop:w-1/3 tablet:w-1/3 mobile:w-1/2"
          />
          <Text
            id="linkedin"
            label={t('data.linkedin.label')}
            name="linkedin"
            placeholder={t('data.linkedin.placeholder')}
            RegExp={''}
            setValue={setLinkedin}
            type="text"
            value={linkedin}
            width="laptop:w-1/2 tablet:w-1/2 mobile:w-full"
          />
          <Text
            id="portfolio"
            label={t('data.portfolio.label')}
            name="portfolio"
            placeholder={t('data.portfolio.placeholder')}
            RegExp={''}
            setValue={setPortfolio}
            type="text"
            value={portfolio}
            width="laptop:w-1/2 tablet:w-1/2 mobile:w-full"
          />
          <File
            value={file}
            setValue={setFile}
            upload={upload}
            setUpload={setUpload}
            onChange={onChange}
            message={message}
            color="bg-red-color/100"
            size={isFileHigh}
          />
          <div className="mx-auto py-5">
            <ErrorMessages
              errorState={candidateError}
              errorTerms={['pdf', 'cv', 'resume']}
            />
          </div>
          <CheckboxApply
            id="terms"
            classes="place-items-center"
            htmlFor="agreetment"
            message={t('term_description.line_1')}
            subMessage={t('term_description.line_2')}
            value={terms}
            setValue={setTerms}
            width="w-auto"
          />
          <div className="mx-auto py-5">
            <ErrorMessages errorState={candidateError} errorTerms={['terms']} />
          </div>
        </div>
        <Submit
          name={t('submit_button.name')}
          width="w-full mobile:w-28 tablet:w-28"
          onSubmit={onSubmit}
        />
      </section>
      {loading && <Loading />}
    </section>
  );
};

export default FrmApply;
