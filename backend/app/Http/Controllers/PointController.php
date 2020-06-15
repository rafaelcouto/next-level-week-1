<?php

namespace App\Http\Controllers;


use App\Models\Point;
use DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class PointController extends Controller
{

    public function index(Request $request)
    {
        $query = Point::query();

        if ($request->has('city')) {
            $query->whereCity($request->get('city'));
        }

        if ($request->has('uf')) {
            $query->whereCity($request->get('uf'));
        }

        if ($request->has('items')) {
            $items = explode(",", $request->get('items'));
            array_map(fn($string) => trim($string), $items);
            $query->whereHas('items', function(Builder $query) use ($items) {
                $query->whereIn('id', $items);
            });
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $point = Point::with(['items'])->find($id);

        if (!$point) {
            return response()->json(['message' => 'Ponto de coleta não encontrado'], 400);
        }

        return response()->json($point);
    }
    
    public function create(Request $request)
    {
        DB::transaction(function () use ($request) {

            $point = new Point();
            $point->fill($request->all());
            $point->image = 'https://picsum.photos/400';
            $point->save();

            $point->items()->sync($request->get('items'));
        });

        return response()->json([
            'success' => true
        ]);
    }
}
