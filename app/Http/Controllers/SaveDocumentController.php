<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PDF;
use QrCode;

class SaveDocumentController extends Controller
{
    //

    public function index(Request $request){


        $data = [
            'nama'=>'ronaldo',
            'nik'=>$request->input('nik'),
            'notelp'=>'0895612344515',
            "foto_ktp"=>$request->input('foto_ktp'),
            "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate("RONALDO||"."3456789876544567")),
           ];
    
    
            $pdf = PDF::loadview('dokumen_selfie', $data);
            Storage::put('public/00895612344515.pdf', $pdf->output());
    
           return view('dokumen_selfie', $data);

        exit();
        
        // return json_encode($request->all());
        // return $request->foto_ktp->getRealPath();
        $photos = file_get_contents($request->foto_ktp->getRealPath());
        $stringImage = base64_encode($photos);
        // return $stringImage;    
        $src= 'data:'.$request->foto_ktp->getMimeType().';base64,'.$stringImage;

        // return $src;

        // // return json_encode($photos);

        // Storage::put('public/gambar.jpeg',$photos);
       $data = [
        'nama'=>'ronaldo',
        'nik'=>'1231241425126',
        'notelp'=>'0895612344515',
        "foto_ktp"=>$src,
        "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate("RONALDO||"."3456789876544567")),
       ];


        $pdf = PDF::loadview('dokumen_selfie', $data);
        Storage::put('public/00895612344515.pdf', $pdf->output());

       return 'test';
        //return view('dokumen_selfie', $data);

    }
}
