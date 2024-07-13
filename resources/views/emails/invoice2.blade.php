<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
</head>
<body>
    <h1>Invoice #{{ $order->invoice_no }}</h1>

    <p><strong>Customer:</strong> {{ $auth }}</p>

    <p><strong>Date:</strong> {{ $order->created_at->format('d/m/Y') }}</p>
    <p><strong>Total Amount:</strong> Rs.{{ number_format($totalAmount - $deliveryCharge, 2) }}</p>
    <p><strong>Delivery Charge:</strong> Rs.{{ number_format($deliveryCharge, 2) }}</p>
    <p><strong>Payment Method:</strong> {{ ucfirst($order->payment) }}</p>

    <h2>Order Items:</h2>
    <ul>
        @foreach($items as $item)
            <li>
                <strong>{{ $item['name'] }}</strong><br>
                Quantity: {{ $item['quantity'] }}<br>
                Unit Price: Rs.{{ number_format($item['unit_price'], 2) }}<br>
                Total: Rs.{{ number_format($item['unit_price'] * $item['quantity'], 2) }}
            </li>
        @endforeach
    </ul>

    <h3>Total Price: Rs.{{ number_format($totalAmount, 2) }}</h3>
</body>
</html>
