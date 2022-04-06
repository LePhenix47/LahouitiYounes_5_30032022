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

let idProductCart = "";
let colorProductCart = "";
let productPrice = 0;
let totalQuantityProductValue = 0;
let totalPriceProductValue = 0;


console.groupCollapsed("Dans la fonction getCartProducts");




console.groupEnd("Dans la fonction getCartProducts");
//-----------------------------------------------------------//

console.groupCollapsed("Dans la fonction getProductDetails");

let getProductDetails = async () => {
  try {

    let response = await fetch(urlProductsAPI);
    let productDetailsList = await response.json();
  } catch (error) {
    console.log(
      "%cAttention! ERREUR detectée" + " voir les détails ↓ ",
      "background: red"
    );
    console.error(error);
  }
}
getProductDetails();
console.groupEnd("Dans la fonction getProductDetails");


let getCartProducts = () => {
  try {
    //L'ID, couleur & quantité de produits → dans le tableau d'objects stocké localement
    let cartItemsList = getProducts();
    console.log(
      "%cLa liste de produits du panier stockée localement est ici: ",
      "background: #106bba"
    );
    console.table(cartItemsList);
    getProductDetails();

    for (let cartItem of cartItemsList) {
      const {
        id,
        color,
        quantity,
        imageUrl,
        altTxt,
        name,
        price,
        description,
      } = cartItem;
      idProductCart = id;
      colorProductCart = color;
      quantityProductCart = quantity;

      totalQuantityProductValue += quantity;
      productPrice = price * quantity;
      totalPriceProductValue += productPrice;

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
            <p id="quantityOFProduct">Qté : ${quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
      `;
      totalQuantityItemsElement.textContent = totalQuantityProductValue;
      totalPriceItemsElement.textContent = totalPriceProductValue;

      
    }

    //À partir de l'ID → faut récupérer l'ID du produit pour lui afficher → Image w/ txt alt, Nom, Couleur & Prix
    //On stocke tous les ID dans un tableau
  } catch (error) {
    console.error(error);
  }
};
getCartProducts();

//--------------------------------------------------------------

let inputQuantityValueElement =
  document.getElementsByClassName("itemQuantity")[0];

  inputQuantityValueElement.addEventListener("input", (e) => {
    let inputQuantityValue = e.target.value;
    console.log(inputQuantityValue);
    let listOfProductsInCart = getProducts();
    console.table(listOfProductsInCart);
    for(product of listOfProductsInCart){
      
    }
  });
