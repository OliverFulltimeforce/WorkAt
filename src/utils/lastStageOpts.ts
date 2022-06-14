import { VIEW_404 } from '../config/routes/paths';
import { cleanStorage } from './localStorage';

export const lastStageOpts = {
  interview(cleanStorageData: string, _finished?: string) {
    if (!cleanStorageData) {
      window.location.assign(VIEW_404);
    } else {
      cleanStorage();
    }
  },

  application(finished: string) {
    if (finished !== 'true') {
      window.location.assign(VIEW_404);
    } else {
      return;
    }
  },
};
