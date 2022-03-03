export const LocalStorageKeys={
    game: 'game'
}

export function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function updateLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}