import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

const dbName = 'jate'; // Define the name of the database and object store.

// Function to add content to the database.
export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction(dbName, 'readwrite');
  const store = transaction.objectStore(dbName);

  try {
    const id = await store.add({ content }); // Add content to the object store.
    console.log(`Added content with ID: ${id}`);
  } catch (error) {
    console.error('Error adding content:', error);
  } finally {
    transaction.done;
  }
};

// Function to get all content from the database.
export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction(dbName, 'readonly');
  const store = transaction.objectStore(dbName);

  try {
    const allContent = await store.getAll();
    console.log('Retrieved content:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error retrieving content:', error);
    return [];
  } finally {
    transaction.done;
  }
};

initdb();
