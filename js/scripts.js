let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('group-list-item')
        listItem.classList.add('col-sm-4', 'col-md-6', 'col-lg-12');
        let buttonItem = document.createElement('button');
        buttonItem.innerText = pokemon.name;
        buttonItem.setAttribute("data-toggle", "modal");
        buttonItem.setAttribute("data-target", "#modal-container");
        $(buttonItem).addClass('button-class btn-block btn m1');
        listItem.appendChild(buttonItem);
        pokemonList.appendChild(listItem);
        buttonItem.addEventListener('click', function(){showDetails(pokemon);}); 
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
        showModal(pokemon);
        console.log(pokemon);
        });
    }

    function loadList () {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e){
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = details.types.map((type) => type.type.name).join(', ');
        }).catch(function (e) {
          console.error(e);
        });
      }

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let titleElement = $('<h1>' + pokemon.name + '</h1>');
        

        let imageElement = $('<img class="img-element">');
        imageElement.attr("src", pokemon.imageUrl);

        let heightElement = $('<p>' + 'Height: ' + pokemon.height / 10 + ' m' + '</p>');
        let weightElement = $('<p>' + 'Weight: ' + pokemon.weight / 10 + ' kg' + '</p>');
        let typeElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
    }


    function hideModal() {
        modalContainer.classList.remove('is-visible');
        modalContainer.classList.add('hidden');
    }

    function showDialog(title, text) {
        showModal(title, text);
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.focus();

        return new Promise((resolve,reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () =>
        {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            dialogPromiseReject = reject;
        });


    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal,
        showDialog: showDialog,
    };
})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});
});