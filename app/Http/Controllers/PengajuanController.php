<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class PengajuanController extends Controller
{
    //

    public function create(Request $request)
    
    {
        $sumber = '';

        if($request->source!=''){
            // echo 'gak kosong variabel source nya';
            if($request->session()->get('source_name') !=""){
            
            
                // $sumber = $request->session()->get('source_name');
                $request->session()->put('source_name', $request->source);
                
                $sumber = $request->session()->get('source_name');
            }else{
                // echo 'kosong';
                
                $request->session()->put('source_name', $request->source);
                $sumber = $request->session()->get('source_name');
            }
            
        }else{

            $sumber =$request->session()->get('source_name'); 
        }


       $dataKabupaten = DB::connection('pgsql2')->table('pembagian_wilayah')->where('provinsi', 'sumatera utara')->get();
        $listTujuanKredit = DB::connection('pgsql2')->table('tbl_tujuan_kredit')->get();
        $listKodeCabang= DB::connection('pgsql2')->table('tbl_cabang')->get();

        // echo json_encode($dataKabupaten);
        // exit;

        // echo json_encode($listTujuanKredit);

        $data = array(
            "success" => false,
            "items" => array()
        );
        foreach ($dataKabupaten as $dt) {
            $kodeWilayah = $dt->kode_wilayah;
            if (strlen($kodeWilayah) == 4) {
                $data['data_kabupaten'][] = array(
                    'kode_wilayah' => $dt->kode_wilayah,
                    'wilayah' => $dt->nama_wilayah,
                );
            }
        }
        $data['listTujuanKredit'] = $listTujuanKredit;
        $data['listKodeCabang'] = $listKodeCabang;

        $data['sumber']=$sumber;
        // foreach($listTujuanKredit as $ltk){

        // $kodeWilayah = $dt->kode_wilayah;
        // if(strlen($kodeWilayah)==4){
        //     $data['data_kabupaten'][] = array(
        //         'kode_wilayah' => $dt->kode_wilayah,
        //         'wilayah' => $dt->nama_wilayah,
        //       );
        // }
        // }
        // $data['']

        // $data['success'] = true;  


        // return $data;


        return view('form_kur_new_3', $data);
        // return view('form_kur', $data);
    }

}
