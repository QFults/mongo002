
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('todo-cache-v1').then(cache => {
      console.log('Opened cache')
      return cache.addAll([
        '/',
        '/auth.html',
        '/index.html',
        '/manifest.json',
        '/assets/js/auth.js',
        '/assets/js/app.js',
        '/assets/css/auth.css',
        '/assets/css/style.css',
        '/assets/icons/tasks.png',
        '/assets/icons/plus.png'
      ])
    })
  )
})

