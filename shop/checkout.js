document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const payButton = document.querySelector(".pay-btn");

    payButton.addEventListener("click", (event) => {
        event.preventDefault();

        const address1 = document.querySelector("input[name='address1']").value.trim();
        const town = document.querySelector("input[name='town']").value.trim();
        const state = document.querySelector("input[name='state']").value.trim();
        const postalCode = document.querySelector("input[name='postalCode']").value.trim();
        const firstName = document.querySelector("input[name='firstName']").value.trim();
        const surname = document.querySelector("input[name='Surname']").value.trim();
        const phoneNo = document.querySelector("input[name='phoneNo']").value.trim();
        const email = document.querySelector("input[name='email']").value.trim();
        const cardNumber = document.querySelector("input[name='']").value.trim();
        const cardholderName = document.querySelector("input[name='']").value.trim();
        const cvc = document.querySelector("input[name='']").value.trim();
        const expiryDate = document.querySelector("input[name='']").value.trim();


        if (address1 && town && state && postalCode && firstName && surname && phoneNo && email && cardNumber && cardholderName && cvc && expiryDate) {
            alert("Payment completed successfully!");
        } else {
            alert("Please fill all the required fields(Address line 2 and 3 are optional)");
        }
    });
});



