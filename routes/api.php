<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\SaveDocumentController;
use App\Http\Controllers\SendToAppraisalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',

], function () {

    // Route::post('insert-pengajuan', [SendToAppraisalController::class, 'index']);

    // Route::post('/save-document', [SaveDocumentController::class, 'index']);
    Route::post('/save-document', [SendToAppraisalController::class, 'index']);

    Route::post('/fetch-clusterassign', [SendToAppraisalController::class, 'clusterassign']);

    Route::post('/cek-data-penting', [SendToAppraisalController::class, 'cekDataPenting']);


    Route::post('/check-dukcapil', [ApiController::class, 'checkDukcapil']);


    Route::post('/check-nohp', [ApiController::class, 'checkNohp']);



    Route::post('/kirim-otp', [OtpController::class, 'kirimOTP']);
    Route::post('/check-otp', [OtpController::class, 'checkotp']);


    Route::post('/kirim-otp-final', [OtpController::class, 'kirimOTP']);
    Route::post('/check-otp-final', [OtpController::class, 'checkotp']);

    Route::post('/send-success-pengajuan', [ApiController::class, 'sendSuccessPengajuan']);


    Route::post('/cek-nik-email', [ApiController::class, 'cekNikEmail']);
    
    Route::post('/inquery-nik-notelp', [ApiController::class, 'inqueryNIKnotelp']);
    Route::get('load-produk-kredit', [ApiController::class, 'loadJenisKredit']);
    
    Route::post('/cek-nohp-pengajuan', [ApiController::class, 'cekPengajuanByNoHP']);
    

});
