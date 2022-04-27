import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './../../assets/scss/Alert.scss';

const Alert = () => {
  /*  */
  const { t } = useTranslation();
  const [isDisplay, setIsDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsDisplay(false);
    }, 3500);
  }, []);

  return (
    <>
      {isDisplay && (
        <div className="container-tooltip">
          <div className="tooltip" data-tooltip="tooltip-test">
            <p>{t('alert_message')}</p>
          </div>
          <div className="vector"></div>
        </div>
      )}
    </>
  );
};

export default Alert;
