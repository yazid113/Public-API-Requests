const gallery = document.querySelector('#gallery')

function fetchData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => data.results.map(profile => {
        console.log(profile)
        profile=[profile.name.first,profile.name.last,profile.email,profile.picture.medium]
        console.log(profile)
    }))
        
        
        // const emails = data.results.map(email => email.email)
        // console.log(emails)
        // const photo = data.results.map(img => img.picture.medium)
        // console.log(photo)
        // const fullName = data.results.map(fullName => `${fullName.name.first} ${fullName.name.last}`)
        // console.log(fullName)
        
    
}
function getHTML(emails,photo,fullName) {
    const html = `
    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${photo}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${fullName}</h3>
                        <p class="card-text">${emails}</p>
                        <p class="card-text cap">city, state</p>
                    </div>
                </div>
                `;
    gallery.innerHTML = html;
    
}
fetchData('https://randomuser.me/api/?results=12')

