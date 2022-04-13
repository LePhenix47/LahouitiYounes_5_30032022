let cartItemsElement = document.getElementById("cart__items");
let totalQuantityItemsElement = document.getElementById("totalQuantity");
let totalPriceItemsElement = document.getElementById("totalPrice");

let cartItemsList = [];

let idProductCart = "";
let colorProductCart = "";
let productPrice = 0;
let totalQuantityProductValue = 0;
let totalPriceProductValue = 0;
let productDetailsList = [];
let arrayOfIds = [];
let changeItemQuantityInput = undefined;
let deleteItemButton = undefined;
let itemArticle = undefined;

let amountOfDeletedItems = 0;

console.groupCollapsed("Dans la fonction getCartProducts");

console.groupEnd("Dans la fonction getCartProducts");
//-----------------------------------------------------------//
console.groupCollapsed("Dans la fonction getProductDetails");
//On récupère la liste de tous les produits et ensuite on appelle la fonction pour montrer tous les produits dans le panier
let getProductDetails = async () => {
  try {
    let response = await fetch(urlProductsAPI);
    productDetailsList = await response.json();
    getCartProducts();
  } catch (error) {
    console.log(
      "%cAttention! ERREUR detectée" + " voir les détails ↓ ",
      "background: red"
    );
    console.error(error);
  }
};
getProductDetails();

console.groupEnd("Dans la fonction getProductDetails");

let getCartProducts = () => {
  try {
    cartItemsList = getProducts(); //cartItemsList est la liste des produits stockés localement

    console.log(
      "%cListe de TOUS nos produits fetchés par l'API:",
      "background: orange; color: black;"
    );
    console.log(productDetailsList); //productDetailsListe contient la liste de TOUS les objets disponibles

    for (i = 0; i < cartItemsList.length; i++) {
      const item = cartItemsList[i];

      addCartItemsInHTML(item);
    }
  } catch (error) {
    console.error(error);
  }
};

function addCartItemsInHTML(item) {
  const { id, color, quantity } = item; //item est une case du tableau cartItemsList, contenant un produit ajouté au panier de type objet w/ propriétés→ id, couleur & quantité
  idProductCart = id;
  colorProductCart = color;
  quantityProductCart = quantity;
  //On stocke globalement ces valeurs

  const productInCart = productDetailsList.find(
    //productInCart est le produit FILTRé de type Objet stocké localement AVEC les propriétés → name, imageUrl, altTxt & price

    (content) => content._id === idProductCart
  );

  arrayOfIds.push(id);
  const { name, imageUrl, altTxt, price } = productInCart;
  console.log(
    "%c Détails du produit dans le localStorage AVEC les propriétés du produit:",
    "background: purple"
  );

  //---------------------------Création liste pproduits du panier--------------------------------//

  /*
      Cette fonction permet 
      //cartItemsList est la liste des produits stockés localement
       //productDetailsListe contient la liste de TOUS les objets disponibles
       //item est une case du tableau cartItemsList, contenant un produit ajouté au panier de type objet w/ propriétés→ id, couleur & quantité
        //productInCart est le produit FILTRé de type Objet stocké localement AVEC les propriétés → name, imageUrl, altTxt & price
      */
  let article = document.createElement("article"); //<article>
  article.classList.add("cart__item");
  article.setAttribute("data-id", id);
  article.setAttribute("data-color", color);
  let divItemImage = document.createElement("div");
  divItemImage.classList.add("cart__item__img");
  let itemImage = document.createElement("img");
  itemImage.setAttribute("src", imageUrl);
  itemImage.setAttribute("alt", altTxt);
  divItemImage.appendChild(itemImage); //<div item__img> <img/> </div>
  let divItemContent = document.createElement("div"); //<div content> </div>
  divItemContent.classList.add("cart__item__content");
  let divItemDescription = document.createElement("div"); //<div description> </div>
  divItemDescription.classList.add("cart__item__content__description");
  let itemNameHeading2 = document.createElement("h2"); //<h2></h2>
  itemNameHeading2.textContent = name;
  let itemColorParagraph = document.createElement("p"); //<p color></p>
  itemColorParagraph.textContent = "Couleur: " + color;
  let itemPriceParagraph = document.createElement("p"); //<p price></p>
  itemPriceParagraph.textContent = "Prix à l'unité: " + price + " €";
  divItemDescription.appendChild(itemNameHeading2); // <div description> <h2></h2> </div>
  divItemDescription.appendChild(itemColorParagraph); //  <div description> <h2></h2> <p color></p></div>
  divItemDescription.appendChild(itemPriceParagraph); //  <div description> <h2></h2> <p color></p>  <p price></p> </div>
  let divItemSettings = document.createElement("div"); //<div settings></div>
  divItemSettings.classList.add("cart__item__content__settings");
  let divItemQuantity = document.createElement("div"); //<div quantity></div>
  divItemQuantity.classList.add("cart__item__content__settings__quantity");
  let quantityParagraph = document.createElement("p"); // <p quantité>${quantity}</p>
  quantityParagraph.textContent = "Qté : " + quantity;
  let numberOfProductsInput = document.createElement("input");
  numberOfProductsInput.classList.add("itemQuantity");
  numberOfProductsInput.setAttribute("type", "number");
  numberOfProductsInput.setAttribute("name", "itemQuantity");
  numberOfProductsInput.setAttribute("min", "1");
  numberOfProductsInput.setAttribute("max", "100");
  numberOfProductsInput.setAttribute("value", quantity); //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
  divItemQuantity.appendChild(quantityParagraph); //<div quantity> <p quantité>${quantity}</p> </div>
  divItemQuantity.appendChild(numberOfProductsInput); //<div quantity> <p quantité>${quantity}</p> <input/></div>
  let divCartDeleteItems = document.createElement("div"); //<div delete></div>
  divCartDeleteItems.classList.add("cart__item__content__settings__delete");
  let deleteItemActualItemParagraph = document.createElement("p"); //<p deleteItem></p>
  deleteItemActualItemParagraph.classList.add("deleteItem");
  deleteItemActualItemParagraph.textContent = "Supprimer";
  deleteItemActualItemParagraph.setAttribute("data-index", i);
  divCartDeleteItems.appendChild(deleteItemActualItemParagraph); //<div delete> <p deleteItem></p> </div>
  divItemSettings.appendChild(divItemQuantity);
  divItemSettings.appendChild(divCartDeleteItems);
  divItemContent.appendChild(divItemDescription);
  divItemContent.appendChild(divItemSettings);
  article.appendChild(divItemImage);
  article.appendChild(divItemContent);
  cartItemsElement.appendChild(article);
  //-----------------------------------------------------------//
  console.group("Logs de la suppression ou du changement");
  changeItemQuantityInput = numberOfProductsInput;
  deleteItemButton = deleteItemActualItemParagraph;
  itemArticle = article;
  //-------------------------------------------------------------
  deleteItemButton.addEventListener("click", function () {
    deleteItemsFunction(item, article, price);
  });
  console.log("Produit du panier" + cartItemsList);
  //------------------------------------------------------------------
  changeItemQuantityInput.addEventListener("input", function (e) {
    changeItemsQuantity(e, item, price, quantityParagraph);
  });
  console.groupEnd("Logs de la suppression ou du changement");
  //-----------------------------------------------------------//
  totalQuantityProductValue += quantity;
  productPrice = price * quantity;
  totalPriceProductValue += productPrice;
  totalQuantityItemsElement.textContent = totalQuantityProductValue;
  totalPriceItemsElement.textContent = totalPriceProductValue.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
    }
  );
  //[element].toLocaleString(undefined, { minimumFractionDigits: 0 }) pour rendre: 23790€ → 23 790€
}

