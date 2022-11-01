<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\EncryptDecryptController as edc;

class BackdoorController extends Controller
{
    //

    public function index(){
        // $decSource = edc::decrypt_aes('OAWPyd/cD5oZDF79uQ1G8A==', '3edf567hgfd345gr56jhbvfer4dfg567','1287594054376367');
        // echo $decSource;
        
        
        // $checkSource = DB::table('tbl_source_pengajuan')->where('id', '=', 1)->first();
        // echo json_encode($checkSource);
        // exit;
    }
}
