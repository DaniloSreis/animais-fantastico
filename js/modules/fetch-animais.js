import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  // Cria uma div contendo informações
  // com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Prenche cada animal no Dom
  const numerosGrid = document.querySelector(target);

  function prencherAnimal(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // Anima os números da cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Puxa os animais atraves de um arquivo json
  // e cria animais utilizando createAnimal
  async function criarAnimais() {
    try {
      // Fetch, espera a resposta e transfoma em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      // Apos a transfomação de json, ativa as funções
      // para prencher e animar os números
      animaisJSON.forEach((animal) => prencherAnimal(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
