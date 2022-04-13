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

let addIdsInArray = (id) => {
  arrayOfIds.push(id);
  console.table(arrayOfIds);
};

let addCartItemsInHTML = (
  id,
  color,
  quantity,
  name,
  imageUrl,
  altTxt,
  price
) => {
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

  let deleteActualItemParagraph = document.createElement("p"); //<p deleteItem></p>
  deleteActualItemParagraph.classList.add("deleteItem");
  deleteActualItemParagraph.textContent = "Supprimer";
  deleteActualItemParagraph.setAttribute("data-index", i);

  divCartDeleteItems.appendChild(deleteActualItemParagraph); //<div delete> <p deleteItem></p> </div>

  divItemSettings.appendChild(divItemQuantity);
  divItemSettings.appendChild(divCartDeleteItems);

  divItemContent.appendChild(divItemDescription);
  divItemContent.appendChild(divItemSettings);

  article.appendChild(divItemImage);
  article.appendChild(divItemContent);

  cartItemsElement.appendChild(article);

  changeItemQuantityInput = numberOfProductsInput;
  deleteItemButton = deleteActualItemParagraph;
  itemArticle = article;
};

let computeTotalPriceAndQuantity = (price, quantity)=>{
  totalQuantityProductValue += quantity;
      productPrice = price * quantity;
      totalPriceProductValue += productPrice;
      totalQuantityItemsElement.textContent =
        totalQuantityProductValue.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        });
      totalPriceItemsElement.textContent =
        totalPriceProductValue.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        });
}

let computeNewPriceAndQuantity = (newQuantity, oldQuantity, price)=>{

}

let getCartProducts = () => {
  try {
    cartItemsList = getProducts();

    console.log(
      "%cListe de TOUS nos produits fetchés par l'API:",
      "background: orange; color: black;"
    );
    console.log(productDetailsList);

    for (i = 0; i < cartItemsList.length; i++) {
      const item = cartItemsList[i];
      const { id, color, quantity } = item;
      idProductCart = id;
      colorProductCart = color;
      quantityProductCart = quantity;

      const productInCart = productDetailsList.find(
        (content) => content._id === idProductCart
      );

      addIdsInArray(id);

      console.log(productInCart);
      const { name, imageUrl, altTxt, price } = productInCart;

      console.log(
        "%c Détails du produit dans le localStorage AVEC les propriétés du produit:",
        "background: purple"
      );

      cartItemsList.sort();

      //---------------------------Création liste produits du panier--------------------------------//
      addCartItemsInHTML(id, color, quantity, name, imageUrl, altTxt, price);

      computeTotalPriceAndQuantity(price, quantity);
      //-----------------------------------------------------------//
      console.group("Logs de la suppression ou du changement");

      //----------------------------------------------------------------------
      deleteItemButton.addEventListener("click", function () {
        let deleteButtonDataIndex = cartItemsList.findIndex(
          (index) => index.id === id && index.color === color
        );
        console.log("%c" + deleteButtonDataIndex, "background: green");
        cartItemsList.splice(deleteButtonDataIndex, 1);
        console.log(cartItemsList);

        let newCartList = registerProducts(cartItemsList);
        console.log(cartItemsList, deleteButtonDataIndex);
        console.log(newCartList);
        cartItemsElement.removeChild(ItemArticle);
        amountOfDeletedItems++;
        totalQuantityProductValue -= quantity;
        productPrice = price * quantity;
        totalPriceProductValue -= productPrice;
        totalQuantityItemsElement.textContent =
          totalQuantityProductValue.toLocaleString(undefined, {
            minimumFractionDigits: 0,
          });
        totalPriceItemsElement.textContent =
          totalPriceProductValue.toLocaleString(undefined, {
            minimumFractionDigits: 0,
          });
      });

      console.log("Produit du panier" + cartItemsList);

      //------------------------------------------------------------------------------
      changeItemQuantityInput.addEventListener("change", function (e) {
        let changeItemQuantityDataIndex = cartItemsList.findIndex(
          (index) => index.id === id && index.color === color
        );
        let itemCart = cartItemsList[changeItemQuantityDataIndex];
        let newQuantity = Number(e.target.value);
        let oldQuantity = Number(itemCart.quantity);
        if (newQuantity > 0) {
          let newPrice = newQuantity * price;
          let oldPrice = oldQuantity * price;

          totalQuantityProductValue += newQuantity - oldQuantity;
          console.log(totalQuantityProductValue);

          productPrice = price * quantity;

          totalPriceProductValue += newPrice - oldPrice;

          totalQuantityItemsElement.textContent =
            totalQuantityProductValue.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            });

          quantityParagraph.textContent = "Qté : " + newQuantity;
          totalPriceItemsElement.textContent =
            totalPriceProductValue.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            });

          itemCart.quantity = newQuantity;
          cartItemsList[changeItemQuantityDataIndex] = itemCart;
          registerProducts(cartItemsList);
        } else {
          newQuantity = oldQuantity;
        }
      });
      console.groupEnd("Logs de la suppression ou du changement");
      //-----------------------------------------------------------//
      
    }
  } catch (error) {
    console.error(error);
  }
};
