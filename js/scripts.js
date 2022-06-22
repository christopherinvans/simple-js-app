let pokemonList = [
    {name: 'Pikachu', type: ['Electric', 'Mouse'], height: 0.4},
    {name: 'Magikarp', type: ['Water', 'Dragon'], height: 0.9},
    {name: 'Scyther', type: ['Bug', 'Flying'], height: 1.5},
];

pokemonList.forEach(function (pokemon) {
    document.write(`${pokemon.name} Height: ${pokemon.height} Type: ${pokemon.type} <br>`)
})