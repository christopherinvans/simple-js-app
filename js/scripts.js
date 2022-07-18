let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Pikachu', type: ['Electric'], height: 0.4},
    {name: 'Magikarp', type: ['Water'], height: 0.9},
    {name: 'Scyther', type: ['Bug'], height: 1.5},
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
}) ();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Charizard', type: ['Fire'], height: 1.7});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
    let pokemonDisplay = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerHTML = pokemon.name;
    button.classList.add('modal');
    listItem.appendChild(button);
    pokemonDisplay.appendChild(listItem);
});