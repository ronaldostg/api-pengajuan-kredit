<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PDF;
use Illuminate\Support\Facades\Storage;
use App\Models\LoanModel;
use Illuminate\Support\Facades\DB;
use QrCode;
use DateTime;
use App\Http\Controllers\GenerateDocumentController as generateDokumen;
use App\Models\ReportModel;

class SendToAppraisalController extends Controller
{


    public function cekDataPenting(Request $request){
        $notelp =str_replace("-", "", $request->input('notelp'));
        $nik = $request->input('nik');

        $res = [];
 
        $checkNoTelp = DB::table('tbl_authregister')->where('phonenbr', '=', $notelp)->get();
        
        if(count($checkNoTelp)>0){
            // $res = [];
            $res['rc']= '01';
            $res['status']= 'Nomor telepon anda sudah terdaftar di pengajuan sebelumnya';
            return $res;
            die();
        }
        
        $checkNIK = DB::table('tbl_authregister')->where('nik', '=', $nik)->get();
        if(count($checkNIK)>0){
            // $res = [];
            $res['rc']= '01';
            $res['status']= 'Nomor NIK anda sudah terdaftar di pengajuan sebelumnya';
            // die();
            return $res;
            die();
        }
        
        
    }

   

    public function clusterassign(Request $request){

        $provinsi = explode("-",$request->input('provinsi'));
        $kabupaten = explode("-",$request->input('kabupaten'));
        $kecamatan = explode("-",$request->input('kecamatan'));
        $kelurahan = explode("-",$request->input('kelurahan'));

        $kodeClusterKhusus=[
            '21'=>'370',
            '31'=>'350'
        ];

        $clusterCode = '';
        if(array_key_exists($provinsi[0], $kodeClusterKhusus)){
            $clusterCode = $kodeClusterKhusus[$provinsi[0]];
        }else{

            $where = [
                'nama_prop'=> strtoupper($provinsi[1]),
                'nama_kabkota'=>strtoupper($kabupaten[1]),
                'nama_kec'=>strtoupper($kecamatan[1]),
                'nama_keldes'=>strtoupper($kelurahan[1])
            ];
    
    
            //return json_encode($where);
    
            $getCluster = DB::table('cfg_wilayah')->where($where)->first();
            $clusterCode= $getCluster->kode_klaster;
        }

        return $clusterCode;


    }
    //

