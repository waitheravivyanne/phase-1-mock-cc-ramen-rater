//DOM render functions
function renderOneRamen(ramen) {
    //build ramen
    let ramenImg = document.createElement('li')
    ramenImg.tagName = 'img'
    ramenImg.innerHTML = `
        <img src="${ramen.image}">`
    //add ramen to DOM
    document.getElementById('ramen-menu').appendChild(ramenImg)
    //event listener
    ramenImg.addEventListener('click', handlerImg)
    //event handler on images
    function handlerImg(e) {
        e.preventDefault()
       document.getElementById('ramen-detail').innerHTML = `
       <img class="detail-image" src="${ramen.image}">
       <h2 class="name">${ramen.name}</h2>
       <h3 class="restaurant">${ramen.restaurant}</h3>
       `
       document.getElementById('comment-display').innerHTML = `
       <p>${ramen.comment}</p>
       `
       document.getElementById('rating-display').innerHTML = `
       <span>${ramen.rating}</span>
       `
    }
}
//event listener on the form
document.getElementById('new-ramen').addEventListener('submit', handleSubmit)
//event handler on submit
function handleSubmit(e) {
    let ramenObj = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.newComment.value
}
   renderOneRamen(ramenObj)
    newRamen(ramenObj)
}
//fetch requests
//get fetch for all ramen resources
function getAllRamens() {
    fetch('http://localhost:3000/ramens')
       .then(res => res.json())
       .then(ramens => ramens.forEach(ramen => renderOneRamen(ramen)))
}

//fetch POST request
//add a ramen on the ramen resources
function newRamen(ramenObj) {
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
    .then(res => res.json())
    .then(ramen => newRamen(ramen))
}
//Initial Render
//get data and render our ramens to the DOM
function initialize() {
    getAllRamens()
}
initialize()