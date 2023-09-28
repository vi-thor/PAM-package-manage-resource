let produtosSelecionados = [];
let products = [];

// Fill dropdown of products
function preencherDropdownProdutos(products) {
    const produtoSelecionado = document.getElementById("produto-selecionado");
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id.toString();
        option.textContent = `${product.name} - € ${product.price.toFixed(2)}`;
        produtoSelecionado.appendChild(option);
    });
}

function addProductToList() {
    const selectedProductId = document.getElementById("produto-selecionado").value;
    const selectedProduct = products.find(product => product.id.toString() === selectedProductId);

    if (selectedProduct) {
        produtosSelecionados.push(selectedProduct);

        const li = document.createElement("li");
        li.textContent = `${selectedProduct.name} - € ${selectedProduct.price.toFixed(2)}`;
        document.getElementById("lista-produtos").appendChild(li);

        updateTotal();
    }
}

function updateTotal() {
    const valorTotalInput = document.getElementById("valor-total");
    const total = produtosSelecionados.reduce((acc, product) => acc + product.price, 0);
    valorTotalInput.value = total.toFixed(2);
}

// Function to calculate Total Value based on selected products
function calcularValorTotal() {
    const valorTotalInput = document.getElementById("valor-total");
    const total = produtosSelecionados.reduce((acc, product) => acc + product.price, 0);
    valorTotalInput.value = total.toFixed(2);
    return total.toFixed(2);
}

// Function to handle form submission
function enviarEncomenda(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const dataEncomenda = document.getElementById("data-encomenda").value;
    
    const orderData = {
        nome,
        data: dataEncomenda,
        produtos: produtosSelecionados.map(p => `${p.name} - € ${p.price.toFixed(2)}`).join(', '),
        valorTotal: calcularValorTotal()
    };
    
    saveOrder(orderData);
    alert("Encomenda enviada!");
    produtosSelecionados = [];
}

// Add event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then((data) => data.json())
        .then((data) => {
            products = data;
            preencherDropdownProdutos(products);

            const adicionarProdutoBtn = document.getElementById("adicionar-produto");
            const encomendaForm = document.getElementById("encomenda-form");

            adicionarProdutoBtn.addEventListener("click", addProductToList);
            encomendaForm.addEventListener("submit", (event) => enviarEncomenda(event, products));
        })
        .catch((error) => {
            console.error("Error loading products:", error);
        });
});

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}