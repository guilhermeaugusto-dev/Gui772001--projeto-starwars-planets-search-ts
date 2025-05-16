import { createContext } from 'react';
import { UserContextType } from '../interface/interfaces';

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
