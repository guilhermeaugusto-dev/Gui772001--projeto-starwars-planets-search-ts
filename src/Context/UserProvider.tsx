import { ReactNode, useState } from 'react';
import UserContext from './UserContext';
import useFetch from '../components/Hooks';
import { BuscaType, FiltroType, Planet } from '../interface/interfaces';

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [rende, setrender] = useState<FiltroType[]>([]);
  const [busca, setbusca] = useState<BuscaType>({
    busca: '',
    coluna: 'population',
    valor: 'maior que',
    numerico: '0',
  });

  const { Api } = useFetch(); // Api deve ser Planet[]

  const filtrar = Api.filter((planet: Planet) => {
    return rende.every((re) => {
      if (re.valor === 'maior que') {
        return +planet[re.coluna] > +re.numerico;
      }
      if (re.valor === 'menor que') {
        return +planet[re.coluna] < +re.numerico;
      }
      if (re.valor === 'igual a') {
        return +planet[re.coluna] === +re.numerico;
      }
      return true;
    });
  });

  return (
    <UserContext.Provider value={ { Api, filtrar, rende, setrender, busca, setbusca } }>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
