let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        loadDetails(pokemon).then(function(){
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
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        })
    }

    function showModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
    });

    

    (function(){
        let form = document.querySelector('#register-form');
        let emailInput = document.querySelector('#email');
        let passwordInput = document.querySelector('#password');
    

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

        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);

        form.addEventListener('submit', (e) => {e.preventDefault();
            if (validateForm()) {
                alert('Success!');
            }
        })

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

        return {
            validateEmail: validateEmail,
            validatePassword: validatePassword,
            validateForm: validateForm,
            showErrorMessage: showErrorMessage
        }
    })();
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
}) ();

const modalContainer = document.querySelector('.modal');

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});
});