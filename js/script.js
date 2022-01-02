/*
*Variables creation for handling each process
*/
let modalArr= []
const gallery = document.querySelector('#gallery')
const body = document.querySelector('body')
const closeBtn =document.querySelector('#modal-close-btn')

/*
*Async function for the fetch process it recieve
*a string for parameter and get it JSON responde
*/
async function fetchData(url){
    const res = await fetch(url);
    return await res.json();       
}

/*
*`getHTML` function creates the HTML for a item 
*on the directory and inserts on the DOM, it receive
*an object as parameter
*/
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

/*
*`getModal` function creates the HTML for modal window 
*it receive an object as parameter
*/
function getModal(data) {
    const birthDay = data.dob.date.slice(0,10)
    const bDay = reformatBday(birthDay)
    const cellPhone = data.cell
    const cell = reformatCell(cellPhone)
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
                        <p class="modal-text">${cell}</p>
                        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postcode}</p>
                        <p class="modal-text">Birthday: ${bDay}</p>
                    </div>
                </div>
                `;
    return html
}

/*
*`reformatBday` function it is use to change format of 
*birthday form(DD-MM-YYYY) to the one require(MM/DD/YYYY)
*it receive a string as parameter
*/
function reformatBday(text) {
    for (let i = 0; i < text.length; i++) {
        const year = text[0]+text[1]+text[2]+text[3]
        const month = text[5]+text[6]
        const day = text[8]+text[9]
        const bDay = `${month}/${day}/${year}`
        return bDay
    }
}

/*
*`reformatCell` function it is use to change format of 
*cellphone number form((###)-###-####) to the one require((###) ###-####)
*it receive a string as parameter
*/
function reformatCell(text) {
    for (let i = 0; i < text.length; i++) {
        const num1 = text[0]+text[1]+text[2]+text[3]+text[4]
        const num2 = text[6]+text[7]+text[8]
        const num3 = text[10]+text[11]+text[12]+text[13]
        const phone = `${num1} ${num2}-${num3}`
        return phone
    }
}

/*
*Fetch the data of the randome page for 12 results
*Creat all for the 12 cards of the page
*Fill the modalArr array with all of the 12 modal window 
*/
fetchData('https://randomuser.me/api/?results=12&nat=us')
.then(data => data.results.map(profile => {
    getHTML(profile)
    modalArr.push(getModal(profile))
    return modalArr
  }))

/*
*Create event listener for the body and all the content inside
*it will pop the modal window by click any part of a person card
*By click a person card the modal window will be inserted on to the DOM
*At last by clicking the X on the top right corner will close the modal window
*/ 
body.addEventListener('click',(e)=>{
    for (let i = 0; i < gallery.children.length; i++) {
      if (e.target === gallery.children[i] 
        || e.target === gallery.children[i].firstElementChild 
        || e.target === gallery.children[i].firstElementChild.firstElementChild
        || e.target === gallery.children[i].firstElementChild.nextElementSibling
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.firstElementChild
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling
        || e.target === gallery.children[i].firstElementChild.nextElementSibling.lastElementChild){
        gallery.insertAdjacentHTML('afterend',modalArr[11-i]) 
        }
    }
    if(e.target.textContent === 'X'){
        document.querySelector("body > div.modal-container > div").parentNode.remove()
    } 
})
