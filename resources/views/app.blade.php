<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <title>Prueba Nex final</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            * {
                font-size: 100%;
                font-family: 'Figtree', sans-serif;
            }
        </style>
        
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body style="background-color: #ddffe3">
        <div id="main" data-tasks='{{ json_encode($tasks) }}'></div>
    </body>
</html>
