const arr = [
  { name: "Teclado", brand: "Ozone", price: 100.0 },
  { name: "Rato Óptico", brand: "Razer", price: 150.0 },
  { name: "Monitor 24'", brand: "Asus", price: 265.0 },
];

// se não existirem artigos no localstorage insere o array de artigos pré-definidos
if (localStorage.getItem("articles") === null){

    localStorage.setItem("articles", JSON.stringify(arr));
}

// var articles = localStorage.getItem("articles");
// console.log(articles);

// function insert(article) {
//     console.log(newid);
// }

// evento para permitir apenas a inserção de número no input "qtd"
const inputQtd = document.getElementById('qtd');

inputQtd.addEventListener('input', function() {

    // valor atual do input
    const inputValueQtd = inputQtd.value;

    // carcteres validos
    const validCharacters = /^[0-9,]*$/;

    if (!validCharacters.test(inputValueQtd)) {
        inputQtd.value = inputValueQtd.replace(/[^0-9]/g, '');
    }
});

// evento para permitir apenas a inserção de número no input "price"
const inputPrice = document.getElementById('price');

inputPrice.addEventListener('input', function() {

    // valor atual do input
    const inputValuePrice = inputPrice.value;

    // carcteres validos
    const validCharacters = /^[0-9.]*$/;

    if (!validCharacters.test(inputValuePrice)) {
        inputPrice.value = inputValuePrice.replace(/[^0-9.]/g, '');
    }
});