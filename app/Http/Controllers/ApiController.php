<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;


class ApiController extends Controller
{


    public function cekNikEmail(Request $request){
        // nik:($('#nik').val()),
        // email:($('#email').val()),

        $res=[];
        $nik = $request->input('nik');
        $email = $request->input('email');
        $nohp =str_replace("-", "", $request->input('nohp'));
     

        $checkData = collect(DB::select("select * from tbl_authregister where 
        phonenbr='".$nohp."' OR 
        nik='".$nik."' OR 
        mailaddr='".$email."'"))->first();

        if($checkData == null){
            
            $res['rc'] = '00';
            $res['status'] = 'belum dipakai sama sekali';
            $res['data'] = [];
            
        }else{
            $res['rc'] = '01';
            $res['status'] = 'NIK, EMAIL DAN Nomor HP sudah dipakai';
            $res['data'] = $checkData;
    
        }


        return $res;


    }

    public function checkNohp(Request $request)
    {
        $nohp = $request->input('nohp');
        $checkAuthreg = DB::select("select * from tbl_authregister where phonenbr='" . $nohp . "'");


        $res = [];

        if (count($checkAuthreg) > 0) {
            $res['rc'] = '00';
            $res['status'] = 'Nomor telepon anda sudah digunakan. Silahkan mengganti nomor telepon lain. ';
        } else {
            $res['rc'] = '01';
            $res['status'] = 'Nomor telepon belum pernah terdaftar';
        }
        return $res;
        // return $checkAuthreg
        // return 'test';

    }
    //
    public function checkDukcapil(Request $request)
    {
        // $checkNIKdiDatabase = DB::table('tbl_authregister')->where('nik', '=', $request->input('nik'))->first();
        // $checkNIK = DB::select("select * from tbl_authregister where nik='".$request->input('nik')."'");;


        $res = [];


        // // return json_encode($checkNIK);
        // if ($checkNIKdiDatabase != null) {
        //     $res['rc'] = '02';
        //     $res['data'] = $checkNIKdiDatabase;
        //     $res['message'] = 'Maaf , NIK anda telah digunakan untuk daftaran pengajuan ';
        // } else {
            $tglLahir = $request->input('tgl_lahir');
            $postData = [
                'NIK' => $request->input('nik'),
                'NAMA_LGKP' => $request->input('nama'),
                'TGL_LHR' => date("d-m-Y", strtotime($tglLahir))  
            ];


            // return $postData;
            // exit();

            $headers = array("Content-Type:application/json");

            $ch = curl_init();
            // set url 
            curl_setopt($ch, CURLOPT_URL, "192.168.3.57/banksumut_interface/index.php/ektp/query_ktp_new");
            curl_setopt($ch, CURLOPT_HEADER, false);

            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            // return the transfer as a string 
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
            curl_setopt($ch, CURLOPT_TIMEOUT, 300);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

            // $output contains the output string 
            $output = curl_exec($ch);
            // tutup curl 
            curl_close($ch);

            $result =  json_decode($output);

            // return json_encode($result);
            // exit();

      


            if (array_key_exists('NIK', $result->content[0])) {
                // echo "Key exists!";
                if (($result->content[0]->NIK == 'Sesuai') && (explode(" ", $result->content[0]->NAMA_LGKP)[0] == 'Sesuai') && ($result->content[0]->TGL_LHR == 'Sesuai')) {

                    $res['rc'] = '00';
                    $res['message'] = 'NIK dan Nama Anda terdaftar di dukcapil';
                } else {
                    $res['rc'] = '01';
                    $res['message'] = 'Mohon isi NIK, NAMA, DAN TANGGAL LAHIR anda sesuai KTP';
                }
            } else {
                $res['rc'] = '01';
                $res['message'] = ' Mohon isi NIK anda sesuai KTP';
            }
        // }

        // return json_encode($res);
        return $res;
    }
    // nama:res.data_pengaju.nama_debitur,
    // kode_pengajuan:res.data_pengaju.id_req,
    // nama_cabang:res.data_pengaju.nama_cabang

    public function sendSuccessPengajuan(Request $request)
    {

        $nama = $request->input('nama');
        $kode_pengajuan = $request->input('kode_pengajuan');
        $kode_cabang = $request->input('kode_cabang');
        $no_hp = $request->input('no_hp');
        $email = $request->input('email');

        $isiPesanWA = [];
        $data = [];

        $nama_cabang = DB::table('cfg_brnch')->where('branchid', '=', $kode_cabang)->first();

        if ($no_hp != "") {

            $isiPesanWA = [
                "nama" => $nama,
                "kode_pengajuan" => $kode_pengajuan,
                "nama_cabang" => $nama_cabang->branchnm,
                "no_hp" => $no_hp,


            ];
            $data['contact']['sendwatelp1'] = $this->sendWASuccessPengajuan($isiPesanWA);
        }



        if ($email != "") {
            $isiPesanEmail = [
                "nama" => $nama,
                "kode_pengajuan" => $kode_pengajuan,
                "nama_cabang" => $nama_cabang->branchnm,
                "no_hp" => $no_hp,

            ];

            $data['contact']['email'] = $this->sendEmailSuccessPengajuan($email, $isiPesanEmail);
        }


        $data['message'] = "berhasil dikirim";
        $data['rc'] = "00";


        return json_encode($data);
    }

    function sendWASuccessPengajuan($data)
    {
        $url_wa  = "http://192.168.3.75/wa_api/index.php/";


        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
        );

        $isi_pesan = "Terima Kasih atas kepercayaan Anda telah menggunakan fasilitas Bank Sumut . 
       Berikut adalah data Pengajuan Kredit Bank Sumut :  
       \n Nama Pengaju: " . $data['nama'] .
            "\n\n Nama Cabang  : " . $data['nama_cabang'] .
            "\n\n Kode Pengajuan  : " . $data['kode_pengajuan'] .
            "\n\n Untuk tahapan proses pengajuan selanjutnya , silahkan menuju ke kantor cabang yang tercantum";
        $message = $isi_pesan;
        // file_get_contents($url_wa."send_message_static_get?kd_id=002&auth_key=aUth_0Key_Waa_(ApI)&no_wa=".$no_wa1."&text=".urlencode($isi_pesan), false, stream_context_create($arrContextOptions));
        file_get_contents($url_wa . "send_message_static_get?kd_id=013&auth_key=aUth_0Key_Waa_(ApI)&no_wa=" . $data['no_hp'] . "&text=" . urlencode($message), false, stream_context_create($arrContextOptions));

        return 'Success Send Wa';
    }

    function sendEmailSuccessPengajuan($email, $data)
    {
        require base_path("vendor/autoload.php");
        $mail = new PHPMailer;

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        //$mail->SMTPDebug = 2;                             // Enable verbose debug output
        $mail->isSMTP();                                    // Set mailer to use SMTP
        $mail->Host = '192.168.3.80';                       // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                             // Enable SMTP authentication      
        $mail->Username = 'admin_ests@banksumut.co.id';     // SMTP username
        $mail->Password = 'B4nk$03mut001';
        $mail->SMTPSecure = 'tls';                          // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                  // TCP port to connect to
        $from = "admin_ests@banksumut.co.id";

        // $mail->Host = 'mailvip.banksumut.co.id';              // Specify main and backup SMTP servers
        // $mail->SMTPAuth = true;                               // Enable SMTP authentication
        // $mail->Username = 'payment@banksumut.co.id';          // SMTP username
        // $mail->Password = 'BanksumutOK2022';                  // SMTP password
        // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        // $mail->Port = 587;                                    // TCP port to connect to
        // $from = "payment@banksumut.co.id";


        $from_label = "No-Reply";
        $subject = "Bukti Pengajuan Kredit Bank Sumut";
        $url = '';

        $mail->setFrom($from, $from_label);
        $mail->addAddress($email);
        // $mail->addAddress('sitanggang761@gmail.com');
        // $mail->addAddress('utarianggita@students.usu.ac.id');
        $mail->isHTML(true);
        $mail->Subject = $subject;
        // $dataViewEmail['otp'] = $otp; 
        $html = view('email.emailsuccess', $data);
        // $html = 'halo';
        $mail->Body    = $html;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->SMTPDebug = 0;


        if (!$mail->send()) {

            //  return  $mail->ErrorInfo;
            // echo json_encode($mail->ErrorInfo);
            $emailResponse = json_encode($mail->ErrorInfo);
            // return $data->email;
        } else {
            // echo 'Success to send email';
            $emailResponse = 'Success to send email';
            // return $data->email;

        }

        return $emailResponse;
    }



    public function inqueryNIKnotelp(Request $request){
        
        $res = [];
        $nik = $request->input('nik');
        $nohp = str_replace("-", "", $request->input('nohp'));
     
        $cekNIK = DB::table('tbl_authregister')->where('nik','=',$nik)->get();

        $cekNohp = DB::table('tbl_authregister')->where('phonenbr','=',$nohp)->get();



        // jika nik diubah , lakukan ganti data hanya ubah nohpz                                                 
        if(count($cekNIK)>0){

            $res['rc']='01';
            // $res['data']=$request->all();
            $res['message'] ='NIK ANDA sudah tersimpan di database. Apakah anda yakin untuk lanjutkan pengajuan ?';
            $res['data'] =$cekNIK[0];

        }else{
            // $res['rc']='02';
            // $res['data']=$request->all();
            // $res['message']='NIK BELUM DIGUNAKAN';
            if(count($cekNohp)>0){
                $res['rc']='02';
                // $res['data']=[];
                $res['message'] = 'Maaf , Nomor HP yang anda isi telah digunakan ';
            }else{
                $res['rc']='00';
                // $res['data']=[];
                $res['message'] = 'lakukan insert ke ddatabse';
            }
            
        }

        // $res['nik'] = $nik;
        // $res['nohp']  = $nohp;


        return $res;

    }

    public function loadJenisKredit(Request $request){
        
        $idJenis = $request->idJenis;

        $res=[];
        $query = '';
        if ($idJenis == '1'){
            $query = "SELECT * from cfg_produk where prodname LIKE '%INV%' and prodname NOT LIKE '%KMG%' AND prodname NOT LIKE '%PMG%' OR prodname LIKE '%INVERSTASI%' OR prodname LIKE '%SPRMIKRO%' and prodname NOT LIKE '%MDL KERJA%' or prodname like '%KPR%'
            ";
        }else if($idJenis == '2'){
            $query = "SELECT * from cfg_produk where prodname LIKE '%MDL KERJA%' and prodname NOT LIKE '%KMG%' OR prodname LIKE '%MODAL KERJA%' AND prodname NOT LIKE '%PMG%' OR prodname LIKE '%KRD USAHA%'";
            
        }
        // $res['data'] = DB::select($query);

        // $data['data']=$query;
        
        // return json_encode(DB::select($query));


        // $data = DB::connection('pgsql2')->select('select * from t_jenis_kredit where type_keperluan = '.$idJenis);
        $data = DB::select($query);

        // foreach($data as $dt){
        //     echo '<option value="0'.$dt->credit_id.'-'.$dt->persen.'-'.$dt->nama_kredit.'">'.$dt->nama_kredit.'</option>';
        // }
        foreach($data as $dt){
            echo '<option value="'.$dt->prodid.'-'.$dt->intrate.'-'.$dt->prodname.'">'.$dt->prodname.' - '.$dt->intrate.' % p.a'.'</option>';
        }


    } 

    public function cekPengajuanByNoHP(Request $request){
        $phoneNbr = str_replace("-", "", $request->input('nohp'));

        // return $phoneNbr;
        // exit;


        $checkLoanReg = DB::select("SELECT * FROM tbl_loanreg where phonenbr = '".$phoneNbr."' and sts_req= '-5' ");
        
        $data = [];
        if(count($checkLoanReg)>0){
            $data['rc']='01';
            $data['message']='Anda Masih Memiliki Permohonan Dalam Proses';
            
        }else{
            $data['rc']='00';
            $data['message']='Berhasil';

        }

        return $data;
    }

}
