<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenggolonganWilayahController extends Controller
{
    public function getKabupatenWilayah($kwdWilayah){

        
        $query = DB::connection('pgsql2')->select('select * from pembagian_wilayah where kode_wilayah='.$kwdWilayah);

        return strtolower($query[0]->nama_wilayah);
    }


    public function getKecamatanWilayah($kwdWilayah){

        
        $query = DB::connection('pgsql2')->select('select * from pembagian_wilayah where kode_wilayah='.$kwdWilayah);

        return $query[0]->nama_wilayah;
    }




    public function loadKabupaten(Request $request)
    {
        //
        $provinsi = $request->provinsi;

        $id_provinsi= explode("-","$provinsi");
        // return $id_provinsi[0];
        // exit();


  
        $dataProvinsi = DB::connection('pgsql2')->table('pembagian_wilayah')->where('kode_wilayah', $id_provinsi)->get();
        // $dataKabupaten = DB::table('pembagian_wilayah')->where('provinsi', $provinsi)->get();
        
        $valueProvinsi = $dataProvinsi[0]->provinsi;
        
        $kabupatenData = DB::connection('pgsql2')->table('pembagian_wilayah')->where('provinsi', $valueProvinsi)->get();

        $output = array(
            "success" => false,
            "items" => array()
        );

        foreach($kabupatenData as $dt){
            $kodeWilayah = $dt->kode_wilayah;
            if(strlen($kodeWilayah)==4){
                $output['items'][] = array(
                    'kode_wilayah' => $dt->kode_wilayah,
                    'wilayah' => $dt->nama_wilayah,
                  );
            }
        }
        $output['success'] = true;  
        // echo 'test';
        // return $output;
        foreach($output['items'] as $item){
            echo '<option value="'.$item['kode_wilayah'].'-'.$item['wilayah'].'">'.$item['wilayah'].'</option>';
        }

    }
    public function loadKecamatan(Request $request)
    {
        //
        $kabupaten = $request->kabkota;

        // ambil kode wilayahnya
        $id_kabupaten= explode("-",$kabupaten);
        
        // return $id_kabupaten[0];
        $kabupaten_temp= $this->getKabupatenWilayah($id_kabupaten[0]);



        $dataKecamatan = DB::connection('pgsql2')->table('pembagian_wilayah')->where('kab_kota','=', $kabupaten_temp)->get();
         
        
        // return $kecamatan;
        $output = array(
            "kabupaten"=>'%'.$kabupaten .'%',
            "success" => false,
            "items" => array()
        );
        foreach($dataKecamatan as $dt){
            $kodeWilayah = $dt->kode_wilayah;
            if(strlen($kodeWilayah)==6){
                $output['items'][] = array(
                    'kode_wilayah' => $dt->kode_wilayah,
                    'wilayah' => $dt->nama_wilayah,
                  );
            }
        }
        $output['success'] = true;  

        foreach($output['items'] as $item){
            echo '<option value="'.$item['kode_wilayah'].'-'.$item['wilayah'].'">'.$item['wilayah'].'</option>';
        }
            
       
    }
    public function loadKelurahan(Request $request)
    {
        //
        // $kecamatan= $this->getKecamatanWilayah($request->kelurahan);
        
        $kecamatan = $request->kelurahan;
        $id_kecamatan= explode("-",$kecamatan);
        
        // return $id_kelurahan[0];
        $kecamatan_temp= $this->getKecamatanWilayah($id_kecamatan[0]);

        // return $kecamatan_temp;


        // exit();

        $dataKelurahan = DB::connection('pgsql2')->table('pembagian_wilayah')->where('kecamatan','=', $kecamatan_temp)->get();
         
        
        // return $kecamatan;
        $output = array(
            "kabupaten"=>'%'.$kecamatan .'%',
            "success" => false,
            "items" => array()
        );
        foreach($dataKelurahan as $dt){
            $kodeWilayah = $dt->kode_wilayah;
            if(strlen($kodeWilayah)==10){
                $output['items'][] = array(
                    'kode_wilayah' => $dt->kode_wilayah,
                    'wilayah' => $dt->nama_wilayah,
                  );
            }
        }
        $output['success'] = true;  

        foreach($output['items'] as $item){
            echo '<option value="'.$item['kode_wilayah'].'-'.$item['wilayah'].'">'.$item['wilayah'].'</option>';
        }
            
       
    }


}
