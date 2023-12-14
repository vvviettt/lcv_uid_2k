import {OderFormProps} from '../../../components/forms/OderForm/OderForm.type';
import {API_PROCESS} from '../../enum';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

export interface UserState {
  user?: IUser;
  loginStatus: API_PROCESS;
  registerStatus: API_PROCESS;
  orderInfo?: OderFormProps;
}
