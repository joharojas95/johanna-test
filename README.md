# Prueba Nex - To-Do app

## Overview

Se desarrolló una aplicación "To-Do app". Se trata de una lista de tareas que puede ser utilizada para organizar y priorizar actividades que necesitan ser completadas. Se realizaron algunas funcionalidades como:

-   Agregar nueva tarea.
-   Editar tarea existente.
-   Borrar tarea existente.
-   Tachar tareas.
-   Organizar tareas (funciona arrastrando las tareas de posición en la lista y cambia su prioridad o dandole click a las flechas de arriba o abajo).
-   Borrar todas las tareas.
-   Resetear lista de tareas.

## Tecnologías utilizadas

1. Laravel.
2. React.js junto con Material-UI.
3. Vite.

## Pre requisitos

1. PHP versión 8^.
2. Composer de Laravel v2.6^.
3. Node.js instalado.

## Instalar dependencias

1. Ejecutar `composer install`.
2. Luego, ejecutar `npm install`.

## Levantar la app

A fines de pruebas, el archivo `.env` se encuentra ya en el repositorio. Existen dos formas de levantar la app:

### Forma 1 (Assets compilados)

1. Compilar los assets con `npm run build`.
2. Levantar el servidor con `php artisan serve`.

### Forma 2 (Desarrollo)

1. Levantar el servidor de desarrollo de Laravel con `php artisan serve` en un terminal.
2. Levantar el servidor de desarrollo de Vite con `npm run dev` en otro terminal.

Luego, ingresar a http://localhost:8000

### Elaborado por: Johanna Rojas
