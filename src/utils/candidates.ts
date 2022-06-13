import { ICandidate } from '../redux/candidates/types/data';

const headers = [
  {
    key: 'interested',
    text: 'Interested in',
  },
  {
    key: 'applying',
    text: 'Applying for',
  },
  {
    key: 'meeting',
    text: 'Meeting for',
  },
  {
    key: 'chosen',
    text: 'Chosen for',
  },
];

const cardColor = [
  {
    name: 'new entry',
    color: 'card card-new',
  },
  {
    name: 'dismissed',
    color: 'card card-dismissed',
  },
  {
    name: 'doubting',
    color: 'card card-doubting',
  },
  {
    name: 'approved',
    color: 'card card-approved',
  },
];

export function getDetailHeaderText(main_status: string) {
  return headers.find((header) => header.key === main_status)?.text;
}

export function getTopBorderColor(secondary_status: string) {
  return cardColor.find((item) => item.name === secondary_status)?.color;
}

export const sortByColumn = (candidates: ICandidate[]) => {
  const interested = candidates
    .filter((candidate) => candidate.main_status === 'interested')
    .sort((a, b) => {
      if (a.createdAt! > b?.createdAt!) {
        return -1;
      }

      if (a.createdAt! < b.createdAt!) {
        return 1;
      }
      return 0;
    });

  const applying = candidates
    .filter((candidate) => candidate.main_status === 'applying')
    .sort((a, b) => {
      if (a.updatedAt! > b.updatedAt!) {
        return -1;
      }

      if (a.updatedAt! < b.updatedAt!) {
        return 1;
      }
      return 0;
    });

  const meeting = candidates
    .filter((candidate) => candidate.main_status === 'meeting')
    .sort((a, b) => {
      if (a.updatedAt! > b.updatedAt!) {
        return -1;
      }

      if (a.updatedAt! < b.updatedAt!) {
        return 1;
      }
      return 0;
    });
  const chosen = candidates
    .filter((candidate) => candidate.main_status === 'chosen')
    .sort((a, b) => {
      if (a.updatedAt! > b.updatedAt!) {
        return -1;
      }

      if (a.updatedAt! < b.updatedAt!) {
        return 1;
      }
      return 0;
    });

  return {
    interested,
    applying,
    meeting,
    chosen,
  };
};
