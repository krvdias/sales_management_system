<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
</head>
<body>
    <h1>Payment Successful</h1>
    <p>Your payment has been successfully processed.</p>
    <p><strong>Invoice Number:</strong> {{ $order->invoice_no }}</p>
    <p><strong>Amount Paid:</strong> Rs.{{ number_format($order->total_amount, 2) }}</p>
</body>
</html>
