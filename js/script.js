var Orders = [
    {
        id: "1",
        OrderInfo: {
            createdAt: "10.08.1991",
            customer: "Alfreds Futterkiste",
            status: "Accepted",
            shippedAt: "8.09.1991"
        },
        ShipTo: {
            name: "Maria Anders",
            Address: "Obere Str. 57",
            ZIP: "12209",
            Region: "Germany",
            Country: "Germany"
        },
        CustomerInfo: {
            firstName: "Maria",
            lastName: "Anders",
            address: "Obere Str. 57",
            phone: "030-0074321",
            email: "Maria.Anders@company.com"
        },
        products: [
            {
                id: "1",
                name: "Chai",
                price: "18",
                currency: "EUR",
                quantity: "2",
                totalPrice: "36"
            },
            {
                id: "2",
                name: "Aniseed Syrup",
                price: "10",
                currency: "USD",
                quantity: "3",
                totalPrice: "30"
            },
            {
                id: "3",
                name: "Chef Anton's Cajun Seasoning",
                price: "22",
                currency: "USD",
                quantity: "2",
                totalPrice: "44"
            },
            {
                id: "4",
                name: "Chef Anton's Gumbo Mix",
                price: "36",
                currency: "EUR",
                quantity: "21",
                totalPrice: "756"
            },
            {
                id: "5",
                name: "Grandma's Boysenberry Spread",
                price: "25",
                currency: "USD",
                quantity: "5",
                totalPrice: "125"
            }
        ]
    },
    {
        id: "2",
        OrderInfo: {
            createdAt: "23.12.2006",
            customer: "Bon app",
            status: "Pending",
            shippedAt: "13.02.2007"
        },
        ShipTo: {
            name: "Laurence Lebihan",
            Address: "12, rue des Bouchers",
            ZIP: "13008",
            Region: "France",
            Country: "France"
        },
        CustomerInfo: {
            firstName: "Laurence",
            lastName: "Lebihan",
            address: "12, rue des Bouchers",
            phone: "91.24.45.40",
            email: "Laurence.Lebihan@company.com"
        },
        products: [
            {
                id: "1",
                name: "Queso Cabrales",
                price: "21",
                currency: "EUR",
                quantity: "5",
                totalPrice: "105"
            },
            {
                id: "2",
                name: "Queso Manchego La Pastora",
                price: "38",
                currency: "EUR",
                quantity: "3",
                totalPrice: "114"
            },
            {
                id: "3",
                name: "Pavlova",
                price: "120",
                currency: "RUB",
                quantity: "5",
                totalPrice: "600"
            },
            {
                id: "4",
                name: "Sir Rodney's Marmalade",
                price: "5",
                currency: "BYN",
                quantity: "3",
                totalPrice: "15"
            },
            {
                id: "5",
                name: "Genen Shouyu",
                price: "40",
                currency: "USD",
                quantity: "7",
                totalPrice: "280"
            },
            {
                id: "6",
                name: "Tofu",
                price: "23.25",
                currency: "USD",
                quantity: "1",
                totalPrice: "23.25"
            },
            {
                id: "7",
                name: "Alice Mutton",
                price: "32",
                currency: "UAH",
                quantity: "39",
                totalPrice: "1248"
            }
        ]
    }
];

var orderHistory = document.getElementById('order-history');

Orders.forEach(function (order) {
    var orderTemplate = createOrderTemplate(order);

    orderHistory.appendChild(orderTemplate);
});

var allOrders = document.getElementsByClassName("order");
allOrders[0].classList.add('active');

var activeOrder = getActiveOrder();

fillActiveOrderData(activeOrder);

var iconTruck = document.getElementById('icon-truck');
iconTruck.addEventListener('click', activeTruckSection);

var iconPerson = document.getElementById('icon-person');
iconPerson.addEventListener('click', activeCustomerSection);

var orders = document.getElementsByClassName('order');

for (var i = 0; i < orders.length; i++) {
    orders[i].addEventListener('click', showActiveOrderData);
}

function showActiveOrderData() {
    var orders = document.getElementsByClassName('order');

    for (var i = 0; i < orders.length; i++) {
        orders[i].classList.remove('active');
    }

    this.classList.add('active');

    fillActiveOrderData(getActiveOrder());
}

