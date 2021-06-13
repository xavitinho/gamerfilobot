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

  for(let i = end; i > end-np && i > -1; i--){
    if(!store.posts[i].deleted){

      let post = document.createElement('post')
      post.className = "post"
      post.style = "width:100%"

      if(i%2 > 0){
        column1.appendChild(post)
      } else {
        column2.appendChild(post)
      }

      let titlepost = document.createElement('titlepost')
      titlepost.innerHTML = `post #${i}`
      post.appendChild(titlepost)

      let img = document.createElement('img')
      img.src = store.posts[i].finalimg
      img.style = "width:100%"
      post.appendChild(img)

      let postcaption = document.createElement('postcaption')
      postcaption.innerHTML = store.posts[i].html
      post.appendChild(postcaption)

    }
  }
}