import { writeFile, readFile } from "fs/promises";
import { request } from "http";

// const pokemons = [{"name":"bulbasaur","dex":1,"version":"firered","height":7,"weight":69,"imgUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},{"name":"ivysaur","dex":2,"version":"firered","height":10,"weight":130,"imgUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"},{"name":"venusaur","dex":3,"version":"firered","height":20,"weight":1000,"imgUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"},{"name":"charmander","dex":4,"version":"firered","height":6,"weight":85,"imgUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},{"name":"charmeleon","dex":5,"version":"firered","height":11,"weight":190,"imgUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"}]

async function getPokemon() {
    // const data = await readFile('pokedex.json', 'utf-8') 
    // const pokemons = JSON.stringify(data)

    let data = "https://pokeapi.co/api/v2/pokemon?limit=5"
    let pokemons = JSON.parse(data)
    let request = new XMLHttpRequest()
    request.open("GET", pokemons, false)
    return request.responseText
}

if(typeof document !== 'undefined') {
    const pokeListElement = document.getElementById("pokemon-list");
         pokemons.map((pokemon) => {

         const box = document.createElement("div");
         const listName = document.createElement("h1");
         const img = document.createElement("img")   
         const version = document.createElement("h4");
         const height = document.createElement("h4");
         const weight = document.createElement("h4");

         box.classList.add("pokemon-container");   

         listName.textContent = pokemon.name;
         version.textContent = "version: " + pokemon.version;
         height.textContent = "height: " +pokemon.height;
         weight.textContent = "weight: " +pokemon.weight;
         img.src = pokemon.imgUrl;

         box.appendChild(img);
         box.appendChild(listName);
         box.appendChild(version);
         box.appendChild(height);
         box.appendChild(weight);
         pokeListElement.appendChild(box);
     })
 }

 getPokemon();
