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
                    <p>${color}</p>
                    <p>${price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product-quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">${removeObject(object)}</p>
                    </div>
                  </div>
                </div>
              </article>

 
 */
let getProductDetails = async (productId) => {
  let response = await fetch(urlProductsAPI + productId);
  let productDetailsList = await response.json();

  for (product of productDetailsList) {
    const { id, color, quantity } = product;
    console.log(
      "Details produit: " +
        id +
        " couleur " +
        color +
        " et quantité " +
        quantity
    );
  }
};

let removeProducts = (objectToRemove) => {
  let listOfProducts = getProducts();
  listOfProducts.filter((object) => object.id != objectToRemove);
};

let getCartProducts = () => {
  //L'ID, couleur & quantité de produits → dans le tableau d'objects stocké localement
  let cartItemsList = getProducts();

  for (cartItem of cartItemsList) {
    const { id } = cartItem;
    getProductDetails(id);
    console.table(cartItem);
  }
  //À partir de l'ID → faut récupérer l'ID du produit pour lui afficher → Image w/ txt alt, Nom, Couleur & Prix
};
