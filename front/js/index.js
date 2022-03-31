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
      let sofaProductsList = await response.json(); //On crée la variable sofaProductList qui va contenir le tableau d'objet de l'API au format JSON → Liste de nos produits

      for(sofaProduct of sofaProductsList){ //On fait une boucle pour parcourir le tableau
        itemsSection.innerHTML += ` 
        <a href="./product.html?id=${sofaProduct._id}">
        <article>
          <img src="${sofaProduct.imageUrl}" alt="${sofaProduct.altTxt}">
          <h3 class="productName">${sofaProduct.name}</h3>
          <p class="productDescription">${sofaProduct.description}</p>
        </article>
      </a>
        `;
       
      }

    }catch(error){
      console.error("ERREUR TROUVEE= " + error);
    }
  }

  products();
  
  
  

