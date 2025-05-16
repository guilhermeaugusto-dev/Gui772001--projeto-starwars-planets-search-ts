export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
}
export type ColunaType = 'population' | 'orbital_period' |
'diameter' | 'rotation_period' | 'surface_water';

export interface BuscaType {
  busca: string;
  coluna:ColunaType
  valor: 'maior que' | 'menor que' | 'igual a';
  numerico: string;
}

export interface FiltroType {
  coluna: BuscaType['coluna'];
  valor: BuscaType['valor'];
  numerico: string;
}

export interface UserContextType {
  Api: Planet[];
  filtrar: Planet[];
  rende: FiltroType[];
  setrender: React.Dispatch<React.SetStateAction<FiltroType[]>>;
  busca: BuscaType;
  setbusca: React.Dispatch<React.SetStateAction<BuscaType>>;
}
