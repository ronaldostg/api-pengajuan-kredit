<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PDF;
use QrCode;
use App\Models\LoanModel;
use DateTime;

class GenerateDocumentController extends Controller
{




    //

    public static function generateDokumenAgunan($foto_agunan, $id_req, $phone_number,$nik){
        
        $pic_agunan = json_decode($foto_agunan);
        //$data='anu';
   
        

        for ($i=0; $i < count($pic_agunan) ; $i++) { 

            // GenerateDocumentController::generateKepemilikanAgunan($pic_agunan[$i]->fotoAgunanMenyeluruh, $i+1,$id_req,$phone_number,$nik);
            // GenerateDocumentController::generateTampilanAgunan($pic_agunan[$i]->fotoBuktiPajak, $i+1,$id_req,$phone_number,$nik);
            // GenerateDocumentController::generateBuktiBayarPBB($pic_agunan[$i]->fotoSuratAgunan, $i+1,$id_req,$phone_number,$nik);
           GenerateDocumentController::generateKepemilikanAgunan($pic_agunan[$i]->fotoSuratAgunan, $i+1,$id_req,$phone_number,$nik);
           GenerateDocumentController::generateTampilanAgunan($pic_agunan[$i]->fotoAgunanMenyeluruh, $i+1,$id_req,$phone_number,$nik);
           GenerateDocumentController::generateBuktiBayarPBB($pic_agunan[$i]->fotoBuktiPajak, $i+1,$id_req,$phone_number,$nik);
           
            
        }
        // $data=[
        //      'checkDokKepemilikan' =>$checkDokKepemilikan,
        //      'checkDokTampakAgunan' => $checkDokTampakAgunan,
        //      'checkDokBuktiBayar' =>  $checkDokBuktiBayar 
        // ];

        // return $data;
        
        
//count($pic_agunan);



        
        
    }
    // generate dokumen foto kepemilikan agunan
    public function generateKepemilikanAgunan($foto, $index,$id_req, $phone_number, $nik){

        $datas=[
            'foto_kepemilikan_agunan'=>$foto,
            'id_req'=>'0000000000'.$index,
            "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate($phone_number."||".$nik)),
       
        ];

        // return $datas['foto_kepemilikan_agunan'];
        // die();
        $pdf = PDF::loadview('dokumen_kepemilikan_agunan', $datas);

        Storage::put('public/'.$id_req.'/'.$id_req.'_100032_'.$index.'.pdf', $pdf->output());
        

        if (function_exists('curl_file_create')) { // php 5.5+
            $cFile = curl_file_create(public_path('storage/'.$id_req.'/'.$id_req.'_100032_'.$index.'.pdf'));
          } else { // 
            $cFile = '@' . realpath(public_path('storage/'.$id_req.'/'.$id_req.'_100032_'.$index.'.pdf'));
          }

          $dataDocReg = [
            'idcond'=>'100032',
            'docfilename'=>$id_req.'_100032_'.$index.'.pdf',
            'docsts'=>'0',
            'ststime'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            'id_req'=>$id_req,
            'userid'=>$phone_number,

        ];

        $insertDocReg = LoanModel::insertDocRegister($dataDocReg, $id_req);
        
        $postData = [
            'id_req'=>$id_req,
            // 'file_debitur'=>public_path('storage/00895612344515/00895612344515_100031.pdf')
            'file_debitur'=>$cFile
            // 'file_debitur'=>$file_debitur
        ];


        $headers = array("Content-Type:multipart/form-data"); 
            
        $ch = curl_init(); 
        // set url 
        curl_setopt($ch, CURLOPT_URL, "http://localhost/adminappraisal/apisavedoc");
        curl_setopt($ch, CURLOPT_HEADER, false);

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    

        curl_setopt($ch, CURLOPT_POST,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,300);
        curl_setopt($ch, CURLOPT_TIMEOUT,300);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

        // $output contains the output string 
        $output = curl_exec($ch); 
        // tutup curl 
        curl_close($ch);   
        




    }

    // generate dokumen foto tampilan agunan
    
