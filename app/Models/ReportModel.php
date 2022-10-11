<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use DateTime;

class ReportModel extends Model
{
    use HasFactory;

    protected $connection = 'pgsql2';

    public static function checkDatabase($data){
        // return DB::select('select * from t_jenis_kredit');
        // return DB::connection('pgsql2')->table('t_jenis_kredit')->get();

        
    }   
    public static function insertReportLoan($data, $dokumenDataDiri, $dokumenTempatUsaha ){

        $insert=[
            'id_req'=>'00895612344515',
            'nama'=>$data['nama'],
            'nik'=>$data['nik'],
            'email'=>$data['email'],

            'alamat_debitur'=>$data['alamat_debitur'],
            'nomor_telepon'=>$data['nomor_telepon1'],
            'tanggal_lahir'=>$data['tanggal_lahir'],

            'npwp'=>$data['npwp'],
            
            
            'jenis_kelamin'=>$data['jenis_kelamin'],


            'loan_period'=>$data['loan_period'],
            'plafon_dimohon'=>$data['plafon_dimohon'],

            'is_rekening'=>$data['status_kepunyaan_rekening'],
            'nama_ibu'=>$data['nama_ibu'],
            'status_kawin'=>$data['status_kawin'],

            'jenis_keperluan'=>$data['jenis_keperluan'],
            'jenis_produk_pinjaman'=>$data['jenis_produk_pinjaman'],
            'jenis_kredit'=>$data['product_id'],


            'gaji_bersih'=>$data['gaji_bersih'],
            'tujuan_guna'=>$data['tujuan_guna'],
            'kode_cabang'=>$data['kode_cabang'],
            'source_website'=>$data['source_name'],
            'gunakan_agunan'=>$data['gunakan_agunan'],
            'created_at'=>DateTime::createFromFormat('U.u', microtime(true))->format("Y-m-d h:i:s.u"),
            
            // 'kode_cabang'=>$data['nama'],

            'dokumen_datadiri'=>$dokumenDataDiri,
            'dokumen_tempatusaha'=> $dokumenTempatUsaha ,
        ];

        return DB::connection('pgsql2')->table('tbl_report_loanreg')->insert($insert);



        // return DB::select('select * from t_jenis_kredit');
        // return DB::connection('pgsql2')->table('t_jenis_kredit')->get();

        

        
    }

    


}