    public function index(Request $request){

        $phoneNbr = str_replace("-", "", $request->input('nomor_telepon1'));
        $phoneNbr2 = str_replace("-", "", $request->input('nomor_telepon2'));
        $plafon_dimohon = str_replace(".", "",$request->input('plafon_dimohon'));
        $gaji_bersih = str_replace(".", "", $request->input('gaji_bersih'));
        


        $data = [
            'nama'=>$request->input('nama_debitur'),
            'nik'=>$request->input('nomor_nik'),
            'email'=>$request->input('email'),
            'alamat_debitur'=>$request->input('alamat_debitur'),
            'nomor_telepon1'=>$phoneNbr,
            'nomor_telepon2'=>$phoneNbr2,
            'tanggal_lahir'=>$request->input('tanggal_lahir'),
            'npwp'=>$request->input('npwp'),
            'jenis_kelamin'=>$request->input('jenis_kelamin'),
 
            'loan_period'=>$request->input('loan_period'),
            'plafon_dimohon'=>$plafon_dimohon,
 
            'status_kepunyaan_rekening'=>$request->input('status_kepunyaan_rekening'),
            'norek_bs'=>$request->input('norek_bs'),
            'nama_ibu'=>$request->input('nama_ibu'),
            'status_kawin'=>$request->input('status_kawin'),
            
            'jenis_keperluan'=>$request->input('jenis_keperluan'),
            'jenis_produk_pinjaman'=>$request->input('jenis_produk_pinjaman'),
            'product_id'=>$request->input('product_id'),
            'gaji_bersih'=>$gaji_bersih,
 
            'tujuan_guna'=>$request->input('tujuan_guna'),

            'kode_cabang'=>$request->input('kode_cabang'),
            'gunakan_agunan'=>$request->input('gunakan_agunan'),
            
            
            'source_name'=>$request->input('source_name'),

            
            

        ];

        $cekNoTelpDaftar = DB::table('tbl_authregister')->where('nik','=',$request->input('nomor_nik'))->first();

        
        if($cekNoTelpDaftar!=null){
            
            // $changeData=[
            //     'nohp'=>$phoneNbr
            // ];
            // DB::table('tbl_authregister')->where('nik','=',$request->input('nomor_nik'))->update($changeData);

            $phoneNbr = $cekNoTelpDaftar->phonenbr;
            $data['nomor_telepon1'] = $cekNoTelpDaftar->phonenbr;
            $data['nik'] = $cekNoTelpDaftar->nik;
        }else{

            $checkAuthreg= DB::select("select * from tbl_authregister where phonenbr='".$phoneNbr."'");
            
            if((count($checkAuthreg) == 0)){
                $insertAuthReg = LoanModel::insertToAuthReg($data);
                
            }
        }



        // return json_encode($data);
        // // ReportModel::insertReportLoan($data);

        // exit();

        $res = [];


   

        $id_req ="";

        // cek apakah data pengajuan sudah diproses atau belum
        // $checkSamePhone = DB::select("SELECT * FROM tbl_loanreg where phonenbr = '".$phoneNbr."' and sts_req= '-5' ");
        $checkLoanReg = DB::select("SELECT * FROM tbl_loanreg where phonenbr = '".$phoneNbr."' and sts_req= '-5' ");
      

        if(count($checkLoanReg)>0){

            // return 'ada data yang belum diproses';
            // $id_req = "";
            $res['rc']= '01';
            $res['status']= 'Ada data pengajuan anda yang belum diproses';
            return $res;
            exit();

        }else{

            // return 'lakukan inser';
            // exit();


            $checkInsertLoan= DB::select("SELECT * FROM tbl_loanreg where phonenbr = '".$phoneNbr."'");
            
            if(count($checkInsertLoan)>0){
                foreach($checkInsertLoan as $index => $ck){
    
                    $id_req = ($index+1) .$phoneNbr;
                }
                // return json_encode($id_req);
                // exit();
                
            }else{
                $id_req = "0".$phoneNbr;
                
                // exit();

            }

            
            
            // $insertLoanReg = LoanModel::insertToLoanReg($data, $id_req);
        }
        // return $id_req;

        // if($cekNoTelpDaftar!=null){
            
        //     // $changeData=[
        //     //     'nohp'=>$phoneNbr
        //     // ];
        //     // DB::table('tbl_authregister')->where('nik','=',$request->input('nomor_nik'))->update($changeData);

            
        // }

       
       
        $insertLoanReg = LoanModel::insertToLoanReg($data, $id_req);
       

        

        $insertHistProcess = LoanModel::insertToHistProcess($data, $id_req);
        // $insertHistProcess = LoanModel::insertToHistProcess($data, $id_req);

        // kirim dokumen ke appraisal
        // dokumen data diri
        $fotoKTP = file_get_contents($request->foto_selfie_ktp->getRealPath());
        $fotoTandaTangan = file_get_contents($request->foto_tanda_tangan->getRealPath());
        
        //dokumen tempat usaha
        $fotoTempatUsaha = file_get_contents($request->foto_tempat_usaha->getRealPath());   
       
        $stringImageKTP = base64_encode($fotoKTP);
        $stringImageTandaTangan = base64_encode($fotoTandaTangan);

        //string foto tempat usaha
        $stringImageTempatUsaha = base64_encode($fotoTempatUsaha);



        $srcSelfieKTP= 'data:'.$request->foto_selfie_ktp->getMimeType().';base64,'.$stringImageKTP;
        $srcTandaTangan= 'data:'.$request->foto_tanda_tangan->getMimeType().';base64,'.$stringImageTandaTangan;

        $srcTempatUsaha= 'data:'.$request->foto_tanda_tangan->getMimeType().';base64,'.$stringImageTempatUsaha;


       $pdfData = [
        'nama'=>$request->input('nama_debitur'),
        'nik'=>$request->input('nomor_nik'),
        'notelp'=>$phoneNbr,
        "foto_ktp"=>$srcSelfieKTP,
        "foto_tempat_usaha"=>$srcTempatUsaha,
        "e_signature"=>$srcTandaTangan,
        "qrcode"=>base64_encode(QrCode::format('svg')->size(300)->errorCorrection('H')->generate($id_req."||".$request->input('nomor_nik'))),
       ];



    //    generate dan simpan folder ke local
        $pdfDataDiri = PDF::loadview('dokumen_selfie', $pdfData);


        $pdfTempatUsaha = PDF::loadview('dokumen_tempat_usaha', $pdfData);


        $namaDokDataDiri = $id_req.'_100031.pdf';
        $namaDokTempatUsaha = $id_req.'_100027.pdf';
        
        

        // simpan data foto data diri
        Storage::put('public/'.$id_req.'/'.$namaDokDataDiri, $pdfDataDiri->output());
        // simpan data foto tempat usaha
        Storage::put('public/'.$id_req.'/'.$namaDokTempatUsaha, $pdfTempatUsaha->output());

        $resData=[];

        if($request->input('gunakan_agunan')=='1'){
            $insertToTableAgunan = LoanModel::insertToAgunanTable($request->input('agunan'), $id_req);
            // $insertToTableAgunan = Genera::insertToAgunanTable($request->input('agunan'), $id_req);
            
            $createDocumentAgunan =  GenerateDocumentController::generateDokumenAgunan($request->input('foto_agunan'), $id_req, $phoneNbr,$request->input('nomor_nik')); 
            // $resData['dok_agunan'] = $createDocumentAgunan; 
        }
        
        $resData = [
            'dok_data_diri'=>  $this->copyDokumeDataDiri($id_req, $phoneNbr),
            'dok_tempat_usaha'=>$this->copyDokumenTempatUsaha($id_req, $phoneNbr)
        ];

        $dataReplyWA = []; 
        
        // select * from tbl_authreg where id_req = "" and 

        // $checkDataWA = collect(DB::select("select * from tbl_authregister where 
        // phonenbr='".$phoneNbr."' OR 
        // nik='".$request->input('nik')."' OR 
        // mailaddr='".$request->input('email')."'"))->first();

        $checkDataWA =collect(DB::select("select lrg.branchid, ath.username, lrg.id_req, lrg.nik
        from tbl_loanreg lrg
        left join tbl_authregister ath
        on lrg.nik = ath.nik
        where lrg.id_req='".$id_req."'"))->first();
        
        if($dataReplyWA == null){
            $dataReplyWA = [
                'id_req'=>$id_req,
                'nama_debitur'=>$request->input('nama_debitur'),
                'kode_cabang'=>$request->input('kode_cabang'),
                'no_hp'=>$phoneNbr,
                'email'=>$request->input('email')
            ];
        }else{
            $dataReplyWA = [
                'id_req'=>$id_req,
                'nama_debitur'=>$checkDataWA->username,
                'kode_cabang'=>$checkDataWA->branchid,
                'no_hp'=>$checkDataWA->phonenbr,
                'email'=>$checkDataWA->mailaddr
            ];
        }

        
       
        $res['rc']= '00';
        $res['data_pengaju']= $dataReplyWA;
        $res['status']= 'Berhasil kirim Data Pengajuan';
        return $res;

       

    }



    public function copyDokumeDataDiri($id_req, $phoneNbr){
        if (function_exists('curl_file_create')) { // php 5.5+
            $cFile = curl_file_create(public_path('storage/'.$id_req.'/'.$id_req.'_100031.pdf'));
          } else { // 
            $cFile = '@' . realpath(public_path('storage/'.$id_req.'/'.$id_req.'_100031.pdf'));
          }

          $dataDocReg = [
            'idcond'=>'100031',
            'docfilename'=>$id_req.'_100031.pdf',
            'docsts'=>'0',
            'ststime'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            'id_req'=>$id_req,
            'userid'=>$phoneNbr,

        ];

        $insertDocReg = LoanModel::insertDocRegister($dataDocReg, $id_req);
        
        $postData = [
            'id_req'=>$id_req,
            // 'file_debitur'=>public_path('storage/00895612344515/00895612344515_100031.pdf')
            'file_debitur'=>$cFile
            // 'file_debitur'=>$file_debitur
        ];



            // do sent document to appraisal
            
            // $headers = array("Content-Type:multipart/form-data"); 
            
            // $ch = curl_init(); 
            // // set url 
            // curl_setopt($ch, CURLOPT_URL, "http://localhost/adminappraisal/apisavedoc");
            // curl_setopt($ch, CURLOPT_HEADER, false);
    
            // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            // // return the transfer as a string 
            // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        
    
            // curl_setopt($ch, CURLOPT_POST,1);
            // curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            
            // curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,300);
            // curl_setopt($ch, CURLOPT_TIMEOUT,300);
            // curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

            // // $output contains the output string 
            // $output = curl_exec($ch); 
            // // tutup curl 
            // curl_close($ch);    
            
        

        
    }

    public function copyDokumenTempatUsaha($id_req, $phoneNbr){
        if (function_exists('curl_file_create')) { // php 5.5+
            $cFile = curl_file_create(public_path('storage/'.$id_req.'/'.$id_req.'_100027.pdf'));
          } else { // 
            $cFile = '@' . realpath(public_path('storage/'.$id_req.'/'.$id_req.'_100027.pdf'));
          }


          $dataDocReg = [
            'idcond'=>'100027',
            'docfilename'=>$id_req.'_100027.pdf',
            'docsts'=>'0',
            'ststime'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            'id_req'=>$id_req,
            'userid'=>$phoneNbr,

        ];

        $insertDocReg = LoanModel::insertDocRegister($dataDocReg, $id_req);
        
        $postData = [
            'id_req'=>$id_req,
            // 'file_debitur'=>public_path('storage/00895612344515/00895612344515_100031.pdf')
            'file_debitur'=>$cFile
            // 'file_debitur'=>$file_debitur
        ];


        // do sent document to appraisal
            
        // $headers = array("Content-Type:multipart/form-data"); 
            
        // $ch = curl_init(); 
        // // set url 
        // curl_setopt($ch, CURLOPT_URL, "http://localhost/adminappraisal/apisavedoc");
        // curl_setopt($ch, CURLOPT_HEADER, false);

        // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // // return the transfer as a string 
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    

        // curl_setopt($ch, CURLOPT_POST,1);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        
        // curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,300);
        // curl_setopt($ch, CURLOPT_TIMEOUT,300);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

        // // $output contains the output string 
        // $output = curl_exec($ch); 
        // // tutup curl 
        // curl_close($ch);   
    }


}
