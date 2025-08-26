import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = "journal:";

export async function setItem(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}
export async function getItem<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
}
export async function removeItem(key: string) {
    await AsyncStorage.removeItem(key);
}

export async function getAllEntries() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const journalKeys = keys.filter(k => k.startsWith(PREFIX));
        const stores = await AsyncStorage.multiGet(journalKeys);

        return stores.map(([key, value]) => ({
            key,
            ...JSON.parse(value || "{}"),
        }));
    } catch (err) {
        console.error("Failed to load entries", err);
        return [];
    }
}