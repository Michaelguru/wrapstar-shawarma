function toggleMenu() {
    const element = document.querySelector(".navigations");
    element.classList.toggle ('visible');
}




document.addEventListener("DOMContentLoaded", function(){
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });
});


function descriptionDisplay(){
    const description = document.getElementById("item1");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
    
}

function descriptionDisplay2(){
    const description = document.getElementById("item2");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay3(){
    const description = document.getElementById("item3");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay4(){
    const description = document.getElementById("item4");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay5(){
    const description = document.getElementById("item5");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay6(){
    const description = document.getElementById("item6");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay7(){
    const description = document.getElementById("item7");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function descriptionDisplay8(){
    const description = document.getElementById("item8");
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}


function searchRelatedItem(){
    
    const input = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".item-container");
    const noResultFound = document.getElementById("noresultFound");
    items.forEach(item => {
        const itemName = item.querySelector(".itemName").textContent.toLowerCase();
        if (itemName.includes(input)) {
            item.style.display = "flex";
            noResultFound.style.display = "none";
        } else {
            item.style.display = "none";
            noResultFound.style.display = "block";
        }
    });
}





function BuyNow(itemName, price, image) {
    const phone = '2349157684983'; // Replace with Wrapstar’s WhatsApp number
    const message = `Hello Wrapstar, I would like to order:\n\n${itemName} - ₦${price.toLocaleString()}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Save the single item as last order
    const lastOrder = [{
        name: itemName,
        price: price,
        quantity: 1,
        subtotal: price,
        image: image
    }];
    localStorage.setItem('lastOrder', JSON.stringify(lastOrder));

    // Show popup suggestion after a brief delay
    setTimeout(() => {
        if (confirm("Would you like to make this your last order again next time?")) {
            alert("Order saved! You can use 'Make My Last Order' to reorder this item.");
        }
    }, 2000);

    // Open WhatsApp to send order
    window.open(url, '_blank');
}



function addToCart(itemName, price, image) {
    const cartNotification = document.getElementById('cartNotification');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1,
            subtotal: price,
            image: image
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    cartNotification.classList.add('visible');
    cartNotification.textContent = `${itemName} added to cart`;

    setTimeout(() =>{
        cartNotification.classList.remove('visible');
    }, 3000);


    const ExistingItemInCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartMessage = document.getElementById("sign");
    if (ExistingItemInCart.length > 0) {
    cartMessage.style.display = 'block';
    } else {
    cartMessage.style.display = 'none';
    }
}


const ExistingItemInCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartMessage = document.getElementById("sign");
if (ExistingItemInCart.length > 0) {
    cartMessage.style.display = 'block';
} else {
    cartMessage.style.display = 'none';
}