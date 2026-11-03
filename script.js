const errorEl = document.getElementById('error');
const listEl = document.getElementById('products');

async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (response.status === 403) {
      errorEl.textContent = 'Ошибка 403: доступ запрещён';
      return;
    }

    const products = await response.json();

    for (const product of products) {
      const li = document.createElement('li');
      li.textContent = `${product.title} — ${product.price} $`;
      listEl.append(li);
    }
  } catch (e) {
    errorEl.textContent = 'Не удалось загрузить данные';
  }
}

loadProducts();