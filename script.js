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

const inputElem = document.getElementById('product-input');
inputElem.addEventListener('keypress', async (event) => {
    //finding the event and key
    const key = event.key
    //compare key if it is enter
    if (key === 'Enter') {
        const productHolder = document.getElementById('product-holder');
        productHolder.innerHTML = '';
        const inputValue = inputElem.value;
        const productData = await loadProducts(); //product data is an array 
        //finding products according to search text using filter and includes method
        const foundProducts = productData.filter(product => product.category.includes(inputValue));
        //filter return a array based on condition
        //we will 
        foundProducts.forEach(product => {
            const { title, price, image, category } = product;
            const productCard = document.createElement('div');
            productCard.classList.add('col-4');
            productCard.innerHTML = `
            <div class="card h-100" >
                <img src="${image}" class="card-img-top w-100 h-100" alt="...">
                <div class="card-body text-center">
                    <p class="card-title fs-5 fw-bolder">${title}</p>
                    <p class="card-text fw-semibold ">Price: ${price}$</p>
                    <p class="card-text fw-semibold ">Category: ${category}</p>
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
})


//searchProduct()
//displayProducts()
loadProducts()
