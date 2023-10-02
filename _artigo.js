const arr = [
  { name: "Teclado", brand: "Ozone", price: 100.0 },
  { name: "Rato Óptico", brand: "Razer", price: 150.0 },
  { name: "Monitor 24'", brand: "Asus", price: 265.0 },
];

// se não existirem artigos no localstorage insere o array de artigos pré-definidos
if (localStorage.getItem("articles") === null){

    localStorage.setItem("articles", JSON.stringify(arr));
}

// evento para permitir apenas a inserção de número no input "qtd"
const inputQtd = document.getElementById('qtd');

inputQtd.addEventListener('input', function() {

    // valor atual do input
    const inputValueQtd = inputQtd.value;

    // carcteres validos
    const validCharacters = /^[0-9]*$/;

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

function insert(name, brand, qtd, price, expire_date) {
    const article = {
        name: name,
        brand: brand,
        qtd: qtd,
        price: price,
        expire_date: expire_date
    };

    let articles = JSON.parse(localStorage.getItem('articles')); //|| [];
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
}

document.getElementById('form-artigo').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const qtd = document.getElementById('qtd').value;
    const price = document.getElementById('price').value;
    const expire_date = document.getElementById('expire-date').value;
    insert(name, brand, qtd, price, expire_date);
    this.reset();
});