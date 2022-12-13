import path from 'path';
import { ID } from './types';

export const buildFileName = (fileName: string, folder: string, id: ID) => {
  const fileExtension = path.extname(fileName);
  return path.join(folder, `${id}`, `${Math.random()}${fileExtension}`);
};

export function calculate_age(dob: any) { 
  // console.log(dob.toString())
  // var diff_ms = Date.now() - dob.toString().getTime();
  // var age_dt = new Date(diff_ms); 

  return 3;
}