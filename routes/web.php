<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\PengajuanController;
use App\Models\ReportModel;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PenggolonganWilayahController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {

//     try {
//         echo json_encode(DB::connection()->getPdo());
//     } catch (\Exception $e) {
//         die("Could not connect to the database.  Please check your configuration. error:" . $e );
//     }


//     // return view('welcome');
//     // return ('hello');
    
    
//     // return ReportModel::checkDatabase();


// });

Route::get('/',[PengajuanController::class,'create']);


Route::get('/printpdf',[DataController::class,'generatePdf']);

Route::get('/jsontoxml',[DataController::class,'jsontoxml']);

Route::get('loadkabupaten', [PenggolonganWilayahController::class,'loadKabupaten'])->name('loadkabupaten');
Route::get('loadkecamatan', [PenggolonganWilayahController::class,'loadKecamatan'])->name('loadkecamatan');
Route::get('loadkelurahan', [PenggolonganWilayahController::class,'loadKelurahan'])->name('loadkelurahan');

