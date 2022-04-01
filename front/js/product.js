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

console.log("Buongiorno mondo");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors");



const urlProductsAPI = "http://localhost:3000/api/products";

//Cette fonction permet de nous retourner les paramètres d'une URL
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  switch (
    parameters.has(parameterName) //Switch case au cas où le paramètre est trouvé
  ) {
    case true:
      return parameters.get(parameterName); //Retourne la VALEUR du paramètre qu'on a mis
      break;

    case false:
      console.error(parameterName + " n'a pas été trouvé dans l'URL de la page!");
      break;
    default:
      false;
  }
}

async function showProductDetails() {
  try {
    let response = await fetch(urlProductsAPI);
    let couchProductsList = await response.json();
    
    console.table(couchProductsList);
    console.table([couchProductsList]);

   // console.log(getParameter("id"));

    for (couchProduct of couchProductsList) {
      if (getParameter("id") === couchProduct._id) {
        itemImage.innerHTML = `
        <img src="${couchProduct.imageUrl}" alt="${couchProduct.altTxt}">
                `;
        itemTitle.textContent = couchProduct.name;
        itemPrice.textContent = couchProduct.price;
        itemDescription.textContent = couchProduct.description;
        for (color of couchProduct.colors) {
          itemColors.innerHTML += `
          <option value="${color}">${color}</option>
          `;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

showProductDetails();


