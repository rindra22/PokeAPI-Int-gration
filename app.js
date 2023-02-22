let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');
// console.log(listePoke)

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function fetchPockemonBase(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(response => response.json())
    .then(data => {
       // console.log(data);
        /* data.results.forEach(pokemon => {
            fetchPokemonData(pokemon);
        }); */

        data.results.forEach(pokemon => {
            fetchPokemonData(pokemon);
        });
    });
}

fetchPockemonBase();

function fetchPokemonData(pokemon){
    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        objPokemonFull.pic = data.sprites.front_default;
        objPokemonFull.type = data.types[0].type.name;
        objPokemonFull.id = data.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then(response => response.json())
        .then(data => {
            objPokemonFull.name = data.names[4].name;
            allPokemon.push(objPokemonFull);
            if(allPokemon.length === 151){
                tableauFin = allPokemon.sort((a, b) => a.id - b.id).slice(0, 21);
                /* console.log(tableauFin); */
                createCard(tableauFin);
                chargement.style.display = "none";
            }
        });
    });
}

function createCard(arr){

    for(let i = 0; i < arr.length; i++) {

        const carte = document.createElement('li');
        let couleur = types[arr[i].type];
        carte.style.background = couleur;
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);

    }

}

// Scroll Infini

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    // scrollTop = scroll depuis le haut
    // scrollHeight = hauteur totale de la page
    // clientHeight = hauteur de la fenêtre, partie visible

    if(clientHeight + scrollTop >= scrollHeight - 20){
        addPokemon(6);
    }
})
let index = 21;
function addPokemon(nb){
    if(index > 151){
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Recherche

searchInput.addEventListener('keyup', recherche);

function recherche(){

    if(index < 151){
        addPokemon(130);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('.liste-poke li');
    allTitles = document.querySelectorAll('li > h5');

    for(i = 0; i < allLi.length; i++){

        titleValue = allTitles[i].innerText;
        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}