function fillActiveOrderData(activeOrder) {
    var orderNumber = document.getElementById('order-desc-number');
    orderNumber.innerHTML = 'Order ' + activeOrder.id;

    var customer = document.getElementById('order-customer');
    customer.innerHTML = 'Customer: ' + activeOrder.OrderInfo.customer;

    var orderCreated = document.getElementById('order-created');
    orderCreated.innerHTML = 'Ordered: ' + activeOrder.OrderInfo.createdAt;

    var orderShipped = document.getElementById('order-shipped');
    orderShipped.innerHTML = 'Shipped: ' + activeOrder.OrderInfo.shippedAt;

    var shippingName = document.getElementById('shipping-name');
    shippingName.innerHTML = activeOrder.ShipTo.name;

    var shippingAddress = document.getElementById('shipping-address');
    shippingAddress.innerHTML = activeOrder.ShipTo.Address;

    var shippingZIP = document.getElementById('shipping-zip');
    shippingZIP.innerHTML = activeOrder.ShipTo.ZIP + ', ' + activeOrder.ShipTo.Region;

    var shippingRegion = document.getElementById('shipping-region');
    shippingRegion.innerHTML = activeOrder.ShipTo.Region;

    var shippingCountry = document.getElementById('shipping-country');
    shippingCountry.innerHTML = activeOrder.ShipTo.Country;

    var customerFirstName = document.getElementById('customer-firstname');
    customerFirstName.innerHTML = activeOrder.CustomerInfo.firstName;

    var customerLastName = document.getElementById('customer-lastname');
    customerLastName.innerHTML = activeOrder.CustomerInfo.lastName;

    var customerAddress = document.getElementById('customer-address');
    customerAddress.innerHTML = activeOrder.CustomerInfo.address;

    var customerPhone = document.getElementById('customer-phone');
    customerPhone.innerHTML = activeOrder.CustomerInfo.phone;

    var customerEmail = document.getElementById('customer-email');
    customerEmail.innerHTML = activeOrder.CustomerInfo.email;

    var sum = 0;

    activeOrder.products.forEach(function (product) {
        sum += parseInt(product.totalPrice);
    });

    var totalPrice = document.getElementById('total-price');
    totalPrice.innerHTML = String(sum);

    var productsDescWrapper = document.getElementById('products-desc-wrapper');

    var productsTable = createProductsTable(activeOrder);

    productsDescWrapper.innerHTML = '';
    productsDescWrapper.appendChild(productsTable);
}

function activeTruckSection() {
    var orderShippingInfo = document.getElementById('order-shipping-info'),
        orderCustomerInfo = document.getElementById('order-customer-info'),
        iconTruck = document.getElementById('icon-truck'),
        iconPerson = document.getElementById('icon-person');

    if (!orderShippingInfo.classList.contains('active')) {
        orderShippingInfo.classList.add('active');
    }

    if (orderCustomerInfo.classList.contains('active')) {
        orderCustomerInfo.classList.remove('active');
    }

    if (!iconTruck.classList.contains('active')) {
        iconTruck.classList.add('active');
    }

    if (iconPerson.classList.contains('active')) {
        iconPerson.classList.remove('active');
    }
}

function activeCustomerSection() {
    var orderShippingInfo = document.getElementById('order-shipping-info'),
        orderCustomerInfo = document.getElementById('order-customer-info'),
        iconTruck = document.getElementById('icon-truck'),
        iconPerson = document.getElementById('icon-person');

    if (!orderCustomerInfo.classList.contains('active')) {
        orderCustomerInfo.classList.add('active');
    }

    if (orderShippingInfo.classList.contains('active')) {
        orderShippingInfo.classList.remove('active');
    }

    if (!iconPerson.classList.contains('active')) {
        iconPerson.classList.add('active');
    }

    if (iconTruck.classList.contains('active')) {
        iconTruck.classList.remove('active');
    }
}

function getActiveOrder() {
    var activeOrder = document.querySelector('.order.active');
    var activeOrderID = activeOrder.id.substring(6);

    activeOrder = Orders.find(function (order) {
        return order.id === activeOrderID;
    });

    return activeOrder;
}

