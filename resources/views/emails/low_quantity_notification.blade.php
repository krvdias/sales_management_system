<!-- resources/views/emails/low_quantity_notification.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Low Quantity Alert</title>
</head>
<body>
    <h1>Hello, {{ $user->name }}</h1>
    <p>The quantity of the material <strong>{{ $material->name }}</strong> is low.</p>
    <p>Current Quantity: {{ $material->quantity }}</p>
</body>
</html>