//--------------------------------------------------------------
/*
Fonction qui:
1. Enlève le produit du panier ( + l'enlève dans le localStorage )
2. Change la quantité de produit ( = Qté tot - vieille qté ds localStorage + nouvelle qté entrée dans la page)
*/

function deleteItemsFunction(item, article, price) {
  const { id, color, quantity } = item;

  let deleteButtonDataIndex = cartItemsList.findIndex(
    (index) => index.id === id && index.color === color
  );

  console.log("%c" + deleteButtonDataIndex, "background: green");

  cartItemsList.splice(deleteButtonDataIndex, 1); //On veut effacer un seul élément qui retourne un tableau
  console.log(cartItemsList);

  let newCartList = registerProducts(cartItemsList);
  cartItemsElement.removeChild(article);

  amountOfDeletedItems++;
  totalQuantityProductValue -= quantity;
  productPrice = price * quantity;
  totalPriceProductValue -= productPrice;
  totalQuantityItemsElement.textContent = totalQuantityProductValue;
  totalPriceItemsElement.textContent = totalPriceProductValue.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
    }
  );
}

function changeItemsQuantity(e, item, price, quantityParagraph) {
  const { id, color } = item;
  let changeItemQuantityDataIndex = cartItemsList.findIndex(
    (index) => index.id === id && index.color === color
  );
  let itemCart = cartItemsList[changeItemQuantityDataIndex];
  let newQuantity = Number(e.target.value);
  let oldQuantity = Number(itemCart.quantity);
  //-----------------------------------------------------------
  if (newQuantity > 0) {
    let newPrice = newQuantity * price;
    let oldPrice = oldQuantity * price;
    totalQuantityProductValue += newQuantity - oldQuantity;
    console.log(totalQuantityProductValue);

    totalPriceProductValue += newPrice - oldPrice;

    totalQuantityItemsElement.textContent = totalQuantityProductValue;

    quantityParagraph.textContent = "Qté : " + newQuantity;
    totalPriceItemsElement.textContent = totalPriceProductValue.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 0,
      }
    );

    itemCart.quantity = newQuantity;
    cartItemsList[changeItemQuantityDataIndex] = itemCart;
    registerProducts(cartItemsList);
  } else {
    newQuantity = oldQuantity;
  }
}
