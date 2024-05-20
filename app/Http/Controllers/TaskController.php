<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

class TaskController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    protected $db;
    
    public function __construct() 
    {
        $db = Storage::disk("local")->get("db.json");
        $json = json_decode($db, true);
        
        // Sort de items en la BD
        $sort = $json['tareas'];
        array_multisort( array_column($sort, "priority"), SORT_ASC, $sort );

        $json['tareas'] = $sort;
        $this->db = $json;
        
        View::share('db', $this->db);
    }

    public function index()
    {
        $tasks = $this->db['tareas'];
        return view('app', ['tasks' => $tasks]);
    }

    // Función que guarda en el JSON
    private function storeBD($db) {
        $finalJson = json_encode($db, JSON_PRETTY_PRINT);
        Storage::disk('local')->put("db.json", $finalJson);
        $this->db = $db;
    }

    public function sort($choice)
    {
        $sort = $this->db['tareas'];

        array_multisort( array_column($sort, "priority"), ($choice == "true" ? SORT_ASC : SORT_DESC), $sort );

        return response()->json([
            'data' => $sort
        ], 200);

    }

    private function sortDB($choice)
    {
        $sort = $this->db['tareas'];
        array_multisort( array_column($sort, "priority"), ($choice == "true" ? SORT_ASC : SORT_DESC), $sort );
        $this->db['tareas'] = $sort;

    }

    public function addTask(Request $request) {

        // Se obtiene la DB actual
        $db = $this->db;

        if (count($db['tareas']) > 0 ){
            
            // Encontrar el ID más alto actual
            $currentMaxId = max(array_column($db['tareas'], 'id')) ?? 0;
            $newId = $currentMaxId + 1;
            // Encontrar la prioridad más alta actual
            $maxPriority = max(array_column($db['tareas'], 'priority')) ?? 0;
            $newPriority = $maxPriority + 1;
        } else {
            $newId = 1;
            $newPriority = 1;
        }
        
        $db['tareas'][] = array(
            'id' => $newId,
            'description' => $request->name,
            'priority' => $newPriority,
            'strikethrough' => false
        );

        $this->storeBD($db);
        $this->sortDB($request->order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);

    }

    public function dragSort(Request $request) {

        $db = $this->db;

        array_multisort( array_column($db['tareas'], "priority"), ($request->order == "true" ? SORT_ASC : SORT_DESC), $db['tareas'] );

        $taskId = $request->input('taskId');
        $newIndex = $request->input('newIndex');

        $key = array_search($taskId, array_column($db['tareas'], 'id'));

        $task = $db['tareas'][$key];
        $tasks = $db['tareas'];

        array_splice($tasks, $key, 1);

        array_splice($tasks, $newIndex, 0, [$task]);

        foreach ($tasks as $index => $t) {
            $key = array_search($t['id'], array_column($tasks, 'id'));
            $tasks[$key]['priority'] = $index + 1;
        }

        $db['tareas'] = $tasks;

        $this->storeBD($db);
        $this->sortDB($request->order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);

    }

    public function updateTask(Request $request) {

        $db = $this->db;

        // Se busca la tarea por el id en el JSON
        $key = array_search($request->id, array_column($db['tareas'], 'id'));

        // Se modifica la descripcion
        $db['tareas'][$key]['description'] = $request->name;

        $this->storeBD($db);
        $this->sortDB($request->order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);
    }

    public function deleteTask($id, $order) {

        $db = $this->db;

        $key = array_search($id, array_column($db['tareas'], 'id'));

        $tasks = $db['tareas'];

        array_splice($tasks, $key, 1);

        // Reasignar las prioridades para que sean consecutivas
        foreach ($tasks as $index => $t) {
            $key = array_search($t['id'], array_column($tasks, 'id'));
            $tasks[$key]['priority'] = $index + 1;
        }

        $db['tareas'] = $tasks;

        $this->storeBD($db);
        $this->sortDB($order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);
    }

    public function checkTask($id, $choice, $order)
    {
        $db = $this->db;

        // Se busca la tarea por el id en el JSON
        $key = array_search($id, array_column($db['tareas'], 'id'));

        // Se modifica la descripcion
        $db['tareas'][$key]['strikethrough'] = $choice === "true" ? true : false;

        $this->storeBD($db);
        $this->sortDB($order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);
    }

    public function deleteAll($order) {
        $db = $this->db;
        $db['tareas'] = [];
        $this->storeBD($db);
        $this->sortDB($order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);
    }

    public function reset(Request $request) {

        $db = $this->db;

        $og = Storage::disk("local")->get("original.json");
        $json = json_decode($og, true);
        
        $sort = $json['tareas'];
        array_multisort( array_column($sort, "priority"), SORT_ASC, $sort );

        $db['tareas'] = $sort;

        $this->storeBD($db);
        $this->sortDB($request->order);

        return response()->json([
            'data' => $this->db['tareas']
        ], 200);
    }
}
