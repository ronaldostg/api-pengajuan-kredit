<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\EncryptDecryptController as edc;

class PengajuanController extends Controller
{
    //

    public function create(Request $request)

    {
        // YAZQ6nMp5xUTiqTXm7PbmA==


        // qLelKbuH4dJrhybMVQYMJw== tpakd
        //OAWPyd/cD5oZDF79uQ1G8A== 99persenusahaku

        // $decSource = edc::decrypt_aes('OAWPyd/cD5oZDF79uQ1G8A==', '3edf567hgfd345gr56jhbvfer4dfg567','1287594054376367');
        // echo $request->session()->get('source_name');
        // echo $decSource;
        // $checkSource = DB::table('tbl_source_pengajuan')->where('id', '=', 1)->first();
        // echo json_encode($checkSource);
        // exit;



        $decSource = edc::decrypt_aes($request->source, '3edf567hgfd345gr56jhbvfer4dfg567', '1287594054376367');
        $checkSource = DB::table('tbl_source_pengajuan')->where('id', '=', $decSource)->first();

        if ($request->source=="") {
            
            if($request->session()->get('source_name') == ""){

                $data['errors'] = '403 | Forbidden';
                return view('maintenance', $data);
            }else{
                $dataKabupaten = DB::connection('pgsql2')->table('pembagian_wilayah')->where('provinsi', 'sumatera utara')->get();
                $listTujuanKredit = DB::connection('pgsql2')->table('tbl_tujuan_kredit')->get();
                $listKodeCabang = DB::connection('pgsql2')->table('tbl_cabang')->where('branch_name', 'not like', "%SYARIAH%")->get();
    
                
                $data = array(
                    "success" => false,
                    "items" => array()
                );
    
                // $request->session()->put('source_name', $checkSource->metadata_sumber);
                
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
    
    
                // $data['sumber']=$checkSource->metadata_sumber;
               
               if(!empty($checkSource->metadata_sumber)){
                   
                   $request->session()->put('source_name', $checkSource->metadata_sumber);
                }
               
               
                $data['sumber'] =  $request->session()->get('source_name');
    
    
    
                return view('form_kur_new_3', $data);
            }

        } else {
            if(empty($checkSource->metadata_sumber)){
                
                $data['errors'] = 'No Authorization';
                return view('maintenance', $data);

            }else{

                $dataKabupaten = DB::connection('pgsql2')->table('pembagian_wilayah')->where('provinsi', 'sumatera utara')->get();
                $listTujuanKredit = DB::connection('pgsql2')->table('tbl_tujuan_kredit')->get();
                $listKodeCabang = DB::connection('pgsql2')->table('tbl_cabang')->where('branch_name', 'not like', "%SYARIAH%")->get();
    
    
    
                $data = array(
                    "success" => false,
                    "items" => array()
                );
    
                // $request->session()->put('source_name', $checkSource->metadata_sumber);
                
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
    
    
                // $data['sumber']=$checkSource->metadata_sumber;
                $request->session()->put('source_name', $checkSource->metadata_sumber);
                $data['sumber'] = $request->session()->get('source_name');
    
    
    
                return view('form_kur_new_3', $data);
            }
        }

  
    }
}
