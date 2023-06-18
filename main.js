function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaBox(pokemon) {
    const pokeListElement = document.getElementById("pokemon-list");

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
}

function main() {
    let data = get("https://pokeapi.co/api/v2/pokemon?limit=5");
    let parsedData = JSON.parse(data);
    let pokemons = parsedData.results;
  
    pokemons.map((pokemon) => {
      // Busca os detalhes individuais do Pokémon
      let pokemonData = get(pokemon.url);
      let parsedPokemonData = JSON.parse(pokemonData);
      
      // Cria um objeto com os dados do Pokémon necessários
      let pokemonObj = {
        nome: pokemon.name,
        versao: parsedPokemonData.version,
        altura: parsedPokemonData.height,
        peso: parsedPokemonData.weight,
        urlImagem: parsedPokemonData.sprites.front_default
      };
      
      criaBox(pokemonObj);
    });
  }

main()