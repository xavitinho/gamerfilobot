
var store
var np = 8// numero de posts por pagina

var URL = 'https://xavitinho.github.io/gamerfilobot/'

var posts = []

fetch('https://raw.githubusercontent.com/xavitinho/gamerfilobot/main/store.json')
  .then(response => response.json())
  .then(jsonResponse => {

    store = jsonResponse

    for (let post of Object.values(store.posts)) {
      if(!post.deleted) {
        posts.push(post)
        //console.log(post.index)
      }
    }

    selectPage(1) 

    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams) {
      const params = Object.fromEntries(urlSearchParams.entries())
      require(params)
    }

  })

function require(params) {
  let lastpost = posts.length
  if (params.post) {
    for(let i=0; i<lastpost; i++){
      if(posts[i].index === parseInt(params.post)){
        createmodal(i)
        let page = Math.ceil(((lastpost - i) / np))
        selectPage(page)
      }
    }
  }
  if (params.page && params.page < lastpost / np + 1 && params.page > 0) {
    selectPage(parseInt(params.page))
  }
}

function random (){
  let lastpost = posts.length
  let i = Math.floor(Math.random() * lastpost)
  createmodal(i)
    let page = Math.ceil(((lastpost - i) / np))
  selectPage(page)
}

function createbuttons(nav, page, totalpages) {
  if (totalpages > 1) {

    if (page === 1) {
      nav.innerHTML =
        `<a class="pagination-previous" 
    disabled>
      <<
    </a>`
    } else {
      nav.innerHTML =
        `<a class="pagination-previous" 
    onclick=selectPage(${page - 1})>
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
    onclick=selectPage(${page + 1})>
      >>
    </a>`
    }

    let paglist = document.createElement('ul')
    paglist.className = 'pagination-list'
    nav.appendChild(paglist)

    if (page > 3 && totalpages > 5) {
      paglist.innerHTML +=
        `<li onclick = selectPage(1)><a class="pagination-link">1</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>`
    }

    let first
    let last
    if (totalpages > 5) {
      if (page < 3) {
        first = 1
        last = 5
      } else if (page > totalpages - 2) {
        first = totalpages - 4
        last = totalpages
      } else {
        first = page - 2
        last = page + 2
      }
    } else {
      first = 1
      last = totalpages
    }

    for (let i = first; i <= last; i++) {

      let li = document.createElement('li')
      if (i === page) {
        li.innerHTML = `<a class="pagination-link is-current" onclick=selectPage(${i})>${i}</a>`
      } else {
        li.innerHTML = `<a class="pagination-link" onclick=selectPage(${i})>${i}</a>`
      }
      paglist.appendChild(li)

    }

    if (page < totalpages - 2 && totalpages > 5) {
      paglist.innerHTML +=
        `<li><span class="pagination-ellipsis">&hellip;</span></li>
    <li onclick=selectPage(${totalpages})>
      <a class="pagination-link">
        ${totalpages}
      </a>
    </li>`
    }

    let dropdown = document.querySelector('dropdown1')
    selectnp(dropdown)

  }
}

function selectnp(navigation) {
  let bgdropdown = document.querySelector('bgdp')
  navigation.innerHTML = ''
  navigation.innerHTML += 'exibir:'
  let total = posts.length
  var dropdown = document.createElement('div')
  dropdown.className = 'dropdown'
  dropdown.onclick = () => {
    console.log('jjjj')
    dropdown.className = 'dropdown is-active'
  }
  bgdropdown.onclick = () => {
    let dropd = document.getElementsByClassName('dropdown')[0]

    dropd.className = 'dropdown'
    bgdropdown.className = 'bgdp-HIDDEN'
    console.log('kkk')
  }
  let string =
    `<dropdown-background></dropdown-background> 
  <div class="dropdown-trigger" onclick=triggerdropdown()>
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>${np}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">`

  for (let i = 1; i < total; i = i + 5) {
    string +=
      `<a onclick=npages(${i}) class="dropdown-item">
        ${i}
      </a>`
  }
  string += '</div> </div>'
  dropdown.innerHTML = string
  navigation.appendChild(dropdown)
}

function triggerdropdown() {
  let bgdropdown = document.querySelector('bgdp')
  bgdropdown.className = 'bgdp-active'
}

function npages(i) {
  let bgdropdown = document.querySelector('bgdp')
  bgdropdown.className = 'bgdp-HIDDEN'
  console.log('aaaaaaaaaaa')
  np = i
  selectPage(1)
}

function selectPage(page) {

  let total = posts.length

  let totalpages = Math.ceil(total / np)

  let hero = document.querySelector('herobackground')
  let rp = Math.floor(Math.random() * total)

  hero.style = 
  `width: 75%;
  height: 75%;
  background-image: url('${posts[rp].finalimg}');
  background-position: center top;
  background-repeat: repeat;
  background-size: cover;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  position: absolute;
  z-index: 1;
  overflow: hidden;
  opacity: 0.8;`

  //hero.appendChild(background)
  
  //hero = document.getElementsByClassName('subtitle')[0]
  //hero.innerHTML = `<a href="?post=${posts[rp].index}"> ir para o post #${posts[rp].index} </a>`

  let nav = document.querySelector('nav1')
  createbuttons(nav, page, totalpages)


  let end = total - (page - 1) * np - 1

  let column1 = document.querySelector('column1')
  let column2 = document.querySelector('column2')
  column1.innerHTML = ''
  column2.innerHTML = ''

  let col = 0

  for (let i = end; i > end - np && i > -1; i--) {
      
      ////// CARDS
      let card = createcard(i)
      //////COLUNAS 
      card.id = `post${posts[i].index}`
      card.onclick = () => {
        createmodal(i)
      }
      if (col === 0) {
        column1.appendChild(card)
        col++
      } else {
        col = 0
        column2.appendChild(card)
      }
    
  }
}

function createcard(index) {
  let post = posts[index]
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
            <p class="title is-4">post#${post.index}</p>
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
        <a onclick=clipboard(${post.index}) class="card-footer-item">copiar link</a>
      </footer>`
  return card
}

function linkcard(url) {
  window.open(url)
  let modallist = document.querySelector('modals')
  modallist.innerHTML = ''
}

function createmodal(index) {
  let post = posts[index]
  let modallist = document.querySelector('modals')

  let modal = document.createElement('div')
  modal.className = 'modal is-active'

  let modalbackground = document.createElement('div')
  modalbackground.className = "modal-background"
  modalbackground.onclick = () => {
    modallist.innerHTML = ''
  }
  modal.appendChild(modalbackground)

  let modalcontent = document.createElement('div')
  modalcontent.className = "modal-content"
  modal.appendChild(modalcontent)

  let close = document.createElement('button')
  close.className = "modal-close is-large"
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
  let notif = document.querySelector('notif')
  let message = document.createElement('div')
  message.className = 'notif-active'
  message.innerHTML = 'link copiado com sucesso'
  notif.appendChild(message)
  window.setTimeout(() => {
    notif.innerHTML = ''
  }, 5000)
}
