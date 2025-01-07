let allPokemons = []; // Array to store all loaded Pokémon

const loadPokemon = async () => {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Limpa o contêiner

    for (let i = 1; i <= 1025; i++) { // Carregar os 1025 Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await response.json();

        allPokemons.push(pokemon); // Store each Pokémon in the array

        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');

        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        const typeImages = types.map(type => `<img src="Types/${type.charAt(0).toUpperCase() + type.slice(1)}.png" alt="${type} type" class="type-image">`).join('');

        pokemonElement.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${pokemon.id})</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="types">${typeImages}</div>
        `;

        pokemonContainer.appendChild(pokemonElement);
    }
};

const searchPokemon = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Clear the container

    const matchedPokemons = allPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().startsWith(searchInput)
    );

    if (matchedPokemons.length > 0) {
        matchedPokemons.forEach(matchedPokemon => {
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');

            const types = matchedPokemon.types.map(typeInfo => typeInfo.type.name);
            const typeImages = types.map(type => `<img src="Types/${type.charAt(0).toUpperCase() + type.slice(1)}.png" alt="${type} type" class="type-image">`).join('');

            pokemonElement.innerHTML = `
                <h2>${matchedPokemon.name.charAt(0).toUpperCase() + matchedPokemon.name.slice(1)} (#${matchedPokemon.id})</h2>
                <img src="${matchedPokemon.sprites.front_default}" alt="${matchedPokemon.name}">
                <div class="types">${typeImages}</div>
            `;

            pokemonContainer.appendChild(pokemonElement);
        });
    } else {
        pokemonContainer.innerHTML = '<p>Nenhum Pokémon encontrado.</p>'; // Display message if no Pokémon found
    }
};

document.getElementById('search-input').addEventListener('input', searchPokemon);

loadPokemon(); // Call the function directly to load Pokémon on page load
