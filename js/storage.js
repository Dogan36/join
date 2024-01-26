let STORAGE_TOKEN ='M40DD3CGNI1ZVBRH8BGAF3NZ470BPUXUYP7K394X';
let STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * This function saves an item on storage
 * 
 * @param {string} key This is the key of the item
 * @param {string} value This is the value of the item
 * @returns string
 */
async function setItem(key, value) {
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * This function gets an item from storage
 * 
 * @param {string} key This is the key of the item
 * @returns string
 */
async function getItem(key) {
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()) .then(res => res.data.value);
}

/**
 * This function deletes all data on storage
 */
async function deleteAllData() {
  let payload = { token: STORAGE_TOKEN };
  try {
    let response = await fetch(STORAGE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Alle Daten wurden erfolgreich gelöscht.');
    } else {
      console.error('Fehler beim Löschen der Daten:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fehler beim Löschen der Daten:', error);
  }
}

/**
 * This function gets all data from storage
 */
async function getAllData() {
    let url = `${STORAGE_URL}?token=${STORAGE_TOKEN}`;
      let response = await fetch(url);
      let data = await response.json();
  }