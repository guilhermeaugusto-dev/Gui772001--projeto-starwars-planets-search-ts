import { useContext, useState } from 'react';
import UserContext from '../Context/UserContext';
import { ColunaType, FiltroType } from '../interface/interfaces';

function Form() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Não foi possivel achar o Context');
  }
  const { setrender, rende, setbusca, busca } = context;
  const [form, setform] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const BORDER_STYLE = '1px solid #ccc';

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.target;
    setbusca({
      ...busca,
      [name]: value,
    });
  };

  function submit() {
    setrender([...rende, busca]);
    const filteredForm = form.filter((formItem) => busca.coluna !== formItem);
    setform(filteredForm);
    setbusca({
      busca: '',
      coluna: (filteredForm[0] ?? '') as ColunaType,
      valor: 'maior que',
      numerico: '0',
    });
  }

  const removerIte = (index: number) => {
    const novaLista = [...rende];
    novaLista.splice(index, 1);
    setrender(novaLista);
    setform((oldForm) => [...oldForm, rende[index].coluna]);
  };

  const Removeallfiltros = () => {
    setrender([]);
    setform([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    setbusca({
      busca: '',
      coluna: 'population',
      valor: 'maior que',
      numerico: '0',
    });
  };

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: 'yellow',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <>
      <form
        style={ {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        } }
      >
        <input
          type="text"
          name="busca"
          placeholder="Busca"
          value={ busca.busca }
          onChange={ handleChange }
          style={ { borderRadius: '8px',
            border: '1px solid #ccc',
            padding: '6px 10px' } }
        />
        <select
          data-testid="column-filter"
          name="coluna"
          onChange={ handleChange }
          value={ busca.coluna }
          style={ { borderRadius: '8px',
            border: '1px solid #ccc',
            padding: '6px 10px' } }
        >
          {form.map((opcoes) => (
            <option key={ opcoes } value={ opcoes }>
              {opcoes}
            </option>
          ))}
        </select>
        <select
          name="valor"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ busca.valor }
          style={ { borderRadius: '8px',
            border: '1px solid #ccc',
            padding: '6px 10px' } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="numerico"
          data-testid="value-filter"
          onChange={ handleChange }
          value={ busca.numerico }
          style={ {
            borderRadius: '8px',
            border: '1px solid #ccc',
            padding: '6px 10px',
          } }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ submit }
          className="yellow-button"
        >
          Filtrar
        </button>
      </form>
      <div
        style={ {
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          marginBottom: 20,
        } }
      >
        {rende.length !== 0 && rende.map((arr, index) => (
          <div
            key={ index }
            data-testid="filter"
            style={ {
              backgroundColor: '#222',
              padding: '8px 12px',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: 'white',
              fontWeight: 'bold',
            } }
          >
            <span>{arr.coluna}</span>
            <span>{arr.valor}</span>
            <span>{arr.numerico}</span>
            <button
              onClick={ () => removerIte(index) }
              style={ {
                backgroundColor: 'transparent',
                border: '2px solid #FFD700',
                color: '#FFD700',
                borderRadius: 5,
                padding: '4px 10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, color 0.3s',
              } }
              onMouseEnter={ (e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.color = '#222';
              } }
              onMouseLeave={ (e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFD700';
              } }
            >
              Excluir
            </button>
          </div>
        ))}

      </div>
      <button
        data-testid="button-remove-filters"
        onClick={ Removeallfiltros }
        className="yellow-button"
      >
        Remover todas filtragens
      </button>
    </>
  );
}

export default Form;
