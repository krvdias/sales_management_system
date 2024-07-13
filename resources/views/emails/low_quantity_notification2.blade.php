<!-- resources/views/emails/low_quantity_notification.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Low Quantity Alert</title>
</head>
<body>
    <h1>Hello, {{ $user->name }}</h1>
    <p>The following materials are low in quantity:</p>
    <ul>
        @foreach ($lowQuantityMaterials as $material)
            <li>{{ $material->name }}: {{ $material->quantity }} left</li>
        @endforeach
    </ul>
</body>
</html>
