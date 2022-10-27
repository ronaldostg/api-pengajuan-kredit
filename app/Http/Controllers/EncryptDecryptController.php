<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EncryptDecryptController extends Controller
{
    //
    public static function decrypt_aes($ivCiphertextB64, $key = '', $iv = '')
	{

		$ivCiphertext  = base64_decode($ivCiphertextB64);
		// print_r($ivCiphertext);
		// echo '</br>';
		// exit;
		// $ciphertext = substr($ivCiphertext, 16);
		$decryptedData = openssl_decrypt($ivCiphertext, "aes-256-cbc", $key, OPENSSL_RAW_DATA, $iv);
		return $decryptedData;
	}


	public static function encrypt_aes($plaintext, $key, $iv)
	{
		$ciphertext = openssl_encrypt($plaintext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
		$ivCiphertext = $ciphertext;
		$ivCiphertextB64 = base64_encode($ivCiphertext);
		return $ivCiphertextB64;
	}
}
