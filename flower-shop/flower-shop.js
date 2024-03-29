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

    function buyFlower(name, flower, price) {


        let imageOfProduct = document.createElement("img");
        imageOfProduct.src = flower.src;


        let nameOfProduct = document.createElement("p");
        let nameOfProductText = document.createTextNode(name);
        nameOfProduct.appendChild(nameOfProductText);


        let priceForOne = document.createElement("p");
        let priceForOneText = document.createTextNode("price for one :" + price + "$");
        priceForOne.appendChild(priceForOneText);


        let numberOfProduct = document.createElement("input");
        numberOfProduct.disabled = true;
        numberOfProduct.value = 1;


        let addProduct = document.createElement("button");
        let addProductText = document.createTextNode("+");
        addProduct.appendChild(addProductText);
        addProduct.onclick = function add() {
            numberOfProduct.value++;
        };


        let subtractProduct = document.createElement("button");
        let subtractProductText = document.createTextNode("-");
        subtractProduct.appendChild(subtractProductText);
        subtractProduct.onclick = function add() {
            if (numberOfProduct.value > 0) {
                numberOfProduct.value--;
            } else {
                numberOfProduct.value = 0;
            }
        };


        let numberOfProductBlock = document.createElement("div");
        numberOfProductBlock.appendChild(subtractProduct);
        numberOfProductBlock.appendChild(numberOfProduct);
        numberOfProductBlock.appendChild(addProduct);


        let totalPriceOfProduct = document.createElement("div");
        let totalPriceOfProductText = document.createElement("p")
        let TotalPriceText = document.createTextNode("Total price : ");
        totalPriceOfProductText.appendChild(TotalPriceText);
        totalPriceOfProduct.appendChild(totalPriceOfProductText);


        let busket = document.createElement("div");
        busket.appendChild(nameOfProduct);
        busket.appendChild(priceForOne);
        busket.appendChild(numberOfProductBlock);
        busket.appendChild(totalPriceOfProduct);


        let allBusket = document.createElement("div");
        allBusket.appendChild(imageOfProduct);
        allBusket.appendChild(busket);


        allBusket.className += "row product-in-busket";
        imageOfProduct.classList.toggle("col-lg-6");
        busket.classList.toggle("col-lg-6");
        busket.classList.toggle("row");
        nameOfProduct.classList.toggle("col-lg-12");
        priceForOne.classList.toggle("col-lg-12");
        numberOfProductBlock.classList.toggle("col-lg-12");
        addProduct.classList.toggle("col-lg-2");
        numberOfProduct.classList.toggle("col-lg-8");
        subtractProduct.classList.toggle("col-lg-2");


        document.getElementById("busket").appendChild(allBusket);


        let startBusket = document.getElementById("busketHidden");
        let startTotalPrice = document.getElementById("totalPrice");
        let startBusketText = document.getElementById("emptyBusket");
        let startTotalPriceText = document.createTextNode("Total Price for all : ")
        if (startBusket.contains(startBusketText)) {
            startBusketText.remove();
        } else {
            return;
        }
        if (!startTotalPrice.contains(startTotalPriceText)) {
            document.getElementById("totalPrice").appendChild(startTotalPriceText);
        } else {
            return;
        }



        window.flowers.addToDB(name, price, numberOfProduct.value);
    }

    (function(w){
        let dbName = "CartDB";
        let requestDB = window.indexedDB.open(dbName);
        let db = null;
        
        requestDB.onupgradeneeded = function () {
            console.log('I was called');
            db = requestDB.result;
            store = db.createObjectStore('product', { keyPath: 'nameOfProduct'});
        };

        requestDB.onsuccess = function () {
            db = requestDB.result;
        };

        requestDB.onerror = function () {
            alert("Error,something went wrong!");
        };

        w.flowers = {
            getStore: function() {
                return db.transaction(["product"], "readwrite").objectStore('product');
            },
            addToDB: async function(name, price, numberOfProduct) {
                store = this.getStore();
                await store.put({
                    nameOfProduct: name,
                    priceForOne: +price,
                    numberOfProduct: +numberOfProduct
                })
            },
            removeItem: async function(productName) {
                await this.getStore().delete(productName);
            },
            updateItem: async function(productName, value) {
                let transaction = db.transaction(['product'], 'readwrite');
                let store = transaction.objectStore('product');
                let eObject = await store.get(productName);
                eObject.onsuccess = async function() {
                    e = eObject.result;
                    e.numberOfProduct = +value;
                    console.log(e);
                    await store.put(e);
                };
            }
        }
    })(window)