<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Search locations
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {

        $searchTerm = $request->query('search');

        $districts = District::with(['regency.province'])
        ->where('reg_districts.name', 'like', "%{$searchTerm}%") // Explicit table name
        ->orWhereHas('regency', function($query) use ($searchTerm) {
            $query->where('reg_regencies.name', 'like', "%{$searchTerm}%"); // Explicit table name
        })
        ->orWhereHas('regency.province', function($query) use ($searchTerm) {
            $query->where('reg_provinces.name', 'like', "%{$searchTerm}%"); // Explicit table name
        })
        ->limit(50)
        ->get()
        ->map(function ($district) {
            return [
                'id' => $district->id,
                'kecamatan' => $district->name,
                'kota' => $district->regency->name,
                'provinsi' => $district->regency->province->name
            ];
        });

        return response()->json(['data' => $districts]);
    }
}
