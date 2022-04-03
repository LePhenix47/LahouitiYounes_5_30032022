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

const urlProductsAPI = "http://localhost:3000/api/products/";

//Cette fonction permet de nous retourner la valeur du paramètre dans l'URL
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

/*
Cette fonction nous permet d'afficher le produit grâce à son ID
    
*/
async function showProductDetails() {
  try {
    let productId = getParameter("id");

    let response = await fetch(urlProductsAPI + productId);
    let couchProduct = await response.json();

    console.log("ID du produit: " + productId);
    console.log(urlProductsAPI + productId);

    const { imageUrl, altTxt, colors, name, price, description } = couchProduct;

    itemImage.innerHTML = `
        <img src="${imageUrl}" alt="${altTxt}">
                `;
    itemTitle.textContent = name;
    itemPrice.textContent = price;
    itemDescription.textContent = description;
    for (color of colors) {
      itemColors.innerHTML += `
          <option value="${color}">${color}</option>
          `;
    }
    return productId;
  } catch (error) {
    console.log(
      "%c↓ Attention erreur dans la fonction showProductDetails() de product.js " +
        error +
        " ↓",
      "background-color: crimson;"
    );
    console.error(error);
  }
}

showProductDetails();