    public function generateTampilanAgunan($foto, $index,$id_req, $phone_number, $nik){
        $datas=[
            'foto_tampilan_agunan'=>$foto,
            'id_req'=>'0000000000'.$index,
            "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate($phone_number."||".$nik)),
       
        ];


        $pdf = PDF::loadview('dokumen_tampak_agunan', $datas);
        Storage::put('public/'.$id_req.'/'.$id_req.'_100011_'.$index.'.pdf', $pdf->output());

        
        if (function_exists('curl_file_create')) { // php 5.5+
            $cFile = curl_file_create(public_path('storage/'.$id_req.'/'.$id_req.'_100011_'.$index.'.pdf'));
          } else { // 
            $cFile = '@' . realpath(public_path('storage/'.$id_req.'/'.$id_req.'_100011_'.$index.'.pdf'));
          }

          $dataDocReg = [
            'idcond'=>'100011',
            'docfilename'=>$id_req.'_100011_'.$index.'.pdf',
            'docsts'=>'0',
            'ststime'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            'id_req'=>$id_req,
            'userid'=>$phone_number,

        ];

        $insertDocReg = LoanModel::insertDocRegister($dataDocReg, $id_req);
        
        $postData = [
            'id_req'=>$id_req,
            // 'file_debitur'=>public_path('storage/00895612344515/00895612344515_100031.pdf')
            'file_debitur'=>$cFile
            // 'file_debitur'=>$file_debitur
        ];


        $headers = array("Content-Type:multipart/form-data"); 
            
        $ch = curl_init(); 
        // set url 
        curl_setopt($ch, CURLOPT_URL, "http://localhost/adminappraisal/apisavedoc");
        curl_setopt($ch, CURLOPT_HEADER, false);

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    

        curl_setopt($ch, CURLOPT_POST,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,300);
        curl_setopt($ch, CURLOPT_TIMEOUT,300);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

        // $output contains the output string 
        $output = curl_exec($ch); 
        // tutup curl 
        curl_close($ch);   
        


        
    }

    //generate dokumen foto pembayaran pajak pbb agunan
    public function generateBuktiBayarPBB($foto, $index,$id_req, $phone_number, $nik){
        $datas=[
            'foto_bukti_bayar_agunan'=>$foto,
            'id_req'=>'0000000000'.$index,
            "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate($phone_number."||".$nik)),
       
        ];
    
        $pdf = PDF::loadview('dokumen_bayar_pbb_agunan', $datas);


        Storage::put('public/'.$id_req.'/'.$id_req.'_100010_'.$index.'.pdf', $pdf->output());

        if (function_exists('curl_file_create')) { // php 5.5+
            $cFile = curl_file_create(public_path('storage/'.$id_req.'/'.$id_req.'_100010_'.$index.'.pdf'));
          } else { // 
            $cFile = '@' . realpath(public_path('storage/'.$id_req.'/'.$id_req.'_100010_'.$index.'.pdf'));
          }

          $dataDocReg = [
            'idcond'=>'100010',
            'docfilename'=>$id_req.'_100010_'.$index.'.pdf',
            'docsts'=>'0',
            'ststime'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            'id_req'=>$id_req,
            'userid'=>$phone_number,

        ];

        $insertDocReg = LoanModel::insertDocRegister($dataDocReg, $id_req);
        
        $postData = [
            'id_req'=>$id_req,
            // 'file_debitur'=>public_path('storage/00895612344515/00895612344515_100031.pdf')
            'file_debitur'=>$cFile
            // 'file_debitur'=>$file_debitur
        ];


        $headers = array("Content-Type:multipart/form-data"); 
            
            $ch = curl_init(); 
            // set url 
            curl_setopt($ch, CURLOPT_URL, "http://localhost/adminappraisal/apisavedoc");
            curl_setopt($ch, CURLOPT_HEADER, false);
    
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            // return the transfer as a string 
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        
    
            curl_setopt($ch, CURLOPT_POST,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,300);
            curl_setopt($ch, CURLOPT_TIMEOUT,300);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

            // $output contains the output string 
            $output = curl_exec($ch); 
            // tutup curl 
            curl_close($ch);   
        
        
    }
}
