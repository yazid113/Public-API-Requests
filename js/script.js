let modalArr= []
const gallery = document.querySelector('#gallery')
const body = document.querySelector('body')
const closeBtn =document.querySelector('#modal-close-btn')

async function fetchData(url){
    const res = await fetch(url);
    return await res.json();       
}
function getHTML(data) {
    const html = `
    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${data.picture.medium} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                        <p class="card-text">${data.email}</p>
                        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                    </div>
                </div>
                `;
    gallery.insertAdjacentHTML('afterbegin',html)
    
}
function getModal(data) {
    const html = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${data.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                        <p class="modal-text">${data.email}</p>
                        <p class="modal-text cap">${data.location.city}</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postcode}</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
                `;
    return html
}
fetchData('https://randomuser.me/api/?results=12&?inc=name,location,email,dob,cell,picture')
.then(data => data.results.map(profile => {
    getHTML(profile)
    modalArr.push(getModal(profile))
    return modalArr
  }))

body.addEventListener('click',(e)=>{
    for (let i = 0; i < gallery.children.length; i++) {
      if (e.target === gallery.children[i] 
        || e.target === gallery.children[i].firstElementChild 
        || e.target === gallery.children[i].firstElementChild.firstElementChild
        || e.target === gallery.children[i].firstElementChild.nextElementSibling
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.firstElementChild
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.lastElementChild){
        console.log(e.target)
        console.log(gallery.children[i].firstElementChild.nextElementSibling)
        gallery.insertAdjacentHTML('afterend',modalArr[11-i]) 
        }
    }
    if(e.target.textContent === 'X'){
        document.querySelector("body > div.modal-container > div").parentNode.remove()
    } 
})
