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
    document.write(<p>`Name: ${pokemon.name}Type: ${pokemon.type}Height (m): ${pokemon.height}`</p>)
});