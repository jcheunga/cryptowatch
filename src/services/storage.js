import { AsyncStorage } from 'react-native';

const FAVOURITES_STORAGE_KEY = 'FAVOURITES_STORAGE:key';

async function getItem() {
  try {
    const favourites = await AsyncStorage.getItem(FAVOURITES_STORAGE_KEY);
    return favourites
      ? JSON.parse(favourites)
      : [];
  } catch (e) {
    console.error('Error getting item', e);
    return [];
  }
}

async function setItem(item) {
  try {
    await AsyncStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(item));
  } catch (e) {
    console.error('Error setting item', e);
  }
}

async function deleteItem() {
  try {
    await AsyncStorage.removeItem(FAVOURITES_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing item', e);
  }
}

const localStorage = {
  getItem: getItem,
  setItem: setItem,
  deleteItem: deleteItem,
};

export default localStorage;

