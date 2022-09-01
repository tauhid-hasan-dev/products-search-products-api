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
        const alert = document.getElementById('alert-elem');
        productHolder.innerHTML = '';
        const inputValue = inputElem.value;
        const productData = await loadProducts();
        console.log(productData);
        //product data is an array 
        //finding products according to search text using filter and includes method
        const foundProducts = productData.filter(product => product.category.includes(inputValue));
        if (foundProducts.length === 0) {
            alert.classList.remove('d-none');
        } else {
            alert.classList.add('d-none');
        }
        //filter return a array based on condition
        foundProducts.forEach(product => {
            const { title, price, image, category, description } = product;
            const productCard = document.createElement('div');
            productCard.classList.add('col-4');
            productCard.innerHTML = `
            <div class="card h-100" >
                <img src="${image}" class="card-img-top w-100 h-100" alt="...">
                <div class="card-body text-center">
                    <p class="card-title fs-5 fw-bolder">${title.length > 0 ? title.slice(0, 20) + '...' : title}</p>
                    <p class="card-text fw-semibold ">Price: ${price}$</p>
                    <p class="card-text fw-semibold ">Category: ${category}</p>
                    <div class="d-grid gap-2 ">
                        <button class="btn btn-primary btn-sm fw-semibold btn-select-player"
                            type="button" style="--bs-btn-padding-y: .6rem;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "showDetails('${description}', '${image}')">Show Details</button>
                    </div>
                </div>
            </div>
        `
            productHolder.appendChild(productCard);
        })
    }
})


const modalHolder = document.getElementById('modal-holder');
modalHolder.innerHTML = '';


const showDetails = async (description, image) => {
    console.log(description, image);
    modalHolder.innerHTML = `
    <div class="card ">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body text-center">
            <p class="card-title fs-5 ">${description}</p>
        </div>
    </div>
    `
}


    //searchProduct()
    //displayProducts()
    //loadProducts()
