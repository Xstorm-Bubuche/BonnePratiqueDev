const products = [
  { name: 'Clavier gaming RGB', price: 89, inStock: true, onSale: false },
  { name: 'Souris sans fil', price: 49, inStock: true, onSale: true },
  { name: 'Écran 27" Full HD', price: 249, inStock: false, onSale: true },
  { name: 'Casque audio Bluetooth', price: 129, inStock: true, onSale: false },
  { name: 'Webcam 1080p', price: 59, inStock: true, onSale: true },
  { name: 'Imprimante multifonction', price: 199, inStock: false, onSale: false },
  { name: 'Disque dur SSD 1TB', price: 109, inStock: true, onSale: true },
  { name: 'Station de charge USB-C', price: 39, inStock: true, onSale: false },
  { name: 'Microphone USB', price: 79, inStock: false, onSale: true },
  { name: 'Haut-parleur Bluetooth', price: 59, inStock: true, onSale: false }
];

const listEl = document.querySelector('#products-list');
const emptyStateEl = document.querySelector('#empty-state');

const showAllBtn = document.querySelector('#show-all-btn');
const inStockBtn = document.querySelector('#in-stock-btn');
const onSaleBtn = document.querySelector('#on-sale-btn');


function filterProducts(type) {
  switch (type) {
    case 'stock':
      return products.filter(p => p.inStock);
    case 'sale':
      return products.filter(p => p.onSale);
    default:
      return products;
  }
}


function renderProducts(list, emptyMessage) {
  listEl.innerHTML = '';

  if (list.length === 0) {
    emptyStateEl.textContent = emptyMessage;
    emptyStateEl.style.display = 'block';
    return;
  }

  emptyStateEl.style.display = 'none';

  list.forEach(product => {
    const li = document.createElement('li');
    li.className = 'product-card';
    li.innerHTML = `
      <h3>${product.name}</h3>
      <p>Prix : ${product.price} €</p>
    `;
    listEl.appendChild(li);
  });
}


function handleDisplay(filterType) {
  const filtered = filterProducts(filterType);

  const emptyMessages = {
    all: 'Aucun produit à afficher.',
    stock: 'Aucun produit en stock.',
    sale: 'Aucun produit en promotion.'
  };

  renderProducts(filtered, emptyMessages[filterType]);
}


showAllBtn.addEventListener('click', () => handleDisplay('all'));
inStockBtn.addEventListener('click', () => handleDisplay('stock'));
onSaleBtn.addEventListener('click', () => handleDisplay('sale'));


handleDisplay('all');
