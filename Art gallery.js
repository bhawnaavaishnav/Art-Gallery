let search = document.getElementById("search")
let submit = document.getElementById("submit")
let single_artEl = document.getElementById("single-art")
let mainEl = document.getElementById("mains")
let artEl = document.getElementById("arts")
let resultHeading = document.getElementsByClassName("result-heading")

// function for displaying images on the front page ------------------------------------------------

async function showOnScreen() {
   let objResult = []
   let u = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)
   let rs = await u.json()
   objResult = rs.objectIDs;
   // console.log(objResult);

   for (let i = 0; i < 20; i++) {
      const element = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objResult[i]}`)
      let term = await element.json()
      // console.log(term.primaryImageSmall)

      let image = "";
      if (term.primaryImageSmall === "") {
         image = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
         // console.log(image);
      }
      else {
         image = term.primaryImageSmall
      }
      mainEl.innerHTML += 
         `<div class="main" id="${term.objectID}">
            <img src="${image}" alt="${term.objectID}">
            <div class="main-info" data-mainID="${term.objectName}">
            <h3>${term.objectName}</h3>
            </div>
         </div>`

   }
}

showOnScreen()

// function for displaying images after searching--------------------------------------------------

async function searchArt(e) {
   e.preventDefault();

   single_artEl.innerHTML = "";
   console.log(single_artEl);

   mainEl.innerHTML = '';
   console.log(mainEl)

   artEl.innerHTML = "";

   let term = search.value;

   if (term.trim()) {
      
      let searchResult = []
      let res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${term}`)
      let data = await res.json();
      searchResult = data.objectIDs;
      // console.log(searchResult);

      for (let i = 0; i < 50; i++) {

         const element = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchResult[i]}`)
         let term = await element.json()
         // console.log(term);

         let image = "";
         if (term.primaryImageSmall === "") {
            image = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
         }
         else {
            image = term.primaryImageSmall
         }

         artEl.innerHTML += 
               `<div class="art" id="${term.objectID}">
                  <img src="${image}" alt="${term.objectID}">
                  <div class="art-info" data-artID="${term.objectName}">
                  <h3>${term.objectName}</h3>
                  </div>
               </div>`
      }
   } else {
      alert("Please insert a value in Search")
   }
}
submit.addEventListener('submit', searchArt);

//Function for go to the next page by clicking on the image-----------------------------------------------------

mainEl.addEventListener("click", (e) => {
   window.location = "./ArtGallery.html"

   let id = e.target.parentNode.getAttribute("id")

   window.localStorage.setItem("data", id)
   console.log(id)
})

// Second function to go to the next page by clicking on the search image.-----------------------------------------------------------

let art = document.getElementById("arts")
art.addEventListener("click", (e) => {
   window.location = "./ArtGallery.html"

   // console.log(e.target.parentNode.getAttribute("id"))

   let id = e.target.parentNode.getAttribute("id")

   window.localStorage.setItem("data", id)
   console.log(localStorage)
})
