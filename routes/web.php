<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/',[TaskController::class, 'index'])->name('index');

Route::get('sort/{choice}',[TaskController::class, 'sort']);
Route::post('addTask',[TaskController::class, 'addTask']);
Route::post('dragSort',[TaskController::class, 'dragSort']);
Route::put('updateTask',[TaskController::class, 'updateTask']);
Route::delete('deleteTask/{id}/{order}',[TaskController::class, 'deleteTask']);
Route::put('check/{id}/{choice}/{order}',[TaskController::class, 'checkTask']);
Route::delete('deleteAll/{order}',[TaskController::class, 'deleteAll']);
Route::put('reset',[TaskController::class, 'reset']);