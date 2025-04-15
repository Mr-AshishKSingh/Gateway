// This file contains the JavaScript code for the payment gateway webpage.
// It handles user interactions, updates the displayed amounts, and manages dynamic content.

document.addEventListener('DOMContentLoaded', function() {
    const depositAmountInput = document.getElementById('deposit-amount');
    const depositButton = document.getElementById('deposit-button');
    const amountLeftDisplay = document.getElementById('amount-left');
    const totalDepositedDisplay = document.getElementById('total-deposited');
    const userDetailsDisplay = document.getElementById('user-details');

    let totalDeposited = 0;
    const initialAmount = 1000; // Example initial amount
    let amountLeft = initialAmount;

    // Display initial values
    amountLeftDisplay.textContent = `Amount Left: $${amountLeft}`;
    totalDepositedDisplay.textContent = `Total Deposited: $${totalDeposited}`;
    userDetailsDisplay.textContent = `User: John Doe`; // Example user details

    depositButton.addEventListener('click', function() {
        const depositAmount = parseFloat(depositAmountInput.value);
        if (!isNaN(depositAmount) && depositAmount > 0) {
            totalDeposited += depositAmount;
            amountLeft -= depositAmount;

            // Update displayed values
            totalDepositedDisplay.textContent = `Total Deposited: $${totalDeposited}`;
            amountLeftDisplay.textContent = `Amount Left: $${amountLeft}`;

            // Clear input field
            depositAmountInput.value = '';
        } else {
            alert('Please enter a valid deposit amount.');
        }
    });

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    sections.forEach((section) => {
        section.classList.add('hidden'); // Initially hidden
        observer.observe(section);
    });
});

function togglePanel() {
    const panel = document.getElementById('side-panel');
    panel.classList.toggle('open'); // Toggle the "open" class to show/hide the panel
}

function printReceipt(transactionDetails) {
    const receiptWindow = window.open('', '_blank', 'width=600,height=400');
    receiptWindow.document.write(`
        <html>
            <head>
                <title>Receipt</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #28a745;
                    }
                </style>
            </head>
            <body>
                <h1>Transaction Receipt</h1>
                <p>${transactionDetails}</p>
                <p>Thank you for using our service!</p>
            </body>
        </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();
}