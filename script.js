// Define classes

class Produk {
    constructor(nama, harga) {
        this.nama = nama;
        this.harga = harga;
    }
}

class ItemPesanan {
    constructor(produk, jumlah) {
        this.produk = produk;
        this.jumlah = jumlah;
    }

    getTotal() {
        return this.produk.harga * this.jumlah;
    }
}

class Pesanan {
    constructor() {
        this.itemPesanan = [];
    }

    tambahItem(item) {
        this.itemPesanan.push(item);
    }

    getTotal() {
        return this.itemPesanan.reduce((total, item) => total + item.getTotal(), 0);
    }
}

// Create order
const pesanan = new Pesanan();

// Function to display product list
function tampilkanDaftarProduk() {
    const productListElement = document.getElementById("product-list");
    productListElement.innerHTML = "<h2>Daftar Produk</h2>";

    pesanan.itemPesanan.forEach(item => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.textContent = `${item.produk.nama} - Jumlah: ${item.jumlah}`;
        productListElement.appendChild(productElement);
    });
}

// Function to display order summary
function tampilkanRingkasanPesanan() {
    const orderSummaryElement = document.getElementById("order-summary");
    const orderTotalElement = document.getElementById("order-total");

    orderTotalElement.textContent = `Total: Rp${pesanan.getTotal().toFixed(2)}`;
}

// Function to handle form submission for adding a product
function handleTambahProduk(event) {
    event.preventDefault();

    const productNameInput = document.getElementById("product-name");
    const productPriceInput = document.getElementById("product-price");

    const productName = productNameInput.value;
    const productPrice = parseFloat(productPriceInput.value);

    if (productName && !isNaN(productPrice) && productPrice > 0) {
        const product = new Produk(productName, productPrice);
        const orderItem = new ItemPesanan(product, 1); // Assume quantity is always 1 for new products
        pesanan.tambahItem(orderItem);

        tampilkanDaftarProduk();
        tampilkanRingkasanPesanan();

        // Reset form inputs
        productNameInput.value = "";
        productPriceInput.value = "";
    } else {
        alert("Harap masukkan nama produk dan harga yang valid.");
    }
}

// Add event listener for form submission
const addProductForm = document.getElementById("add-product-form");
addProductForm.addEventListener("submit", handleTambahProduk);

// Initial display of product list and order summary
tampilkanDaftarProduk();
tampilkanRingkasanPesanan();
