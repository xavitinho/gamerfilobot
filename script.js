
var store
var np = 8// numero de posts por pagina

var URL = 'https://testehtml.xaax.repl.co/'

fetch('https://raw.githubusercontent.com/xavitinho/gamerfilobot/main/store.json')
  .then(response => response.json())
  .then(jsonResponse => {

  store = jsonResponse

  selectPage(1)

  const urlSearchParams = new URLSearchParams(window.location.search);
  if(urlSearchParams){ 
    const params = Object.fromEntries(urlSearchParams.entries())
    require(params)
  }

})

function require(params) {
  let lastpost = Object.keys(store.posts).length
  if(params.post && store.posts[params.post]){
    createmodal(params.post)
    let page = Math.ceil(((lastpost-params.post)/np))
    selectPage(page)
  }
  if(params.page && params.page < lastpost/np+1 && params.page>0){
    selectPage(parseInt(params.page))
  }
}

  /*if(str.includes('post=')){

    let npost = str.slice(str.indexOf('post=')+5, str.indexOf('&')+1)
    console.log(npost)
    if(store.posts[npost]) {
      createmodal(npost)
      let last = Object.keys(store.posts).length
      
      let page = Math.ceil(((last-npost)/np))
     
      selectPage(page)
    }
  }
  */

function createbuttons(page, totalpages) {

  let nav = document.querySelector('nav')

  if (page===1){
    nav.innerHTML = 
    `<a class="pagination-previous" 
    disabled>
      <<
    </a>`
  } else {
    nav.innerHTML = 
    `<a class="pagination-previous" 
    onclick=selectPage(${page-1})>
      <<
    </a>`
  }
  if (page === totalpages) {
    nav.innerHTML +=     
    `<a class="pagination-next" 
    disabled>
      >>
    </a>`
  } else {
    nav.innerHTML += 
    `<a class="pagination-next" 
    onclick=selectPage(${page+1})>
      >>
    </a>`
  }

  let paglist = document.createElement('ul')
  paglist.className = 'pagination-list'
  nav.appendChild(paglist)

  if(page > 3){
   paglist.innerHTML +=
    `<li onclick = selectPage(1)><a class="pagination-link">1</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>`
  }

  let first
  let last

  if (page < 3){
    first = 1
    last = 5
  } else if (page > totalpages - 2) {
    first = totalpages - 4
    last = totalpages
  } else {
    first = page - 2
    last = page + 2
  }

  for (let i=first; i<=last; i++){

    let li = document.createElement('li')
    if(i===page){
      li.innerHTML = `<a class="pagination-link is-current" onclick=selectPage(${i})>${i}</a>`
    } else {
      li.innerHTML = `<a class="pagination-link" onclick=selectPage(${i})>${i}</a>`
    }
    paglist.appendChild(li)

  }
  
  if(page < totalpages-2){
   paglist.innerHTML +=
    `<li><span class="pagination-ellipsis">&hellip;</span></li>
    <li onclick=selectPage(${totalpages})>
      <a class="pagination-link">
        ${totalpages}
      </a>
    </li>`
  }
}

function selectPage(page) {

  let total = Object.keys(store.posts).length

  let totalpages = Math.ceil(total/np)

  createbuttons(page, totalpages)

  let end = total - (page-1)*np -1

  let column1 = document.querySelector('column1')
  let column2 = document.querySelector('column2')
  column1.innerHTML = ''
  column2.innerHTML = ''
  
  let col = 0

  for(let i = end; i > end-np && i > -1; i--){
    if(!store.posts[i].deleted){
      post = store.posts[i]
      post.index = i
      ////// CARDS
      let card = createcard(i)
      //////COLUNAS 
      card.id = `post${i}`
      card.onclick = () => {
        createmodal(i)
      }
      if (col === 0) {
        column1.appendChild(card)
        col ++
      } else {
        col = 0
        column2.appendChild(card)
      }
    }
  }
}

function createcard(index) {
  let post = store.posts[index] 
  let card = document.createElement('div')
      card.className = "card"
      card.innerHTML = 
      `<div class="card-image">
        <figure class="image">
          <img src="${post.finalimg}" alt="Placeholder image">
        
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="logo.png">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">post#${index}</p>
            <p class="subtitle is-6">${post.time.toString()}</p>
          </div>
        </div>
        <div class="content">
          ${post.frase}
          <strong onclick=linkcard("${post.url}")>~ ${post.author}</strong>
          <br>
          <br>
          imagem provavelmente do jogo <strong>${post.game}</strong>
          <br> 
          <a onclick=linkcard("${post.gameurl}")>fonte da imagem original</a>
        </div>
      </div>
      <footer class="card-footer">
        <a onclick=window.open("${post.fb.url}") class="card-footer-item">facebook</a>
        <a onclick=window.open("${post.tt.url}") class="card-footer-item">twitter</a>
        <a onclick=clipboard(${index}) class="card-footer-item">copiar link</a>
      </footer>`
  return card
}

function createmodal(index) {
  let post = store.posts[index] 
  let modallist = document.querySelector('modals')

  let modal = document.createElement('div')
      modal.className = 'modal is-active'

      let modalbackground = document.createElement('div')
      modalbackground.className = "modal-background"
      modal.appendChild(modalbackground)

      let modalcontent = document.createElement('div')
      modalcontent.className = "modal-content"
      modal.appendChild(modalcontent)
      
      let close = document.createElement('button')
      close.className="modal-close is-large"
      close.onclick = () => {
          modallist.innerHTML = ''
      }
      modal.appendChild(close)
      
      let cardmodal = createcard(index).cloneNode(true)

      modalcontent.appendChild(cardmodal)

      modallist.appendChild(modal)

}

async function clipboard(index) {
  var input = document.body.appendChild(document.createElement("input"))
  input.value = `${URL}?post=${index}`
  input.select()
  document.execCommand('copy')
  input.parentNode.removeChild(input)
  let modals = document.querySelector('modals')
  let message = document.createElement('div')
  message.className = 'modal is-active'
  message.innerHTML = 
  `<div class="modal-content">
    <div class="notification is-danger">
       link copiado com sucesso!!!
    </div>
  </div>`
  modals.appendChild(message)
  window.setTimeout( () => { modals.removeChild(message) }, 5000)
  /*
  let messages = document.querySelector('messages')
    let message = document.createElement('div')
    message.className="modal is-active"
    message.innerHTML = "LINK COPIADO COM SUCESSO!"
    messages.appendChild(message)
    setTimeout( ()=>{ messages.innerHTML = "" } , 5000)
    */

}
