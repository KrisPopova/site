<?php
$host = 'localhost';       // Адрес хоста базы данных (например, localhost)
$username = 'root';        // Имя пользователя базы данных
$password = '';            // Пароль базы данных
$dbname = 'users';         // Имя вашей базы данных

// Создание подключения
$conn = new mysqli($host, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
