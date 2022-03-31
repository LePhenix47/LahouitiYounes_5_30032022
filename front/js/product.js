console.log("Buongiorno mondo");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors"); 

const urlProductsAPI = "http://localhost:3000/api/products";
/*
function showProductDetails() {
 
  fetch(urlProductsAPI)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (sofaProductsList) {
      console.log(sofaProductsList);
      for (sofaProduct in sofaProductsList) {
        itemImage.innerHTML = `
        <img src="${sofaProduct.imageUrl}" alt="${sofaProduct.altTxt}">
                `;
        itemTitle.textContent = sofaProduct.name;
        itemPrice.textContent = sofaProduct.price;
        itemDescription.textContent = sofaProduct.description;
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
//-------------------------------
*/


async function showProductDetails(){
    try{
    let response = await fetch(urlProductsAPI);
    let sofaProductsList = await response.json();
     console.log(sofaProductsList);
     
        itemImage.innerHTML = `
        <img src="${sofaProduct.imageUrl}" alt="${sofaProduct.altTxt}">
                `;
        itemTitle.textContent = sofaProduct.name;
        itemPrice.textContent = sofaProduct.price;
        itemDescription.textContent = sofaProduct.description;
      

    }catch(error){
        console.error(error);
    }
  
}



showProductDetails();