const STORAGE_TOKEN ='M40DD3CGNI1ZVBRH8BGAF3NZ470BPUXUYP7K394X';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

    return fetch(url).then(res => res.json()) .then(res => res.data.value);
}



async function deleteAllData() {
  const payload = { token: STORAGE_TOKEN };
  try {
    const response = await fetch(STORAGE_URL, {
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

async function getAllData() {
    const url = `${STORAGE_URL}?token=${STORAGE_TOKEN}`;
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Alle Daten:', data);
      } else {
        console.error('Fehler beim Abrufen der Daten:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  }