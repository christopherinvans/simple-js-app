let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Pikachu', type: ['Electric', 'Mouse'], height: 0.4},
    {name: 'Magikarp', type: ['Water', 'Dragon'], height: 0.9},
    {name: 'Scyther', type: ['Bug', 'Flying'], height: 1.5},
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon invalid');
        }
    };

    function getAll() {
        return pokemonList;
    };
}) ();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu'});
console.log(pokemonRepository.getAll());

pokemonRepository.forEach(function (pokemon) {
    document.write(`${pokemon.name} Height: ${pokemon.height} Type: ${pokemon.type} <br>`)
})