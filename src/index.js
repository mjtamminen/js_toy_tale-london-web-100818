const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector("#toy-collection")
const nameEl = document.querySelector("#name-field")
const imageEl = document.querySelector("#image-field")

let addToy = false

//Add new toy onto page
function addNewToy(toy) {
  console.log(toy)
  let newToy = document.createElement("div")
  newToy.className = "card"
  newToy.id = toy.id
  newToy.innerHTML = `
    <h2>${toy.name}</h2><br>
    <img class="toy-avatar" src="${toy.image}"><br>
    <p>Likes: ${toy.likes}</p>
    <button id="like-${toy.id}" class="like-btn" type="button">Like \<3</button>
  `
  toyList.appendChild(newToy)
  likeEl = document.getElementById(`like-${toy.id}`)
  likeEl.addEventListener("click", event => {
    console.log(typeof toy.likes + 1)
    toy.likes += 1
    updateToy(toy.id, toy.likes)
    const likesEl = newToy.querySelector('p')
    likesEl.innerText = `Likes: ${toy.likes}`
  })
}

//Add multiple items onto page
function addToys(toys) {
  toys.forEach(toy => addNewToy(toy))
}

//Show new toy on page
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit", event => {
      event.preventDefault()
      const newToy = {
        name: nameEl.value,
        image: imageEl.value,
        likes: 0
      }
      addNewToy(newToy)
        .then(serverToy => postNewToy(serverToy))
        .catch(() => alert("Unable to reach server"))

      toyFrom.reset()
    })

  } else {
    toyForm.style.display = 'none'
  }
})

//Post new toy on server
function postNewToy(toy) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(respose => response.json())
}

//Get toys from server
function getToysFromServer() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(addToys)
}

//Update toy on server
const updateToy = (id, likes) =>
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likes})
  }).then(response => response.json())
    .catch(err => alert(err))

getToysFromServer()
