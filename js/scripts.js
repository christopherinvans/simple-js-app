let pokemonList = [
    {name: 'Pikachu', type: ['Electric', 'Mouse'], height: 0.4},
    {name: 'Magikarp', type: ['Water', 'Dragon'], height: 0.9},
    {name: 'Scyther', type: ['Bug', 'Flying'], height: 1.5},
];

pokemonList.forEach(function(pokemon){
    console.log(' Name: ' + pokemon.name + ' Type: ' + pokemonList.type + ' Height: ' + pokemon.height);
} );