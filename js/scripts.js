let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let dialogPromiseReject;

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
        let buttonItem = document.createElement('button');
        buttonItem.innerText = pokemon.name;
        buttonItem.setAttribute("data-toggle", "modal");
        buttonItem.setAttribute("data-target", "#modal-container");
        $(buttonItem).addClass('button-class btn-block btn m1');
        buttonItem.classList.add('button-class');
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
                    name: item.name,
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
          item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
        }).catch(function (e) {
          console.error(e);
        });
      }

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        let titleElement = $('<h3>' + pokemon.name + '</h3>');

        let imageElement = $('<img class="img-element">')
        imageElement.attr("src", pokemon.imageUrl);

        let heightElement = $('<p>' + 'Height: ' + pokemon.height / 10 + 'm' + '</p>');
        let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
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



    (function (){
        let form = document.querySelector('#register-form');
        let emailInput = document.querySelector('#email');
        let passwordInput = document.querySelector('#password');

        function showErrorMessage(input, message) {
            let container = input.parentElement;
            let error = container.querySelector('.error-message');
            if (error) {
                container.removeChild(error);
            }
            if (message) {
                let error = document.createElement('div');
                error.classList.add('.error-message');
                error.innerText = message;
                container.appendChild(error);
            }
        }

        function validateEmail() {
            let value = emailInput.value;
            if (!value) {
                showErrorMessage(emailInput, 'Email is a required field.');
                return false;
            }
            if (value.indexOf('@') === -1) {
                showErrorMessage(emailInput, 'You must enter a valid email address.');
                return false;
            }
            if (value.indexOf('.') === -1) {
                    showErrorMessage(emailInput, 'You must enter a valid e-mail address.');
                    return false;
            }    
            
            showErrorMessage(emailInput, null);
            return true;
        }

        function validatePassword() {
            let value = passwordInput.value;
            if (!value) {
                showErrorMessage(passwordInput, 'Password is a required field.');
                return false;
            }
            if (value.length < 8) {
                showErrorMessage(passwordInput, 'Password must be at least 8 characters.');
                return false;
            }
            showErrorMessage(passwordInput, null);
            return true;
        }

        function validateForm() {
            let isValidEmail = validateEmail();
            let isValidPassword = validatePassword();
            return isValidEmail && isValidPassword;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                alert('Success!');
            }
        });

        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);

        return {
            validateEmail: validateEmail,
            validatePassword: validatePassword,
            validateForm: validateForm,
            showErrorMessage: showErrorMessage
        };
    })();

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