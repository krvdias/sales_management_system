<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
</head>
<body>
    <h1>Invoice #{{ $invoiceNumber }}</h1>

    <p><strong>Customer:</strong> {{ $auth['name'] }}</p>

    <p><strong>Date:</strong> {{ date('Y-m-d') }}</p>

    <h2>Product Details</h2>

    <p><strong>Product:</strong> {{ $material['name'] }}</p>
    <p><strong>Unit Price:</strong> Rs.{{ $material['price'] }}.00</p>
    <p><strong>Quantity:</strong> {{ $quantity }}</p>
    <p><strong>Price:</strong> {{ $material['price'] * $quantity }}</p>

    <p><strong>Delivery Charge:</strong> Rs.{{ number_format($delevary, 2) }}</p>
    <p><strong>Total Amount:</strong> Rs.{{ number_format($totalPrice, 2) }}</p>
    <p><strong>Payment Method:</strong> {{ ucfirst($payment) }}</p>
    
</body>
</html>
