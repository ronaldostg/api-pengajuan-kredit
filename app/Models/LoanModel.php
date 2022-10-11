<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use DateTime;

class LoanModel extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    public static function insertToAgunanTable($data, $id_req){
        // perkiraanNilaiAgunan
        // insert to database
        $agunan = json_decode($data);

        $res = [];
        for ($i=0; $i <count($agunan) ; $i++) { 

            $provinsi = explode("-",$agunan[$i]->provinsiAgunan);
            $kabupaten = explode("-",$agunan[$i]->kabupatenAgunan);
            $kecamatan = explode("-",$agunan[$i]->kecamatanAgunan);
            $kelurahan = explode("-",$agunan[$i]->kelurahanAgunan);
            
            // return 'insert into';
            $res[$i]['id_req'] = $id_req;
            $res[$i]['collateraldesc'] = $agunan[$i]->nomorSuratAgunan;
            $res[$i]['clusterassign'] = $agunan[$i]->clusterAssign;
            
            $res[$i]['collateralsts'] = 1;
            
            // str_replace("-", "", $request->input('nomor_telepon1'));

            $res[$i]['collateralamt'] =  str_replace(".", "", $agunan[$i]->perkiraanNilaiAgunan);



            $res[$i]['collateraladdr'] = $agunan[$i]->alamatAgunan;
            $res[$i]['collateraltype'] = 1;

            $res[$i]['luas_tanah'] = $agunan[$i]->luasTanahAgunan;
            $res[$i]['luas_bangunan'] = $agunan[$i]->luasBangunanAgunan;
          
            // $res[$i]['collateralprov'] = $agunan[$i]->provinsiAgunan;  
            // $res[$i]['collateralcity'] = $agunan[$i]->kabupatenAgunan;
            // $res[$i]['collateralkec'] = $agunan[$i]->kecamatanAgunan;
            // $res[$i]['collateralkel'] = $agunan[$i]->kelurahanAgunan;
            $res[$i]['collateralprov'] = $provinsi[0];  
            $res[$i]['collateralcity'] = $kabupaten[0];
            $res[$i]['collateralkec'] = $kecamatan[0];
            $res[$i]['collateralkel'] = $kelurahan[0];
          
            // $res[$i]['clusterassign'] = 0;
            
            $res[$i]['stsappraisal'] = 8;
            $res[$i]['kdjnsdocagunan'] = $agunan[$i]->jenisDokumenAgunan;
 

        }
        DB::table('tbl_agunan')->insert($res);

