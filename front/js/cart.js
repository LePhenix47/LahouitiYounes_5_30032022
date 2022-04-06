let cartItemsElement = document.getElementById("cart__items");
let totalQuantityItemsElement = document.getElementById("totalQuantity");
let totalPriceItemsElement = document.getElementById("totalPrice");

let firstNameErrorMessageElement = document.getElementById("firstNameErrorMsg");

/*
 Template du cart_items → 

 <article class="cart__item" data-id="${product-ID}" data-color="${product-color}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>

x                   <p>${color}</p> → A AJOUTER 'MANUELLEMENT' w/ createElement, appendChild & textContent pour chaque produit w/ boucle

                    <p>${price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">

x                      <p>Qté : ${quantity}</p> → A AJOUTER 'MANUELLEMENT' w/ createElement, appendChild & textContent pour chaque produit w/ boucle

                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product-quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">

x                   <p class="deleteItem">${removeObject(object)}</p> → Faire "à la main"


                    </div>
                  </div>
                </div>
              </article>

 
 */

// let getProductDetails = async (productId) => {
//   try {
//     let response = await fetch(urlProductsAPI + productId);
//     let productDetailsList = await response.json();

//     for (let product of productDetailsList) {
//       const { id, color, quantity } = product;
//       console.log(
//         "Details produit: " +
//           id +
//           " couleur " +
//           color +
//           " et quantité " +
//           quantity
//       );
//     }
//   } catch (error) {
//     console.log("%cAttention! ERREUR detectée", "background: red");
//     console.error(error);
//   }
// };
let cartItemsList = [];
let idProductCart = "";
let colorProductCart = "";
let productPrice = 0;
let totalQuantityProductValue = 0;
let totalPriceProductValue = 0;
let productDetailsList = [];

console.groupCollapsed("Dans la fonction getCartProducts");

console.groupEnd("Dans la fonction getCartProducts");
//-----------------------------------------------------------//

console.groupCollapsed("Dans la fonction getProductDetails");

let getProductDetails = async () => {
  try {
    let response = await fetch(urlProductsAPI);
    productDetailsList = await response.json();

    getCartProducts();
    changeQuantityProduct();
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
    //L'ID, couleur & quantité de produits → dans le tableau d'objects stocké localement
    cartItemsList = getProducts();

    console.log("Test produit", productDetailsList);

    for (i = 0; i < cartItemsList.length; i++) {
      const { id, color, quantity } = cartItemsList[i];
      idProductCart = id;
      colorProductCart = color;
      quantityProductCart = quantity;

      console.log("%c" + productDetailsList, "background: orange");

      const product = productDetailsList.find(
        (content) => content._id === idProductCart
      );

      console.log("%c" + product, "background: purple");
      const { name, imageUrl, altTxt, price, description } = product;

      cartItemsElement.innerHTML += `
      <article class="cart__item" data-id="${id}" data-color="${color}">
      <div class="cart__item__img">
        <img src="${imageUrl}" alt="${altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${name}</h2>
          <p>${color}</p>
          <p>${price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p id="quantityOFProduct">Qté : ${quantityProductCart}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProductCart}" data-index="${i}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
      `;

      totalQuantityProductValue += quantity;
      productPrice = price * quantity;
      totalPriceProductValue += productPrice;
      totalQuantityItemsElement.textContent = totalQuantityProductValue;
      totalPriceItemsElement.textContent = totalPriceProductValue;
    }

    //À partir de l'ID → faut récupérer l'ID du produit pour lui afficher → Image w/ txt alt, Nom, Couleur & Prix
    //On stocke tous les ID dans un tableau
  } catch (error) {
    console.error(error);
  }
};

//--------------------------------------------------------------

console.group("Parsed Input Quantity");
let changeQuantityProduct = () => {
  console.dir(cartItemsElement);

  let inputQuantityValueElement =
    document.getElementsByClassName("itemQuantity");

  console.dir(inputQuantityValueElement);

  for (i = 0; i < inputQuantityValueElement.length; i++) {
    inputQuantityValueElement[i].addEventListener("input", function (e) {
      const indexData = this.getAttribute("data-index");
      const element = cartItemsElement.children[Number(indexData)];
      console.log("index" + indexData, element);
      const id = element.getAttribute("data-id");
      const color = element.getAttribute("data-color");

      const item = cartItemsList.find(
        (content) => content.id === id && content.color === color
      );
    });
  }
};

console.groupEnd("Parsed Input Quantity");
