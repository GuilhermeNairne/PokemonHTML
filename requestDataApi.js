import { readFile, writeFile } from "fs/promises";

export class RequestDataApi {
  async getAllPokeUrl() {
    const pokeUrl = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
    const ResponseToJson = await pokeUrl.json();
    const resultsString = JSON.stringify(ResponseToJson.results);

    await writeFile("allPokemonUrl.json", resultsString, "utf-8");
    return "File created";
  }

  async fetchAllPokemonData() {
    const allPokemonUrl = await readFile("allPokemonUrl.json", "utf-8");
    const allPokemonUrlObj = JSON.parse(allPokemonUrl);

    const pokeList = allPokemonUrlObj.map(async (pokeList) => {
      let url = pokeList.url;

      const response = await fetch(url);
      const result = await response.json();

      const pokeStats = result.stats.map((pokeStat) => {
        return {
          statName: pokeStat.stat.name,
          value: pokeStat.base_stat,
        };
      });

      const pokeMoves = result.moves.map((pokeMoves) => {
        return {
          move: pokeMoves.move.name,
        };
      });

      const PokeData = {
        name: result.forms[0].name,
        dex: result.game_indices[9].game_index,
        version: result.game_indices[9].version.name,
        height: result.height,
        weight: result.weight,
        imgUrl: result.sprites.front_default,
      };

      return PokeData;
    });

    const pokeArr = await Promise.all(pokeList);
    pokeArr.sort((a, b) => {
      return a.dex - b.dex;
    });

    await writeFile("pokedex.json", JSON.stringify(pokeArr), "utf-8");
    return "File Created";
  }
}

const requestDataApi = new RequestDataApi();
requestDataApi.getAllPokeUrl()
  .then((result) => {
    console.log(result); // Exibe "File created" quando o arquivo é criado com sucesso
    const requestData = new RequestDataApi();
    return requestData.fetchAllPokemonData();
  })
  .then((result) => {
    console.log(result); // Exibe "File Created" quando o arquivo é criado com sucesso
  })
  .catch((error) => {
    console.error(error); // Exibe qualquer erro ocorrido durante o processo
  });
