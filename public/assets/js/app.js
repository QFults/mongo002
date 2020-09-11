
axios.get('/api/users/items', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user')}`
  }
})
  .then(({ data: user }) => {
    document.getElementById('username').textContent = `Welcome ${user.username}!`

    user.items.forEach(item => {
      let itemElem = document.createElement('li')
      itemElem.className = item.isDone ? 'list-group-item list-group-item-success' : 'list-group-item'
      itemElem.textContent = item.text
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => {
    console.error(err)
    window.location = '/auth.html'
  })

  document.getElementById('addItem').addEventListener('click', event => {
    event.preventDefault()

    axios.post('/api/items', {
      text: document.getElementById('item').value,
      isDone: false
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
      .then(({ data: item }) => {
        let itemElem = document.createElement('li')
        itemElem.className = item.isDone ? 'list-group-item list-group-item-success' : 'list-group-item'
        itemElem.textContent = item.text
        document.getElementById('items').append(itemElem)
        document.getElementById('item').value = ''
      })
      .catch(err => {
        console.error(err)
        Toastify({
          text: 'Woops! Something went wrong. Try again.',
          backgroundColor: 'red',
          duration: 3000
        }).showToast()
      })
  })

  document.getElementById('signOut').addEventListener('click', event => {
    localStorage.removeItem('user')
    window.location = '/auth.html'
  })
  