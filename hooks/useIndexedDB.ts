import { useEffect, useState } from 'react';

const dbName = 'textEffectPlayground';
const storeName = 'userProgress';
const dbVersion = 2; // New version

// Define a type for your data
interface ProgressData {
  id: string;
  text?: string;
  selectedEffect?: string;
  params?: Record<string, any>;
  [key: string]: any;
}

export function useIndexedDB() {
  const [data, setValue] = useState<ProgressData | null>(null);

  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = event.target.result;
      if (event.oldVersion < 1) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      } else if (event.oldVersion < 2) {
        if (db.objectStoreNames.contains(storeName)) {
          db.deleteObjectStore(storeName);
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      }
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        console.error(`Object store "${storeName}" does not exist`);
        return;
      }
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get('progress');

      getRequest.onsuccess = (event: Event) => {
        const savedData = (event.target as IDBRequest<ProgressData>).result;
        if (savedData) {
          console.log('Data retrieved from IndexedDB:', savedData);
          setValue(savedData);
        }
      };

      getRequest.onerror = (event: Event) => {
        console.error('Error retrieving data:', (event.target as IDBRequest).error);
      };
    };

    request.onerror = (event: Event) => {
      console.error('Error opening database:', (event.target as IDBOpenDBRequest).error);
    };
  }, []);

  const saveData = (newData: Omit<ProgressData, 'id'>) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        console.error(`Object store "${storeName}" does not exist`);
        return;
      }
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const dataToSave: ProgressData = { id: 'progress', ...newData };
      console.log('Data to save:', dataToSave); // Log data to be saved
      const putRequest = store.put(dataToSave);

      putRequest.onsuccess = () => {
        console.log('Data saved successfully');
      };

      putRequest.onerror = (event: Event) => {
        console.error('Error saving data:', (event.target as IDBRequest).error);
      };
    };

    request.onerror = (event: Event) => {
      console.error('Error opening database:', (event.target as IDBOpenDBRequest).error);
    };
  };

  return { data, saveData };
}
