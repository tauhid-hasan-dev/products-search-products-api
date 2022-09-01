const loadProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}


const setAllMenu = async () => {
    const productData = await loadProducts();
    console.log(productData);
    productData.forEach(product => {
        console.log(product);
        const { category } = product;
        console.log(category);
    });
    const ul = document.getElementById('search-options');
    const li = document.createElement('li');
    /* li.innerText = `${}` */
}
setAllMenu()
loadProducts()
