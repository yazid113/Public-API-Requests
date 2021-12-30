const gallery = document.querySelector('#gallery')

function fetchData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => data.results.map(profile => {
        console.log
       const email= profile.email
       const fullName= `${profile.name.first} ${profile.name.last}`
       const picture= profile.picture.thumbnail
       const location= `${profile.location.city},${profile.location.state}`
        getHTML(email,picture,fullName,location)
    }))

        
        
}
function getHTML(email,picture,fullName,location) {
    const html = `
    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${picture} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${fullName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${location}</p>
                    </div>
                </div>
                `;
    gallery.insertAdjacentHTML('afterbegin',html)
    
}

function popUP(){
    const card = document.querySelectorAll('#gallery div')
    card.addEventListener('click',function click(e) {
        if(e.target.className = 'card'){
         console.log('hello')   
        }
        
    })
}
fetchData('https://randomuser.me/api/?results=12')

