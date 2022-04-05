let cartItems = document.getElementById("cart__items");
let totalQuantityItems = document.getElementById("totalQuantity");
let totalPriceItems = document.getElementById("totalPrice");

let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");

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

let idProductCart = 0;
let colorProductCart = 0;
let quantityProductCart = 0;

let arrayOfIds = [];

console.log("%c" + getProductDetails(), "background: #8418ca");

console.groupCollapsed("Dans la fonction getCartProducts");

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
      const { id, color, quantity } = cartItem;
      idProductCart = id;
      colorProductCart = color;
      quantityProductCart = quantity;

      arrayOfIds.push(idProductCart);
      console.log("%cID ajouté dans l'array", "background: #d46823");
      console.table(arrayOfIds);
      console.log(
        "La variable idProductCart vaut: " +
          idProductCart +
          "\n" +
          "\n" +
          "La variable colorProduct vaut: " +
          colorProductCart +
          "\n" +
          "\n" +
          "La quantityProductCart vaut: " +
          quantityProductCart
      );
    }

    //À partir de l'ID → faut récupérer l'ID du produit pour lui afficher → Image w/ txt alt, Nom, Couleur & Prix
    //On stocke tous les ID dans un tableau
  } catch (error) {
    console.error(error);
  }
};

getCartProducts();
console.log("%cTableau des IDs", "background:#4eba10");
console.table(arrayOfIds);
console.groupEnd("Dans la fonction getCartProducts");
//-----------------------------------------------------------//

console.groupCollapsed("Dans la fonction getProductDetails");


async function getProductDetails() {
  try {
  
      idProductCart;

      console.log(idProductCart);

      let response = await fetch(urlProductsAPI);
      let productDetailsList = await response.json();

      for (product of productDetailsList) {
        const { _id, name, price, imageUrl, altTxt } = product;
        console.log(
          "%cInfos produit: " +
            "ID Produit: " +
            _id +
            "\n" +
            "nom produit: " +
            name +
            "\n" +
            "Prix: " +
            price +
            "\n" +
            "Image" +
            imageUrl +
            " w/ texte alteratif " +
            altTxt,
          "background: #0bff22; color: black"
        );
        cartItems.innerHTML += `
          <article class="cart__item" data-id="${_id}">
          <div class="cart__item__img">
            <img src="${imageUrl}" alt="${altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${name}</h2>
              <p></p>
              <p>${price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
              
              </div>
              <div class="cart__item__content__settings__delete">
              
              </div>
            </div>
          </div>
        </article>
          `;
      }

      console.log("Details produit: " + idProductCart);
    }
   catch (error) {
    console.log(
      "%cAttention! ERREUR detectée" + " voir les détails ↓ ",
      "background: red"
    );
    console.error(error);
  }
}
console.groupEnd("Dans la fonction getProductDetails");
