export async function getCategories() {
  const urlCategories = 'https://swapi.py4e.com/api/planets';
  const response = await fetch(urlCategories);
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }
  const data = await response.json();
  return data;
}