        // return ($res);
        // return 'test';
        // return count($agunan);
        // exit();



    }

    public static function insertToAuthReg($data)
    {


        $tempData = [
            'username' => $data['nama'],
            'mailaddr' => $data['email'],
            
            // 'phonenbr' => str_replace("-", "", $data['nomor_telepon1']),
            'phonenbr' => str_replace("-", "", $data['nomor_telepon1']),
            'userpasswd' => bcrypt($data['nomor_telepon1']),
            // 'userpasswd' => "",

            
            'usersts' => 1,
            'nama_ibu' => $data['nama_ibu'] == '' ? "" : $data['nama_ibu'],
            'tgl_lahir' => $data['tanggal_lahir'],
            'lattitude' => "0.00",
            'longitude' => "0.00",
            'nik' => $data['nik'],
            
            
            'register_time' => DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),



            'no_kk' =>"",
            'jenis_kel' => $data['jenis_kelamin'],
            'alamat' => $data['alamat_debitur'],
            'sts_kawin' => $data['status_kawin'] == '' ? "" : $data['status_kawin'],
            'npwp' => $data['npwp'],
            'nohp' => str_replace("-", "", $data['nomor_telepon1']),
            'stswhitelisted' => "0",
        ];


        $checkInsert =  DB::table('tbl_authregister')->insert($tempData);

        // return $tempData;

        return $checkInsert;
        
    }

    public static function insertToLoanReg($data, $id_req)
    {



        $tempData = [
            'phonenbr' => $data['nomor_telepon1'],

            'nik' => $data['nik'],

            'plafond_req' => $data['plafon_dimohon'],
            'gaji_bersih' => $data['gaji_bersih'],
            'loanperiod' => $data['loan_period'],

            'tujuan_guna' => $data['tujuan_guna'],

            'jenis_guna' => $data['jenis_keperluan'],

            'id_req' => strval($id_req),
            'sts_req' => "-5",
            'branchid' => $data['kode_cabang'],
            // 'branchid' => '100',
            'hasil_lain' => 0,
            'prodid' => $data['product_id'],
            'is_agunan' => $data['gunakan_agunan'],
            'sumber_pengajuan' => $data['source_name'],

            'time_req' => DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
        ];


        $checkInsert =  DB::table('tbl_loanreg')->insert($tempData);






        return $checkInsert;
    }


    public static function insertToHistProcess($data, $id_req)
    {
        $data = [
            'id_req' => $id_req,
            //diambil dari nomor telepon
            'userid' => $data['nomor_telepon1'],
            'reqsts' => '-5',
            //diambil dari nik
            'username' => $data['nik'],
            'descr' => "Permohonan ke Bank Sumut",
            'ststime' => DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),

        ];

        $checkInsert = DB::table('hist_process')->insert($data);

        return $checkInsert;
    }



    public static function insertDocRegister($data){
        $checkInsert = DB::table('tbl_docregister')->insert($data);

        return $checkInsert;
    }



    public static function insertToAgunan($data,$id_req)
    {

        $agunan = json_decode($data);

        $res = [];
        for ($i=0; $i <count($agunan) ; $i++) { 
            
            // $res[$i]['id_req'] = $id_req;
            // $res[$i]['id_req'] = "anu";
       
            $res[$i]['collateraldesc'] = $agunan[$i]->nomorSuratAgunan;
            $res[$i]['collateralsts'] = 1;
        //     $res[$i]['collateralamt'] = $agunan[$i]->perkiraanNilaiAgunan;
        //     $res[$i]['collateraladdr'] = $agunan[$i]->alamatAgunan;
        //     $res[$i]['collateraltype'] = 1;

        //     $res[$i]['luas_tanah'] = $agunan[$i]->luasTanahAgunan;
        //     $res[$i]['luas_bangunan'] = $agunan[$i]->luasBangunanAgunan;
          
        //     $res[$i]['collateralprov'] = $agunan[$i]->provinsiAgunan;  
        //     $res[$i]['collateralcity'] = $agunan[$i]->kabupatenAgunan;
        //     $res[$i]['collateralkec'] = $agunan[$i]->kecamatanAgunan;
        //     $res[$i]['collateralkel'] = $agunan[$i]->kelurahanAgunan;
          
        //     $res[$i]['clusterassign'] = 0;
            
        //     $res[$i]['stsappraisal'] = 8;
        //     $res[$i]['kdjnsdocagunan'] = $agunan[$i]->jenisDokumenAgunan;
        // //     $res[$i]['collateralamt'] = $id_req;
           
        //     $res[$i]['collateraladdr'] = $id_req;
        //     $res[$i]['collateraltype'] = $id_req;
        //     $res[$i]['luas_tanah'] = $id_req;
           
        //     $res[$i]['luas_bangunan'] = $id_req;
        //     $res[$i]['collateralprov'] = $id_req;
        //     $res[$i]['collateralcity'] = $id_req;
        //     $res[$i]['collateralkec'] = $id_req;
        //     $res[$i]['collateralkel'] = $id_req;
            
        //     $res[$i]['collateralassign'] = $id_req;
        //     $res[$i]['stsappraisal'] = $id_req;
        //     $res[$i]['kdjnsdocagunan'] = $id_req;
        }

        return count($agunan);
        exit();



        // return $agunan;

        // $checkInsert =  DB::table('tbl_agunan')->insert($data);

        //  return ($agunan);

        // INSERT INTO tbl_agunan(id_req, collateraldesc, collateralamt, collateraladdr, 
        //collateralmap,
        // collateraltype, luas_tanah, luas_bangunan, collateralprov, collateralcity, 
        // collateralkec, collateralkel, clusterassign,stsappraisal,kdjnsdocagunan)
        // $data = [];
        // foreach($agunan as $index => $ag){
        //     $data = [
        //         'id_req' => $id_req,
        //         'collateraldesc' => $ag->nomorSuratAgunan,
        //         'collateralamt' => $ag->nomorSuratAgunan,
        //         'collateraladdr' => $ag->alamatAgunan,
        //         // 'collateralmap' => $ag->nomorSuratAgunan,

        //         'collateraltype' => $ag->jenisAgunan,
        //         'luas_tanah' => $ag->luasTanahAgunan,
        //         'luas_bangunan' => $ag->luasBangunanAgunan,
                
        //         'collateralprov' => $ag->nomorSuratAgunan,
        //         'collateralcity' => $ag->nomorSuratAgunan,
        //         'collateralkec' => $ag->nomorSuratAgunan,
        //         'collateralkel' => $ag->nomorSuratAgunan,

        //         'collateralassign' => $ag->nomorSuratAgunan,
        //         'stsappraisal' => $ag->nomorSuratAgunan,
        //         'kdjnsdocagunan' => $ag->jenisDokumenAgunan,
        //     ];
        // }


      
    }
}
