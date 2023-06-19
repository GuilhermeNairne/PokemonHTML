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
  
    pokemons.map(async(pokemon) => {
      let url = pokemon.url;

      const response = await fetch(url);
      const result = await response.json();
      
      // Cria um objeto com os dados do Pokémon necessários
      const PokeData = {
        name: result.forms[0].name,
        dex: result.game_indices[9].game_index,
        version: result.game_indices[9].version.name,
        height: result.height,
        weight: result.weight,
        imgUrl: result.sprites.front_default,
      };
      
      criaBox(PokeData);
    });
  }

main()