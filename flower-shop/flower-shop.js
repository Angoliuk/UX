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