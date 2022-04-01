/*console.log("Bonjour monde");
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (value) {
    console.log(value);
    for(let i = 0; i< value.length; i++){
        let link = document.createElement("a");
        link.setAttribute("href", "./product.html?id=" + value[i]._id);
        let article = document.createElement("article");

        let image = document.createElement("img");
        image.setAttribute("src",value[i].imageUrl);
        image.setAttribute("alt", value[i].altTxt);

        let heading3 = document.createElement("h3");
        heading3.classList.add("productName");
        heading3.textContent = value[i].name;

        let paragraph = document.createElement("p");
        paragraph.classList.add("productDescription");
        paragraph.textContent = value[i].description;

        article.appendChild(image);
        article.appendChild(heading3);
        article.appendChild(paragraph);

        link.appendChild(article);
        let sectionItemElement = document.getElementById("items");
        sectionItemElement.appendChild(link);
    }
  })
  .catch(function (error) {
    console.error(error);
  });
*/

  
  console.log("Hello world");

  let itemsSection = document.getElementById("items");

  //La fonction products permet d'afficher dynamiquement les produits à notre page d'accueil
  async function products(){
    try{
      const urlProductsAPI = "http://localhost:3000/api/products"; //On ajoute l'URL dans une constante
      let response = await fetch(urlProductsAPI); //On attend la réponse du fetch pour savoir si le statut du code est 200
      let couchProductsList = await response.json(); //On crée la variable couchProductList qui va contenir le tableau d'objet de l'API au format JSON → Liste de nos produits

      for(couchProduct of couchProductsList){ //On fait une boucle pour parcourir le tableau
        itemsSection.innerHTML += ` 
        <a href="./product.html?id=${couchProduct._id}">
        <article>
          <img src="${couchProduct.imageUrl}" alt="${couchProduct.altTxt}">
          <h3 class="productName">${couchProduct.name}</h3>
          <p class="productDescription">${couchProduct.description}</p>
        </article>
      </a>
        `;
       
      }

    }catch(error){
      console.log('%c↓ Attention erreur dans la fonction products() '+ error + ' ↓', 'background-color: crimson;');
      console.error(error);
    }
  }

  products();
  
  
  

