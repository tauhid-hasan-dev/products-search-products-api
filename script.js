const loadProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

const setAllMenu = async () => {
    const productData = await loadProducts();
    const ul = document.getElementById('search-options');
    const uniqueArray = []
    productData.forEach(product => {
        //console.log(product);
        const { category } = product; //
        //console.log(category);
        if (uniqueArray.indexOf(category) == -1) {
            uniqueArray.push(category)
            const li = document.createElement('li');
            li.innerText = `${category}`
            ul.appendChild(li);
        }
    });
}
setAllMenu()

const displayProducts = async () => {
    const productData = await loadProducts();
    const productHolder = document.getElementById('product-holder');
    productData.forEach(product => {
        console.log(product);
        const { title, price, image } = product;
        const productCard = document.createElement('div');
        productCard.classList.add('col-4');
        productCard.innerHTML = `
        <div class="card h-100 " >
            <img src="${image}" class="card-img-top w-100 h-100 " alt="...">
            <div class="card-body text-center">
                <p class="card-title fs-5 fw-bolder">${title}</p>
                <p class="card-text fw-semibold ">Price: ${price}$</p>
                <div class="d-grid gap-2 ">
                    <button class="btn btn-primary btn-sm fw-semibold btn-select-player"
                        type="button" style="--bs-btn-padding-y: .6rem;" >Show Details</button>
                </div>
            </div>
         </div>
        `
        productHolder.appendChild(productCard);
    })
}

const searchProduct = async () => {
    const productData = await loadProducts();
    const inputElem = document.getElementById('product-input');
    
}



displayProducts()
loadProducts()
