<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Facades\DB;

class OtpController extends Controller
{
    //


    public function kirimOTP(Request $request){


        $data = [];
        $otp = mt_rand(100000, 999999);

        $nohp = str_replace("-", "", $request->input('nohp'));
        $nik = $request->input('nik');
        $email = $request->input('email');

        $cekNoTelpDaftar = DB::table('tbl_authregister')->where('nik','=',$nik)->first();


        $nohpOTP = $cekNoTelpDaftar != null ? $cekNoTelpDaftar->nohp :$nohp;
        //$emailOTP = $cekNoTelpDaftar != null ? $cekNoTelpDaftar->mailaddr :$email;
        
        if ($nohpOTP == "" || $nohpOTP == null){
            $data['message'] = "Mohon Masukkan No Telepon Anda";
            $data['rc'] = "01";
            $data['no_hp'] = $nohpOTP;
            // $data['kode_otp'] = null;
            // $data['kode_otp'] = null;
        }else{
            Cache::put('otp_key_' . $nohpOTP , $otp, 300);

            if ($nohpOTP != "") {
                $data['contact']['sendwatelp1'] = $this->sendToWA($nohpOTP, $otp);
            }

            if ($email!= "") {
                $data['contact']['sendwaemail'] = $this->sendToEmail($email, $otp);
                
            }
            $data['message'] = "berhasil dikirim";
            $data['rc'] = "00";
            $data['no_hp'] = $nohpOTP;
        }
        // echo $nohpOTP;

        return json_encode($data);

    }




    public function checkotp(Request $request)
    {
        // echo json_encode(Cache::getStore());

        $nohp = str_replace("-", "", $request->input('nohp'));
        $nik = $request->input('nik');
        // $email = $request->input('email');

        $cekNoTelpDaftar = DB::table('tbl_authregister')->where('nik','=',$nik)->first();

        $nohpOTP = $cekNoTelpDaftar != null ? $cekNoTelpDaftar->nohp :$nohp;
        



        $realOTP  = Cache::get('otp_key_' . $nohpOTP);
        $data = [];


        if (strlen($request->kodeKirim) == 0) {
            $data['message'] = "Mohon Isi Kode OTP anda";
            $data['rc'] = "01";
        } else if (strlen($request->kodeKirim) < 6) {
            // echo ;
            $data['message'] = "Kode OTP wajib 6 karakter";
            $data['rc'] = "02";
        } else if (strlen($request->kodeKirim) > 6) {
            // echo "Kode OTP yang dikirm lebih dari 6 karakter";
            $data['message'] = "Kode OTP yang dikirim lebih dari 6 karakter";
            $data['rc'] = "03";
        } else {
            if ($request->kodeKirim != $realOTP) {
                // echo "Maaf, Kode OTP yang dikirim salah";
                $data['message'] = "Maaf, Kode OTP yang dikirim salah";
                $data['kode'] = $realOTP;
                $data['rc'] = "04";
                // $data['otp']=$realOTP;
            } else {
                $data['message'] = "Selamat, Kode OTP yang dikirim benar";
                $data['rc'] = "00";
            }
        }

        return response()->json($data);
    }


    public function sendToWA($notelp, $otp)
    {



        //    $url_wa  = "http://192.168.3.75/wa_api/index.php/";
        $url_wa  = "http://192.168.3.75/wa_api/index.php/";


        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
        );

        $isi_pesan = "Terima Kasih atas kepercayaan Anda telah menggunakan fasilitas Bank Sumut . Kode OTP Anda untuk Pengajuan Kredit Bank Sumut adalah :  \n\n OTP : *" . $otp . " (Rahasia)*";
        $message = $isi_pesan;
        // file_get_contents($url_wa."send_message_static_get?kd_id=002&auth_key=aUth_0Key_Waa_(ApI)&no_wa=".$no_wa1."&text=".urlencode($isi_pesan), false, stream_context_create($arrContextOptions));
        file_get_contents($url_wa . "send_message_static_get?kd_id=013&auth_key=aUth_0Key_Waa_(ApI)&no_wa=" . $notelp . "&text=" . urlencode($message), false, stream_context_create($arrContextOptions));

        return 'Success Send Wa';
    }


    public function sendToEmail($email, $otp)
    {
        // return $email;
        // exit;
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
        $subject = "OTP Pengajuan Kredit Bank Sumut";
        $url = '';

        $mail->setFrom($from, $from_label);
        $mail->addAddress($email);
        // $mail->addAddress('sitanggang761@gmail.com');
        // $mail->addAddress('utarianggita@students.usu.ac.id');
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $dataViewEmail['otp'] = $otp;
        $html = view('email.email', $dataViewEmail);
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
}
