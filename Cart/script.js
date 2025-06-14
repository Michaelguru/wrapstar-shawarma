window.onload = function () {
    displayCartItems();
};

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const deleteImg = '<i class="fa-solid fa-trash"></i>';
    const cartImg = '<i class="fa-solid fa-cart-shopping"></i>';
    let total = 0;

    cartContainer.innerHTML = "";

    if (!cart.length) {
        cartContainer.innerHTML = "<h1>Your Cart Is Empty!</h1>";
        document.getElementById("span").style.display = "block";
        document.getElementById('total').textContent = "Total: ₦0";
        return;
    }
    cartContainer.innerHTML = `<h1>Your Order ${cartImg} </h1>`;
    cart.forEach((item, index) => {
        
        const itemHtml = `
            <div style="border:none; margin-bottom:10px; padding:10px; justify-content:space-around;">
                <img src="../${item.image}" alt="${item.name}" width="100" />
                <p><strong>${item.name}</strong></p>
                <p>₦${item.price}</p>
                <p>${item.quantity}</p>
                <p>₦${item.subtotal}</p>
                <button onclick="removeItem(${index})" title="delete this item">${deleteImg}</button>
            </div>
        `;
        cartContainer.innerHTML += itemHtml;
        total += item.subtotal;

        localStorage.setItem("cart", JSON.stringify(cart));
    });



    const newTotal = document.getElementById('total');
    newTotal.textContent = `Total: ₦${total}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // refresh cart display
}


document.getElementById("OrderForDeliveryCheckbox").addEventListener("change", function() {
    const deliveryInfo = document.querySelector(".order-details");
    const ExtraDeliveryFees = document.getElementById('delivery-fee');
    const totalElement = document.getElementById('total');
    // Toggle the display of the delivery information based on checkbox state
    if (this.checked) {
        deliveryInfo.style.display = "block";
        const ExtraDeliveryFee = 600;
    
    if (ExtraDeliveryFees) {
        ExtraDeliveryFees.textContent = `Delivery Fee: ₦${ExtraDeliveryFee}`;
        const currentTotal = parseFloat(totalElement.textContent.replace('Total: ₦', ''));
        const newTotal = currentTotal + ExtraDeliveryFee;
        totalElement.textContent = `Total: ₦${newTotal}`;
    }
    } else {
        deliveryInfo.style.display = "none";
        window.location.href = "./"
    }
    
})



function submitOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) return alert('Cart is empty.');


    const phone = '2349157684983';
    let message = `Hello Wrapstar, I want to order:\n\n`;

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - ₦${item.subtotal}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    message += `\nTotal: ₦${total}`;

    // ✅ Check if the checkbox is checked before saving
    const saveChecked = document.getElementById('saveOrderCheckbox').checked;
    if (saveChecked) {
        localStorage.setItem('lastOrder', JSON.stringify(cart));
    } else {
        localStorage.removeItem('lastOrder'); // clear old order if unchecked
    }
    const deliveryCheckbox = document.getElementById('OrderForDeliveryCheckbox');
    if (deliveryCheckbox.checked) {
        const phone = document.getElementById('phone').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('house-address').value;
        const city = document.getElementById('Community').value;
        const state = document.getElementById('state').value;


    // Open WhatsApp with the message
    if (!phone || phone.length <= 10) {
        return alert('Please enter a valid phone number, 11 digits');
    }
    if (address === "" || city === "" || state === "" || name === "" || phone === "") {
        return alert('Please fill in all required delivery details.');
    }
    if(city.toLowerCase() !== "malete" || state.toLowerCase() !== "kwara state" ){
        return alert('Sorry we only deliver to malete, Kwara State. Kindly recheck your address');
    }

        message += `\n\nA delivery fee of ₦600 should be added \nPlease deliver to:\nName: ${name}-\nAddress: ${address} ${city} ${state} \n My Calling Nunber: ${phone}`;
    }
    else {
        message += `\nPickup at the store`;
    }
    


    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


function editUsername(){
    alert("You can edit your username in 'Make Order' page")
}

let Username = localStorage.getItem("Username");
if (!Username) {
    Username = "Guest";
}

let wecomeUser = document.getElementById("lastOrderDisplay").innerHTML = `<p"><span onclick="editUsername()" class="edit-username"> ${Username} </span ></p>`;
const style = document.createElement('style');
style.innerHTML = `
    .edit-username{
        color: blue;
        cursor: pointer;
    }
    .edit-username:hover{
        text-decoration: underline;
    }
`;
document.head.appendChild(style);


