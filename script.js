fetch('https://raw.githubusercontent.com/xavitinho/xavitinho.github.io/main/teste.json')
  .then(response => response.json())
  .then(jsonResponse => {

    var store = jsonResponse
    let main = document.querySelector('main')

    Object.entries(store.posts).forEach(([index, post]) => {

      let h2 = document.createElement('h2')
      main.appendChild(h2)
      h2.innerHTML = 'FRASE ' + index

      let p = document.createElement('p')
      main.appendChild(p)
      p.innerHTML = post.html + '<hr>'


    })

  }) 