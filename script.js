var store
var np = 5// numero de posts por pagina

fetch('https://raw.githubusercontent.com/xavitinho/gamerfilobot/main/store.json')
  .then(response => response.json())
  .then(jsonResponse => {

  store = jsonResponse

  let nav = document.querySelector('nav')
  
  end = Object.keys(store.posts).length
  
  let page = 0


  for(let i=end-1; i>-1; i += -np) {
    page++
    createbutton(nav, page, i)
  }

  selectPage(end-1)

})


function createbutton(nav, page, end) {
    let button = document.createElement('button')
    button.innerHTML = page
    button.className = 'btn'
    button.onclick = () => { selectPage(end) }
    nav.appendChild(button)
}

function selectPage(end) {
  let column1 = this.document.querySelector('column1')
  let column2 = this.document.querySelector('column2')

  column1.innerHTML = ''
  column1.style.msFlex = "50%";
  column1.style.flex = "50%";

  column2.innerHTML = ''
  column2.style.msFlex = "50%";
  column2.style.flex = "50%";
  let col = 0
  for(let i = end; i > end-np && i > -1; i--){
    
    if(!store.posts[i].deleted){
      
      post = store.posts[i]

      let card = document.createElement('div')
      card.className = "card"

      if(col === 0){
        column1.appendChild(card)
        col ++
      } else {
        column2.appendChild(card)
        col = 0
      }
      
      let image = document.createElement('div')
      image.className = "card-image"
      card.appendChild(image)

      let img = document.createElement('a')
      img.href = post.finalimg
      img.innerHTML = `<img src="${post.finalimg}">`
      image.appendChild(img)
      
      let cardcontent = document.createElement('div')
      cardcontent.className = "card-content"
      card.appendChild(cardcontent)
      
      let header = document.createElement('div')
      header.className = "media"
      cardcontent.appendChild(header)

      let title = document.createElement('div')
      title.className = "media-content"
      header.appendChild(title)

      let p = document.createElement('p')
      p.className = "title is-4"
      p.innerHTML = `post#${i}`
      title.appendChild(p)

      p = document.createElement('p')
      p.className = "subtitle is-6"
      p.innerHTML = post.time.toString()
      title.appendChild(p)

      let content = document.createElement('div')
      content.className = "content"
      content.innerHTML = 
      `"${post.frasehtml}"
      <a href="${post.url}"><br><strong>~ ${post.author}</strong></a>
      <br><br>imagem provavelmente do jogo <strong>${post.game}</strong>
      <br> <a href="${post.gameurl}">fonte da imagem original</a>`
      cardcontent.appendChild(content)

      let footer = document.createElement('footer')
      footer.className = "card-footer"
      footer.innerHTML = 
      `<a href="${post.fb.url}" class="card-footer-item">Ver post no facebook</a>
      <a href="${post.tt.url}" class="card-footer-item">Ver post no twitter</a>`
      card.appendChild(footer)

    }
  }
}
