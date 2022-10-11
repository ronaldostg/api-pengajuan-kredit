<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use PDF;
use QrCode;
use Illuminate\Support\Facades\DB;
// use LarFormatter;
// use SoapBox\Formatter\Formatter as formatter;

// include_once '../vendor/jsontoxml/json2xml.php';



class DataController extends Controller
{
    //


    public function jsontoxml(){


        // $arr=[
            
        //     [

        //         'id'=>1,
        //         'nama'=>'ghhjvkj',
        //     ],
        //     [

        //         'id'=>2,
        //         'nama'=>'ghhjvkj',
        //     ]
        // ];
        $arr = '{"depth":false,"model":"TRX-120","width":100,"test":[{"me":null},2.5],"height":null}';
        return json_encode($arr);
        // return formatter::make($arr, formatter::JSON);;








    }

    

    public function generatePdf(){
        $checkNumberPhone = DB::select("select * from tbl_authregister where phonenbr = '082272760669'");
        return json_encode($checkNumberPhone);

        // INSERT INTO tbl_loanreg(phonenbr, nik, plafond_req, loanperiod,
        // tujuan_guna, jenis_guna, id_req, sts_req ,branchid, hasil_lain, prodid, is_agunan, time_req)

    //     $data = [
    //         'phonenbr'=>'089562754455',
    //         'nik'=>'2234312313',
    //         'plafond_req'=>'3000000000',
    //         'loanperiod'=>'12',
    //         'tujuan_guna'=>'MODAL USAHA',
    //         'jenis_guna'=>'1',
    //         'id_req'=>'1089562754455',
    //         'sts_req'=>'-5',
    //         'hasil_lain'=>'100000000',
    //         'prodid'=>'0521',
    //         'is_agunan'=>'0',
    //         'time_req'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
        
    //     ];

    //    $test =  DB::table('tbl_loanreg')->insert($data);

    //    echo $test;
        


        

        // $data=[
        //     "nama"=>"ronaldo",
        //     "nik"=>"12122343225432432",
        //     "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate("RONALDO||"."3456789876544567"))
        // ];

        // return view('dokumen_selfie', $data);
        // exit();


        // $pdf = PDF::loadview('dokumen_selfie') ;
        
        // image foto selfie
        // $pdfSelfieKTP = PDF::loadview('dokumen_selfie', $data) ;

        // $pdfFotoTempatUsaha = PDF::loadview('laporanpdf') ;

        // $pdfAgunan = PDF::loadview('laporanpdf') ;
                            
        //  return $pdf->download('anu.pdf');
        // Storage::put('public/report-credit/dokumen_selfie.pdf', $pdfSelfieKTP->output());

        //return $pdf->download('invoice.pdf');



        //generate dokumen agunan

        //generate dokumen foto tempat usaha


        //generate dokumen foto tempat usaha


        // $pdf = PDF::loadview('laporanpdf') ;
                            
        //  return $pdf->download('anu.pdf');
        //  $content = $pdf->download()->getOriginalContent();
        //  return Storage::put('public/report-credit/report_pengajuan.pdf',$content);





    }

    // public function saveToDatabase(){

    // }


    // public function saveToAuthReg(Request $request){
    //     $data = $request->loanReg;
    // }
    // public function saveToLoanReg(){
    //     $query = 'INSERT INTO tbl_loanreg(phonenbr, nik, plafond_req, loanperiod,
    //     tujuan_guna, jenis_guna, id_req, sts_req ,branchid, hasil_lain, prodid, is_agunan, time_req)';
    


    // }
}
