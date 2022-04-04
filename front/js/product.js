console.log("product.js");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let productPageTitle = document.querySelector("title");
let productPageDescription = document.querySelector(`meta[content]`);

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors");

let addToCartButton = document.getElementById("addToCart");

const urlProductsAPI = "http://localhost:3000/api/products/";

//Cette fonction permet de nous retourner la valeur du paramètre dans l'URL
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  if (parameters.has(parameterName)) {
    console.log("Le paramètre: " + parameterName + " est présent dans l'URL");
  }
  return parameters.get(parameterName);
}

/*
Cette fonction nous permet d'afficher les données/détails du produit grâce à son ID par appel d'API
*/

let productId = getParameter("id");

async function showProductDetails() {
  try {
    let response = await fetch(urlProductsAPI + productId);
    let couchProduct = await response.json();

    const { imageUrl, altTxt, colors, name, price, description } = couchProduct;

    productPageTitle.textContent = name;
    productPageDescription.setAttribute(
      "content",
      `Description du produit ${name}: ${description}`
    );

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









//Ajoute les produits 1 par 1 !!!!Faut faire plutot un tableau d'objets w/: ID, QUANTITé Prouit & COULEUR produit
function addedToCart(productObject) {
  let listOfProducts = getProducts();
  listOfProducts.push(productObject);
  registerProducts(listOfProducts);
}

/*
Récupère les produits dans un tableau
*/
function getProducts() {
  let listOfProducts = localStorage.getItem("listOfProducts");
  if (listOfProducts == null) {
    return [];
  } else {
    return JSON.parse(listOfProducts);
    //'Parse'r parce que l'on a un GETTER → On reçoit un objet JSON stringifié et on veut récupérer variable + type de la variable
  }
}

//Enregistre les produits localment dans un tableau d'objet
function registerProducts(listOfProducts) {
  localStorage.setItem("listOfProducts", JSON.stringify(listOfProducts));
  //'Stringify'er parce que l'on a un SETTER → le localStorage DOIT enregistrer les types complexes (tableaux & objets) au format texte sinon on perd le type
}

//Cette fonction vérifie qu'il n'y ait pas de redondance de produits
function verifyProductRedundancy(listOfProducts){
  let listOfProducts = localStorage.getItem("listOfProducts");
  JSON.parse(listOfProducts);

  for(product of listOfProducts){
    let {id, color, quantity} = product;

  }
}

//cette fonction va remplacer la vielle quantité de produits par la nouvelle quand l'ID + couleur produit est la même
function verifyProductQuantity();







//Cette classe permet d'ajouter des instances d'objet d'un produit
class classProductCartDetails {
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
  }
}

let quantityProduct = document.getElementById("quantity");
let valid = true;

let colorValue = 0;
let quantityValue = 0;


//On écoute les évènements lorsqu'on change de couleur et de quantité 
itemColors.addEventListener("change", function (event) {
  colorValue = event.target.value;
  console.log(colorValue);
});



quantityProduct.addEventListener("input", function (event) {
  quantityValue = event.target.value;
  console.log(quantityValue);
});



//La faudra envoyer la commande dans le panier en le stockant avec w/ WebStorage → localStorage + preventDefault du bouton commander dans l'Event listener
//Il doit enregistrer → L'id du canapé ainsi que: Le prix, le nom, le nombre d'articles,

//Ecoute l'évènement du click sur le bouton "Ajouter au panier" et le sauvegrade localement l'objet

/*

!ATTENTION: Faut changer la fonction parcequ'elle ajoute le même produit

*/ 
addToCartButton.addEventListener("click", function () {
  if (quantityValue > 0 && quantityValue <= 100 && colorValue != 0) {
    let objectProduct = new classProductCartDetails(
      productId,
      colorValue,
      quantityValue
    );

    console.table(objectProduct);

    alert("Votre produit a bien été ajouté au panier!");
    addedToCart(objectProduct);
  }

  if (quantityValue <= 0) {
    alert("Attention! La quantité saisie est invalide");
  }
  if (colorValue == 0) {
    alert("Attention! Vous devez choisir une couleur");
  }
});
