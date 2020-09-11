let db
const request = indexedDB.open('todo', 1)

request.onupgradeneeded = event => {
  db = event.target.result
  db.createObjectStore('pending')
}

request.onsuccess = event => {
  db = event.target.result

  if (navigator.onLine) {
    checkDatabase()
  }
}

request.onerror = event => {
  console.log(event.target.errorCode)
}

const saveItem = item => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  store.add(item)
}

const checkDatabase = () => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  const getAll = store.getAll()

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch('/api/items/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getAll.result)
      })
        .then(() => {
          const transaction = db.transaction(['pending'], 'readwrite')
          const store = transaction.objectStore('pending')
          store.clear()
        })
    }
  }
}

window.addEventListener('online', checkDatabase)
