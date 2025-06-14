
function updateName(){
    const updateUsername = document.getElementById("updateUsername");
    const usernameInput = document.getElementById("usernameInput").value.toLowerCase().trim();
    if (usernameInput.length > 2) {
        updateUsername.textContent = `${usernameInput}`;
    }
}
function closePopUp(){
    document.getElementById("loginInputForUsername").style.display = 'none';
}

function submitUsernameBtn(){
    const usernameInput = document.getElementById("usernameInput").value.toLowerCase().trim();
    if (usernameInput.length > 2) {
        localStorage.setItem("Username", usernameInput);
        updateName();
        document.getElementById("loginInputForUsername").style.display = "none";
        window.location.href = './';
    } else {
        alert("Please enter a valid username (at least 3 characters).");
    }
}
function editUsername(){
    document.getElementById("loginInputForUsername").style.display = "block";
}

let Username = localStorage.getItem("Username");
if (!Username) {
    Username = "Guest";
}
document.getElementById("Order-name").innerHTML = `What Would ${Username} Like To Order?`;

let wecomeUser = document.getElementById("lastOrderDisplay").innerHTML = `<p>welcome <span onclick="editUsername()" class="edit-username"> ${Username} </span ></p> <p id="ItemExistInCart" style="display: none;"> Item in <a href="../Cart"> cart </a> </p>`;
const style = document.createElement('style');
style.innerHTML = `
    .edit-username{
        color: blue;
        cursor: pointer;
    }
    .edit-username:hover{
        text-decoration: underline;
    }
    #ItemExistInCart{
    a{
        color: blue;
        cursor: pointer;
    }}
`;
document.head.appendChild(style);

const ExistingItemInCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartMessage = document.getElementById("ItemExistInCart");
if (ExistingItemInCart.length > 0) {
    cartMessage.style.display = 'block';
} else {
    cartMessage.style.display = 'none';
}




function makeLastOrder() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    const container = document.getElementById('lastOrderDisplay');

    if (!lastOrder || !lastOrder.length) {
        container.innerHTML = "<p>No previous order saved.</p>";
        return;
    }

    let html = `<h3>Your Last Order:</h3> <button class="modal-close" onclick="closeLastOrderModal()">×</button> <ul>`;
    lastOrder.forEach(item => {
        html += `<li>${item.name} x${item.quantity} - ₦${item.subtotal}</li>`;
    });
    html += "</ul>";

    const total = lastOrder.reduce((sum, item) => sum + item.subtotal, 0);
    html += `<p><strong>Total:</strong> ₦${total}</p>`;

    // Add the buttons
    html += `
        <div style="margin-top: 15px;">
            <button onclick="buyLastOrder()">Buy Now</button>
            <button onclick="addLastOrderToCart()">Add to Cart</button>
            <button onclick="deleteLastOrder()">Delete Order</button>
        </div>
    `;

    container.innerHTML = html;
}

function buyLastOrder() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    if (!lastOrder || !lastOrder.length) {
        alert("No saved order to buy.");
        return;
    }

    const phone = '2349157684983';
    let message = `Hello Wrapstar, I want to remake this order:\n\n`;

    lastOrder.forEach(item => {
        message += `${item.name} x${item.quantity} - ₦${item.subtotal}\n`;
    });

    const total = lastOrder.reduce((sum, item) => sum + item.subtotal, 0);
    message += `\nTotal: ₦${total}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function addLastOrderToCart() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    if (!lastOrder || !lastOrder.length) {
        alert("No saved order to add.");
        return;
    }

    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    lastOrder.forEach(orderItem => {
        const existing = currentCart.find(item =>
            item.name === orderItem.name &&
            item.price === orderItem.price &&
            item.image === orderItem.image
        );

        if (existing) {
            existing.quantity += orderItem.quantity;
            existing.subtotal = existing.quantity * existing.price;
        } else {
            currentCart.push({ ...orderItem }); // copy the object
        }
    });

    localStorage.setItem('cart', JSON.stringify(currentCart));
    document.getElementById("lastOrderDisplay").textContent = ` Last Order Added To Cart ✅`
    window.location.href = '../Cart';
}

function deleteLastOrder() {
    localStorage.removeItem('lastOrder');
    document.getElementById('lastOrderDisplay').innerHTML = "<p>Last order deleted.</p>";
}
function closeLastOrderModal() {
  document.getElementById("lastOrderDisplay").innerHTML = `welcome <span onclick="editUsername()" class="edit-username"> ${Username} </span >`;
}
