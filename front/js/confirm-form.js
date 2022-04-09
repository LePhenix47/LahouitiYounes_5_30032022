let firstNameElement = document.getElementById("firstName");
let firstNameErrorMessageElement = document.getElementById("firstNameErrorMsg");

let lastNameElement = document.getElementById("lastName");
let lastNameErrorMessageElement = document.getElementById("lastNameErrorMsg");

let adressElement = document.getElementById("adress");
let adressErrorMessageElement = document.getElementById("addressErrorMsg");

let cityElement = document.getElementById("city");
let cityErrorMessageElement = document.getElementById("cityErrorMsg");

let emailElement = document.getElementById("email");
let emailErrorMessageElement = document.getElementById("emailErrorMsg");

let orderButton = document.getElementById("order");
let formFields = document.querySelectorAll(".cart__order__form input");

let fullNameREGEX = /^([A-Z]{1})([a-z]){1,20}?$|^([A-Z]{1})([A-Z]){1,20}?$/;

let cityREGEX = /^([a-z A-Z -]+)$/;

let emailREGEX =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

let inputValidity = false;
//********--------------------Classe pour créer des objects de contact--------------------********//
class contactInfo {
  constructor(firstName, lastName, adress, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.adress = adress;
    this.city = city;
    this.email = email;
  }
}

orderButton.setAttribute("disabled", "true"); //On va l'enlever une fois le champ rempli et validé

let valueFirstName = "";
let valueLastName = "";


firstNameElement.addEventListener("input", (e) => {
  valueFirstName = e.target.value;
  switch (fullNameREGEX.test(valueFirstName)) {
    case true:
      firstNameErrorMessageElement.textContent = "Prénom correct";
      break;

    case false:
      firstNameErrorMessageElement.textContent =
        "Attention, le prénom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
    default:
      false;
  }
});

lastNameElement.addEventListener("input", (e) => {
  valueLastName = e.target.value;
  switch (fullNameREGEX.test(valueLastName)) {
    case true:
      lastNameErrorMessageElement.textContent = "Nom correct";
      break;
    case false:
      lastNameErrorMessageElement.textContent =
        "Attention, le nom saisi est incorrect, veuillez saisir votre nom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
        default:
            false;
  }
});

console.log("Prénom = " + valueFirstName);
console.log("Nom = " + valueLastName);

/*/
let formInfoVerification = () => {
  for (i = 0; i < formFields.length; i++) {
  if(fullNameREGEX.test(vlaueFirstName) && )
  }
  orderButton.removeAttribute("disabled");
};
/*/


/*/
let sendProductsInCartToConfirm = async () =>{
    try{
       let response = await fetch(urlProductsAPI + "order",{
     method: "POST",
     header:{
         'Accept': 'application/json'
         'Content-Type': 'application/json'
     },

     body: JSON.stringify(, arrayOfIds)
       }
      )

      let resultForm = response.json();
 
 ;

    }catch(error){
        console.error(error);
    }
}

orderButton.addEventListener("submit", function(){

})
/*/
