import { useContext } from 'react';
import Form from './Form';
import UserContext from '../Context/UserContext';
import { Planet } from '../interface/interfaces';

function Table() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { filtrar, busca } = context;
  const searchTerm = busca.busca || '';

  const filteredPlanets = filtrar.filter((planeta: Planet) => {
    if (searchTerm.length === 0) return true;
    return planeta.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="title-container">
        <h2>Projeto Star Wars</h2>
      </div>

      <div className="filters-container">
        <Form />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>rotation_period</th>
              <th>orbital_period</th>
              <th>diameter</th>
              <th>climate</th>
              <th>gravity</th>
              <th>terrain</th>
              <th>surface_water</th>
              <th>population</th>
              <th>films</th>
              <th>created</th>
              <th>edited</th>
              <th>url</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.map((planeta: Planet, index: number) => (
              <tr key={ index }>
                <td>{planeta.name}</td>
                <td>{planeta.rotation_period}</td>
                <td>{planeta.orbital_period}</td>
                <td>{planeta.diameter}</td>
                <td>{planeta.climate}</td>
                <td>{planeta.gravity}</td>
                <td>{planeta.terrain}</td>
                <td>{planeta.surface_water}</td>
                <td>{planeta.population}</td>
                <td>{planeta.films ? planeta.films.length : 0}</td>
                <td>{new Date(planeta.created).toLocaleDateString()}</td>
                <td>{new Date(planeta.edited).toLocaleDateString()}</td>
                <td>
                  <a href={ planeta.url } target="_blank" rel="noreferrer">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
