console.log("Bonjour monde");
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


