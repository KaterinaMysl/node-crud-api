import { parse as parseUUID } from 'uuid';

export const checkUUID = (uuid: string): boolean => {
  try {
    parseUUID(uuid);
    return true;
  } catch {
    return false;
  }
};
