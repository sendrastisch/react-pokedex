import axios from 'axios';
const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';
export const fetchAllGenerations = async () => {
    try {

        const response = await axios.get("https://pokeapi.co/api/v2/generation/");
        const genCount = response.data.count;

        const generations = await Promise.all(
            Array.from({ length: genCount }, (_, i) =>
                axios.get(`https://pokeapi.co/api/v2/generation/${i + 1}/`)
            )
        );

        return generations.map((gen) => ({
            name: gen.data.name,
            pokemonList: gen.data.pokemon_species,
        }));
    } catch (error) {
        console.error("Error fetching generations:", error);
        throw error;
    }
};
export const fetchAllPokemon = async () => {
    try {
        let allPokemon = [];

        const generations = await fetchAllGenerations();

        for (const generation of generations) {
            const { pokemonList, name: generationName } = generation;

            const pokemonDetails = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    try {
                        const speciesResponse = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
                        );

                        const pokemonId = speciesResponse.data.id;

                        const detailsResponse = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                        );

                        const details = detailsResponse.data;

                        return {
                            id: details.id,
                            name: details.name,
                            image: details.sprites.other['official-artwork'].front_default,
                            type: details.types.map((type) => type.type.name),
                            gen: generationName,
                        };
                    } catch (error) {
                        console.warn(
                            `Fout bij het ophalen van Pokémon: ${pokemon.name}`,
                            error.message
                        );
                        return null;
                    }
                })
            );

            allPokemon.push(...pokemonDetails.filter(pokemon => pokemon !== null));
        }

        return allPokemon;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        throw error;
    }
};

export const fetchPokemonById = async (id) => {
    try {
        const response = await axios.get(`${POKE_API_URL}/${id}`);
        const data = response.data;

        //haal de species-informatie op (voor de beschrijving)
        const speciesResponse = await axios.get(data.species.url);
        const speciesData = speciesResponse.data;

        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';
        const cleanText = (text) => text.replace(/[\n\f\r]+/g, ' ').trim();

        const levelUpMoves = data.moves
            .map(move => {
                const levelDetails = move.version_group_details.find(version => version.move_learn_method.name === 'level-up');
                return levelDetails ? { name: move.move.name, level: levelDetails.level_learned_at, url: move.move.url } : null;
            })
            .filter(move => move !== null)
            .sort((a, b) => a.level - b.level);

        //move types via een APIcall per move (max 10 moves om de API te sparen)
        const movePromises = levelUpMoves.slice(0, 10).map(async (move) => {
            const moveResponse = await axios.get(move.url);
            return {
                name: move.name.replace('-', ' '),
                level: move.level,
                type: moveResponse.data.type.name
            };
        });

        const moves = await Promise.all(movePromises); // Wacht op alle API-calls

        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            image: data.sprites.other['official-artwork'].front_default,
            type: data.types.map(type => type.type.name),
            abilities: data.abilities.map(ability => ability.ability.name),
            description: cleanText(description),
            stats: {
                hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
                attack: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
                defense: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
                specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
                specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
                speed: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
            },
            moves
        };
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        throw error;
    }
};