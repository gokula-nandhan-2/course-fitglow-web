document.addEventListener("DOMContentLoaded", function() {
    let thumbnails = document.querySelectorAll(".gallery img");
    let expandedView = document.getElementById("Expanding_view");
    let expandedImage = document.getElementById("expanded-image");
    let expandedText = document.getElementById("expanded-text");
    let closeBtn = document.getElementById("close_button");
    let prevBtn = document.getElementById("previous_button");
    let nextBtn = document.getElementById("next_button");
    let imageTitle = document.getElementById("image-title");
    let imageDescription = document.getElementById("image-description");
    let currentIndex = 0;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function() {
            currentIndex = index;
            showImage(index);
        });
    });

    closeBtn.addEventListener("click", function() {
        expandedView.style.display = "none";
    });

    prevBtn.addEventListener("click", function() {
        currentIndex = (thumbnails.length + currentIndex - 1) % thumbnails.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        showImage(currentIndex);
    });

    function showImage(index) {
        let src = thumbnails[index].getAttribute("src");
        let text = thumbnails[index].getAttribute("data-text");
        let description = thumbnails[index].getAttribute("data-description");
        expandedImage.setAttribute("src", src);
        imageTitle.innerText = text;
        imageDescription.innerText = description;
        expandedView.style.display = "flex";
    }
});



// JavaScript for dynamic customization 

document.addEventListener("DOMContentLoaded", function() {
let fontSelector = document.getElementById("font-selector");
let colorSelector = document.getElementById("color-selector");
let expandedText = document.getElementById("expanded-text");
let expandedView = document.getElementById("Expanding_view");

// Font style selector event listener
fontSelector.addEventListener("change", function() {
    let font = this.value;
    expandedText.style.fontFamily = font;
});

// Color scheme selector event listener
colorSelector.addEventListener("input", function() {
    let color = this.value;
    expandedView.style.backgroundColor = color;
});
});
