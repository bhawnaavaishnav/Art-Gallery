let seDiv = document.getElementById("seDiv")

async function passvalue() {

    let id = localStorage.getItem("data");

    let u = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    let rs = await u.json()
    console.log(rs);

    let image = "";
    if (rs.primaryImageSmall === "") {
       image = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
       console.log(image);
    }
    else {
       image = rs.primaryImageSmall
    }

    seDiv.innerHTML += 
            `<div class="pData"">
                <div>
                    <img src="${image}" alt="${rs.objectID}">
                </div>
                <div class="pData-info">
                    <h3>${rs.objectName}</h3>
                    <h3>${rs.accessionYear}</h3>
                    <h3>${rs.city}</h3>
                    <h3>${rs.country}</h3>
                    <h3>${rs.creditLine}</h3>
                    <h3>${rs.department}</h3>
                    <h3>${rs.medium}</h3>
                    <h3>${rs.repository}</h3>
                </div>
              </div>`
}

passvalue() 