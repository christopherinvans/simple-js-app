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

    function addListItem(pokemon){
        let pokemonDisplay = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonDisplay.appendChild(listItem);
        button.addEventListener('click', function (event) {
            let target = event.target;
            console.log(pokemon);
        })
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
}) ();

const modalContainer = document.querySelector('.modal');

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Charizard', type: ['Fire'], height: 1.7});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});