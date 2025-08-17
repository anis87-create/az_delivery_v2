export const loadFromStorage = (key) => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export const saveToStorage = (key, arr) => {
    localStorage.setItem(key,JSON.stringify(arr || []));
}


