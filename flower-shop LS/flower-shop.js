<<<<<<< HEAD
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

    //check this
    function createObjProd(name, price) {
        let countProd = 1;
        // if (document.querySelector(".numOfProd").value != null) {
        //     countProd = document.querySelector(".numOfProd").value;
        // }

        let objOfProd = {
            name: name,
            price: price,
            countProd: countProd,
        }
        return objOfProd;
    }

    function createCartText() {

        let container = document.createElement("div");
        container.id = "emptyBusket";
        let textTeg = document.createElement("p");
        textTeg.id = "emptyBusketIcon";
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
        let totalPriceForAll = priceForAll();

        if (numberOfChild > 0) {

            priceForAll();
            let emptyCartText = document.querySelector("#emptyBusket");

            if (emptyCartText != null) {
                emptyBusket.remove();
            }
        } else {

            while (totalPriceForAll.firstChild)
                totalPriceForAll.removeChild(totalPriceForAll.firstChild);
            createCartText();
        }
    }


    function loadCart() {

        let allButtonsforBuy = document.getElementsByClassName("deliver-button");
        productsInCartText = localStorage.getItem("ProductsInCart");

        if (productsInCartText != null) {
            productsInCart = JSON.parse(productsInCartText);

            Array.from(allButtonsforBuy).forEach(element => {

                let enable = false;
                for (let i = 0; i < productsInCart.length; i++) {
                    if (element.id == productsInCart[i].name) {
                        enable = true;
                    }
                }

                if (enable == true) {
                    element.innerText = "In cart";
                    element.classList.add("deliver-button-active");
                    name = element.id;
                    price = parseFloat(element.dataset.price);
                    createProdInCart(name, price);
                }

            });
        }
    }

    window.onload = loadCart;

    function getInf() {
        let productsInCart = [];
        productsInCartText = localStorage.getItem("ProductsInCart");
        if (productsInCartText != null) {
            productsInCart = JSON.parse(productsInCartText);
        }
        return productsInCart
    }

    function localStor(price) {

        let idProd = event.target.id;
        let changeButton = document.getElementById(idProd);


        let productsInCart = getInf();

        let enable = -1;

        for (let i = 0; i < productsInCart.length; i++) {
            if (idProd == productsInCart[i].name) {
                enable = i;
            }
        }

        if (enable > -1) {
            productsInCart.splice(enable, 1);
            changeButton.innerText = `buy for ${price}$`;
            changeButton.classList.remove("deliver-button-active");
        } else {
            productsInCart.push(createObjProd(idProd, price));
            changeButton.innerText = "In cart";
            changeButton.classList.add("deliver-button-active");
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

        let productsInCart = getInf();
        for (let i = 0; i < productsInCart.length; i++) {
            if (name == productsInCart[i].name) {
                numberOfProduct.value = productsInCart[i].countProd;
            }
        }

        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart))

        let totalPriceOfProduct = document.createElement("p");

        function calcPrice() {
            totalPrice = price * numberOfProduct.value;
            totalPrice = totalPrice.toFixed(2)
            totalPriceOfProduct.innerText = `Total price : ${totalPrice} $`;
            return totalPriceOfProduct
        }

        function addCountProdToStorage(name) {
            let productsInCart = getInf();
            for (let i = 0; i < productsInCart.length; i++) {
                if (name == productsInCart[i].name) {
                    productsInCart[i].countProd = numberOfProduct.value;
                }
            }
            localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart))
        }

        let addProduct = document.createElement("button");
        addProduct.innerText = "+";
        addProduct.onclick = function add() {
            numberOfProduct.value++;
            addCountProdToStorage(name)
            calcPrice();
            priceForAll()
        };


        let subtractProduct = document.createElement("button");
        subtractProduct.innerText = "-";
        subtractProduct.onclick = function subtract() {
            if (numberOfProduct.value > 1) {
                numberOfProduct.value--;
                addCountProdToStorage(name)
                calcPrice()
                priceForAll();
            } else {
                numberOfProduct.value = 1;
                addCountProdToStorage(name)
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
        numberOfProduct.classList.add("numOfProd")
        subtractProduct.classList.add("col-lg-2");


        document.getElementById("busket").appendChild(allBusket);
        busketStart()
        priceForAll()
        createObjProd(name, price);
    }


    function buyFlower() {

        price = parseFloat(event.target.dataset.price);
        name = event.target.id;

        localStor(price);


        if (document.getElementsByClassName(name).length >= 1) {

            let listOfBoughtProd = document.getElementsByClassName(name);

            listOfBoughtProd[0].remove()
            busketStart();
        } else {
            createProdInCart(name, price)
        }
=======
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

    //check this
    function createObjProd(name, price) {
        let countProd = 1;
        // if (document.querySelector(".numOfProd").value != null) {
        //     countProd = document.querySelector(".numOfProd").value;
        // }

        let objOfProd = {
            name: name,
            price: price,
            countProd: countProd,
        }
        return objOfProd;
    }

    function createCartText() {

        let container = document.createElement("div");
        container.id = "emptyBusket";
        let textTeg = document.createElement("p");
        textTeg.id = "emptyBusketIcon";
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
        let totalPriceForAll = priceForAll();

        if (numberOfChild > 0) {

            priceForAll();
            let emptyCartText = document.querySelector("#emptyBusket");

            if (emptyCartText != null) {
                emptyBusket.remove();
            }
        } else {

            while (totalPriceForAll.firstChild)
                totalPriceForAll.removeChild(totalPriceForAll.firstChild);
            createCartText();
        }
    }


    function loadCart() {

        let allButtonsforBuy = document.getElementsByClassName("deliver-button");
        productsInCartText = localStorage.getItem("ProductsInCart");

        if (productsInCartText != null) {
            productsInCart = JSON.parse(productsInCartText);

            Array.from(allButtonsforBuy).forEach(element => {

                let enable = false;
                for (let i = 0; i < productsInCart.length; i++) {
                    if (element.id == productsInCart[i].name) {
                        enable = true;
                    }
                }

                if (enable == true) {
                    element.innerText = "In cart";
                    element.classList.add("deliver-button-active");
                    name = element.id;
                    price = parseFloat(element.dataset.price);
                    createProdInCart(name, price);
                }

            });
        }
    }

    window.onload = loadCart;

    function getInf() {
        let productsInCart = [];
        productsInCartText = localStorage.getItem("ProductsInCart");
        if (productsInCartText != null) {
            productsInCart = JSON.parse(productsInCartText);
        }
        return productsInCart
    }

    function localStor(price) {

        let idProd = event.target.id;
        let changeButton = document.getElementById(idProd);


        let productsInCart = getInf();

        let enable = -1;

        for (let i = 0; i < productsInCart.length; i++) {
            if (idProd == productsInCart[i].name) {
                enable = i;
            }
        }

        if (enable > -1) {
            productsInCart.splice(enable, 1);
            changeButton.innerText = `buy for ${price}$`;
            changeButton.classList.remove("deliver-button-active");
        } else {
            productsInCart.push(createObjProd(idProd, price));
            changeButton.innerText = "In cart";
            changeButton.classList.add("deliver-button-active");
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

        let productsInCart = getInf();
        for (let i = 0; i < productsInCart.length; i++) {
            if (name == productsInCart[i].name) {
                numberOfProduct.value = productsInCart[i].countProd;
            }
        }

        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart))

        let totalPriceOfProduct = document.createElement("p");

        function calcPrice() {
            totalPrice = price * numberOfProduct.value;
            totalPrice = totalPrice.toFixed(2)
            totalPriceOfProduct.innerText = `Total price : ${totalPrice} $`;
            return totalPriceOfProduct
        }

        function addCountProdToStorage(name) {
            let productsInCart = getInf();
            for (let i = 0; i < productsInCart.length; i++) {
                if (name == productsInCart[i].name) {
                    productsInCart[i].countProd = numberOfProduct.value;
                }
            }
            localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart))
        }

        let addProduct = document.createElement("button");
        addProduct.innerText = "+";
        addProduct.onclick = function add() {
            numberOfProduct.value++;
            addCountProdToStorage(name)
            calcPrice();
            priceForAll()
        };


        let subtractProduct = document.createElement("button");
        subtractProduct.innerText = "-";
        subtractProduct.onclick = function subtract() {
            if (numberOfProduct.value > 1) {
                numberOfProduct.value--;
                addCountProdToStorage(name)
                calcPrice()
                priceForAll();
            } else {
                numberOfProduct.value = 1;
                addCountProdToStorage(name)
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
        numberOfProduct.classList.add("numOfProd")
        subtractProduct.classList.add("col-lg-2");


        document.getElementById("busket").appendChild(allBusket);
        busketStart()
        priceForAll()
        createObjProd(name, price);
    }


    function buyFlower() {

        price = parseFloat(event.target.dataset.price);
        name = event.target.id;

        localStor(price);


        if (document.getElementsByClassName(name).length >= 1) {

            let listOfBoughtProd = document.getElementsByClassName(name);

            listOfBoughtProd[0].remove()
            busketStart();
        } else {
            createProdInCart(name, price)
        }
>>>>>>> update
    }