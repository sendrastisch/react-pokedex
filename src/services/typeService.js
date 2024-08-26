import axios from 'axios';
const POKE_TYPE_API_URL = 'https://pokeapi.co/api/v2/type'; // Controleer of dit de juiste URL is
export const fetchAllPokemonTypes = async () => {
    try {
        const response = await axios.get(POKE_TYPE_API_URL);
        const types = response.data.results;

        // Verander de types array in een array van objecten
        const typesArray = types.map(type => ({
            id: type.url.split('/').slice(-2, -1)[0], // Verkrijg een unieke id uit de URL, als die beschikbaar is
            name: type.name,
        }));

        return typesArray;
    } catch (error) {
        console.error('Error fetching Pokémon types:', error);
        throw error;
    }
};
