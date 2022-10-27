<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
class TestController extends Controller
{
    //

    public function index(){
        $pdfContoh = PDF::loadview('dokumen_test');

        return $pdfContoh->stream();
        // return view('dokumen_test');
    }
}