function createOrderTemplate(order) {
    var template = document.createElement('div');
    template.id = 'order-' + order.id;
    template.className = 'order';

    var innerContainer = document.createElement('div');
    innerContainer.className = 'inner-container';

    template.appendChild(innerContainer);

    var orderNumber = document.createElement('h3');
    orderNumber.className = 'order-number';
    orderNumber.innerHTML = 'Order ' + order.id;

    innerContainer.appendChild(orderNumber);

    var orderDetails = document.createElement('div');
    orderDetails.className = 'order-details';

    innerContainer.appendChild(orderDetails);

    var orderCustomer = document.createElement('p');
    orderCustomer.className = 'order-customer';
    orderCustomer.innerHTML = order.OrderInfo.customer;

    orderDetails.appendChild(orderCustomer);

    var orderShippingDate = document.createElement('p');
    orderShippingDate.className = 'order-shipping-date';
    orderShippingDate.innerHTML = 'Shipped: ' + order.OrderInfo.shippedAt;

    orderDetails.appendChild(orderShippingDate);

    var deliveryDetails = document.createElement('div');
    deliveryDetails.className = 'delivery-details';

    innerContainer.appendChild(deliveryDetails);

    var deliveryCreated = document.createElement('p');
    deliveryCreated.className = 'delivery-created';
    deliveryCreated.innerHTML = order.OrderInfo.createdAt;

    deliveryDetails.appendChild(deliveryCreated);

    var deliveryStatus = document.createElement('p');
    deliveryStatus.className = 'delivery-status';
    deliveryStatus.innerHTML = order.OrderInfo.status;

    deliveryDetails.appendChild(deliveryStatus);

    return template;
}

function createProductsTable(activeOrder) {
    var productsTable = document.createElement('table');
    productsTable.className = 'products-table';

    var tableRow = document.createElement('tr');
    tableRow.className = 'table-row';

    productsTable.appendChild(tableRow);

    var firstCellTitle = document.createElement('th');
    firstCellTitle.className = 'cell-title col-1';
    firstCellTitle.innerHTML = 'Product';

    tableRow.appendChild(firstCellTitle);

    var secondCellTitle = document.createElement('th');
    secondCellTitle.className = 'cell-title col-2';
    secondCellTitle.innerHTML = 'Unit Price';

    tableRow.appendChild(secondCellTitle);

    var thirdCellTitle = document.createElement('th');
    thirdCellTitle.className = 'cell-title clo-3';
    thirdCellTitle.innerHTML = 'Quantity';

    tableRow.appendChild(thirdCellTitle);

    var fourthCellTitle = document.createElement('th');
    fourthCellTitle.className = 'cell-title col-4';
    fourthCellTitle.innerHTML = 'Total Price';

    tableRow.appendChild(fourthCellTitle);

    activeOrder.products.forEach(function (product) {
        var newTableRow = document.createElement('tr');
        newTableRow.className = 'table-row';

        productsTable.appendChild(newTableRow);

        var firstCellDesc = document.createElement('td');
        firstCellDesc.className = 'col-1';

        newTableRow.appendChild(firstCellDesc);

        var productName = document.createElement('span');
        productName.className = 'prdct-name';
        productName.innerHTML = product.name;

        firstCellDesc.appendChild(productName);

        var productCode = document.createElement('span');
        productCode.className = 'prdct-code';
        productCode.innerHTML = product.id;

        firstCellDesc.appendChild(productCode);

        var secondCellDesc = document.createElement('td');
        secondCellDesc.className = 'col-2';

        newTableRow.appendChild(secondCellDesc);

        var productPrice = document.createElement('span');
        productPrice.className = 'prdct-price';
        productPrice.innerHTML = product.price;

        secondCellDesc.appendChild(productPrice);

        var productCurrency = document.createElement('span');
        productCurrency.className = 'prdct-currency';
        productCurrency.innerHTML = ' ' + product.currency;

        secondCellDesc.appendChild(productCurrency);

        var thirdCellDesc = document.createElement('td');
        thirdCellDesc.className = 'col-3';

        newTableRow.appendChild(thirdCellDesc);

        var productQuantity = document.createElement('span');
        productQuantity.className = 'prdct-quantity';
        productQuantity.innerHTML = product.quantity;

        thirdCellDesc.appendChild(productQuantity);

        var fourthCellDesc = document.createElement('td');
        fourthCellDesc.className = 'col-4';

        newTableRow.appendChild(fourthCellDesc);

        var productTotalPrice = document.createElement('span');
        productTotalPrice.className = 'prdct-total-price';
        productTotalPrice.innerHTML = product.totalPrice;

        fourthCellDesc.appendChild(productTotalPrice);

        var finalCurrency = document.createElement('span');
        finalCurrency.className = 'prdct-currency';
        finalCurrency.innerHTML = ' ' + product.currency;

        fourthCellDesc.appendChild(finalCurrency);

    });

    return productsTable;
}
