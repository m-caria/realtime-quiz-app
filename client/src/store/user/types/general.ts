import { UserResponse } from '../../../types';
import { DomainState } from '../../types';

export type ApplicationUserState = DomainState<Partial<UserResponse>>;
