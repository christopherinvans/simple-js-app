let pokemonList = [
    {name: 'Pikachu', type: ['Electric', 'Mouse'], height: 0.4},
    {name: 'Magikarp', type: ['Water', 'Dragon'], height: 0.9},
    {name: 'Scyther', type: ['Bug', 'Flying'], height: 1.5},
];

for (let i=0; i<pokemonList.length; i++){
    document.write("Name: "+ pokemonList[i].name +"<br>"+"Height: "+ pokemonList[i].height +"<br>"+"Type: "+ pokemonList[i].type +"<br>")
   if (pokemonList[i].height<1){
       document.write("I\'m just a wee little fella!"+"<br>")
   }
   else if (pokemonList[i].height>=1 && pokemonList[i].height<=3){
       document.write("Big enough to do some damage!"+"<br>")
   }
   else if (pokemonList[i].height>3){
       document.write("My sneezes sound like cannonfire!"+"<br>")
   }

   }