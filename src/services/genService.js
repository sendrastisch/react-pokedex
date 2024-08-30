import axios from 'axios';

const POKE_GENERATION_API_URL = 'https://pokeapi.co/api/v2/generation';

export const fetchAllPokemonGens = async () => {
    try {
        const response = await axios.get(POKE_GENERATION_API_URL);
        const gens = response.data.results;

        return gens.map(generation => ({
            id: generation.url.split('/').slice(-2, -1)[0],
            name: generation.name,
        }));
    } catch (error) {
        console.error('Error fetching Pokémon generations:', error);
        throw error;
    }
};
