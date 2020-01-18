    let i = 0;
    let links = ["image/carousel-1.jpg", "image/carousel-2.jpg", "image/carousel-3.jpg", "image/carousel-4.jpg", "image/carousel-5.jpg", "image/carousel-6.jpg"];
    let photo = document.querySelector('.carousel');

    function carousel() {
        if (i <= 4) {
            i++;
            photo.src = links[i];
        } else {
            i = 0;
            photo.src = links[i];

        };
    }
    setInterval(carousel, 3000);


    function createCartText() {

        let container = document.createElement("div");
        container.id = "container";
        let textTeg = document.createElement("p");
        textTeg.id = "textTeg";
        let cartImg = document.createElement("img");
        cartImg.src = "image/shopping-cart.png";
        textTeg.innerText = "Your busket is empty";
        
        container.appendChild(cartImg);
        container.appendChild(textTeg);
        document.getElementById("busketHidden").appendChild(container);

    }


    function priceForAll() {

        let allProd = document.getElementsByClassName("product-in-busket");
        let priceForAll = 0;
        let totalPriceForAll = document.getElementById("totalPrice");

        Array.from(allProd).forEach(element => {

            let numOfProd = element.querySelector("input").value;
            let price = element.dataset.price;
            let totalPrice = numOfProd * price;
            priceForAll += totalPrice;
            
        });

        priceForAll = priceForAll.toFixed(2)
        totalPriceForAll.innerText = `Total Price for all : ${priceForAll}$`;

        return totalPriceForAll
    }


    function busketStart() {

        let emptyBusket = document.getElementById("emptyBusket");
        let busket = document.getElementById("busket");
        let numberOfChild = busket.childElementCount;

        if (numberOfChild > -1) {

            priceForAll();
            let emptyCartText = document.querySelector("#emptyBusket");

            if (emptyCartText != null) {
                emptyBusket.remove();
            } else {
                return 0
            }
        } else {

            totalPriceForAll.remove();
            createCartText()
        }
    }


    function loadCart() {

        let allButtonsforBuy = document.getElementsByClassName("deliver-button");
        productsInCartText = localStorage.getItem("ProductsInCart");

        if (productsInCartText != null) {
            productsInCart = JSON.parse(productsInCartText);

            Array.from(allButtonsforBuy).forEach(element => {

                let enable = productsInCart.indexOf(element.id);
                if (enable != -1) {
                    element.innerText = "In cart";
                    element.classList.add("deliver-button-active");
                    name = element.id;
                    price = parseFloat(element.dataset.price);
                    createProdInCart(name, price);
                } else {
                    return 0
                }

            });
        }
    }

    window.onload = loadCart;


    function localStor(price) {

        let idProd = event.target.id;
        let changeButton = document.getElementById(idProd);


        function getInf() {
            let productsInCart = [];
            productsInCartText = localStorage.getItem("ProductsInCart");
            if (productsInCartText != null) {
                productsInCart = JSON.parse(productsInCartText);
            }
            return productsInCart
        }


        let productsInCart = getInf();
        let enable = productsInCart.indexOf(idProd);


        if (enable == -1) {
            productsInCart.push(idProd);
            changeButton.innerText = "In cart";
            changeButton.classList.add("deliver-button-active");
        } else {
            productsInCart.splice(enable, 1);
            changeButton.innerText = `buy for ${price}$`;
            changeButton.classList.remove("deliver-button-active");
        }


        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));

    }


    function createProdInCart(name, price) {

        let nameOfProduct = document.createElement("h3");
        nameOfProduct.innerText = name;


        let priceForOne = document.createElement("p");
        priceForOne.innerText = `price for one : ${price}$`;


        let numberOfProduct = document.createElement("input");
        numberOfProduct.disabled = true;
        numberOfProduct.value = 1;
        let totalPriceOfProduct = document.createElement("p");

        function calcPrice() {
            totalPrice = price * numberOfProduct.value;
            totalPrice = totalPrice.toFixed(2)
            totalPriceOfProduct.innerText = `Total price : ${totalPrice} $`;
            return totalPriceOfProduct
        }


        let addProduct = document.createElement("button");
        addProduct.innerText = "+";
        addProduct.onclick = function add() {
            numberOfProduct.value++;
            calcPrice();
            priceForAll()
        };


        let subtractProduct = document.createElement("button");
        subtractProduct.innerText = "-";
        subtractProduct.onclick = function subtract() {
            if (numberOfProduct.value > 1) {
                numberOfProduct.value--;
                calcPrice()
                priceForAll();
            } else {
                numberOfProduct.value = 1;
            }
        };

        let numberOfProductBlock = document.createElement("div");
        numberOfProductBlock.appendChild(subtractProduct);
        numberOfProductBlock.appendChild(numberOfProduct);
        numberOfProductBlock.appendChild(addProduct);


        let busket = document.createElement("div");
        busket.appendChild(nameOfProduct);
        busket.appendChild(priceForOne);
        busket.appendChild(numberOfProductBlock);
        busket.appendChild(calcPrice());


        let allBusket = document.createElement("div");
        allBusket.appendChild(busket);


        allBusket.classList.add("product-in-busket");
        allBusket.dataset.price = price;
        allBusket.classList.add("row")
        allBusket.classList.add(name);
        busket.classList.add("row");
        busket.classList.add("productBlock");
        nameOfProduct.classList.add("col-lg-6");
        priceForOne.classList.add("col-lg-6");
        totalPriceOfProduct.classList.add("col-lg-12");
        totalPriceOfProduct.id = "totalPriceOfProduct"
        numberOfProductBlock.classList.add("col-lg-12");
        addProduct.classList.add("col-lg-2");
        numberOfProduct.classList.add("col-lg-8");
        subtractProduct.classList.add("col-lg-2");


        document.getElementById("busket").appendChild(allBusket);
        busketStart()
        priceForAll()
    }


    function buyFlower() {

        price = parseFloat(event.target.dataset.price);
        name = event.target.id;

        localStor(price);


        if (document.getElementsByClassName(name).length >= 1) {

            let listOfBoughtProd = document.getElementsByClassName(name);

            if (listOfBoughtProd.length > 0) {
                listOfBoughtProd[0].remove()
                priceForAll()
            };
        } else {
            createProdInCart(name, price)
        }
    }