const LOCAL_STORAGE_KEY = 'favoritePokemon';

export const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return favorites || [];
};

export const addFavorite = (pokemon) => {
    const favorites = getFavorites();
    favorites.push(pokemon);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
};

export const removeFavorite = (id) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
};
