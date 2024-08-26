import axios from 'axios';

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async () => {
    try {
        let allPokemon = [];
        let nextUrl = `${POKE_API_URL}?limit=100`; // Pas de limiet aan indien nodig

        while (nextUrl) {
            const response = await axios.get(nextUrl);
            const pokemonData = await Promise.all(
                response.data.results.map(async (p) => {
                    // Verkrijg Pokémon-details
                    const pokemonDetails = await axios.get(p.url);

                    // Verkrijg generatie-informatie
                    const speciesUrl = pokemonDetails.data.species.url;
                    const speciesResponse = await axios.get(speciesUrl);
                    const generationUrl = speciesResponse.data.generation.url;
                    const generationResponse = await axios.get(generationUrl);
                    const generationName = generationResponse.data.name;

                    if (pokemonDetails.data.is_default) {
                        return {
                            id: pokemonDetails.data.id,
                            name: p.name,
                            image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
                            type: pokemonDetails.data.types.map(type => type.type.name),
                            gen: generationName // Voeg generatie-naam toe
                        };
                    } else {
                        return null;
                    }
                })
            );

            // Voeg de data toe aan de verzameling en filter null waarden eruit
            allPokemon = [...allPokemon, ...pokemonData.filter(pokemon => pokemon !== null)];
            nextUrl = response.data.next; // Verkrijg de URL voor de volgende pagina
        }
        return allPokemon;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

export const filterPokemonByType = (pokemon, type) => {
    if (!type) return pokemon;
    return pokemon.filter(p => p.type.includes(type));
};

export const filterPokemonByGen = (pokemon, gen) => {
    if (!gen) return pokemon;
    return pokemon.filter(p => p.gen === gen);
};

//sort function for the dropdown menu at pokemonlist
export const sortPokemon = (pokemon, option) => {
    switch (option) {
        case 'name-ascending':
            return [...pokemon].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-descending':
            return [...pokemon].sort((a, b) => b.name.localeCompare(a.name));
        case 'no-ascending':
            return [...pokemon].sort((a, b) => a.id - b.id);
        case 'no-descending':
            return [...pokemon].sort((a, b) => b.id - a.id);
        case 'random':
            return [...pokemon].sort(() => Math.random() - 0.5);
        default:
            return pokemon;
    }
};

// Function to search through all Pokemon
export const searchPokemon = (allPokemon, searchTerm) => {
    return allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
};

