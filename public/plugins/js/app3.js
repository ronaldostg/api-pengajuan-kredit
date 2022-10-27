// const { find } = require("lodash");
const urlMain = "http://127.0.0.1:8000/";

const myModal = new bootstrap.Modal(document.getElementById("addAgunanModal"));
const detailAgunanModal = new bootstrap.Modal(
    document.getElementById("detailAgunanModal")
);
const modalTandaTangan = new bootstrap.Modal(
    document.getElementById("tandaTanganModal")
);
var imageKTPReview = "";
var imageFotoUsaha = "";
var imageTandaTangan = "";
// var imageFotoUsaha = '';

var formPengajuan = new FormData();
var listAgunan = [];
var tempDataAgunan = [];
var fotoAgunan = [];

var urlIamgeFotoKTP = "";

function previewImageKTP() {
    const image = document.querySelector("#fotoKTP");

    const imgPreview = document.querySelector(".img-preview-ktp");

    imgPreview.style.display = "block";

    const oFReader = new FileReader();

    oFReader.readAsDataURL(image.files[0]);

    oFReader.onload = function (oFREvent) {
        imgPreview.src = oFREvent.target.result;
    };
}

function onCancel() {
    $("#smartwizard").smartWizard("reset");
}
document.getElementById("notelp1").addEventListener("keyup", function (evt) {
    var phoneNumber = document.getElementById("notelp1");
    var charCode = evt.which ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
});

function phoneFormat(input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, "");

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 13);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    if (size == 0) {
        input = input;
    } else if (size < 5) {
        input = "" + input;
    } else if (size < 8) {
        input = "" + input.substring(0, 4) + "-" + input.substring(4, 8);
    } else {
        input =
            "" +
            input.substring(0, 4) +
            "-" +
            input.substring(4, 8) +
            "-" +
            input.substring(8, 14);
    }
    return input;
}

// We need to manually format the phone number on page load
document.getElementById("notelp1").value = phoneFormat(
    document.getElementById("notelp1").value
);

function onCancel() {
    // Reset wizard
    $("#smartwizard").smartWizard("reset");

    // Reset form
    document.getElementById("form-1").reset();
    document.getElementById("form-2").reset();
    document.getElementById("form-3").reset();
    document.getElementById("form-4").reset();
}

function getAjaxKecamatanAgunan() {
    var id_kabupaten = $("#kabupatenAgunan").val();
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "/loadkecamatan",
        data: {
            kabkota: id_kabupaten,
        },

        success: function (msg) {
            // console.log('data kecamatan'+msg);

            $("select#kecamatanAgunan").html(msg);

            getAjaxDesaKel();
        },
    });
}

function getAjaxDesaKel() {
    // console.log('anu')
    var id_kecamatan = $("#kecamatanAgunan").val();

    $.ajax({
        type: "GET",
        dataType: "html",
        // url: urlMain + '127.0.0.1:8000loadkecamatan',
        url: "/loadkelurahan",
        data: {
            kelurahan: id_kecamatan,
        },

        success: function (msg) {
            // console.log('data desa kelurahan 1'+msg);

            $("select#kelurahanAgunan").html(msg);

            //    console.log('test 123');
            fetchClusterAssign();
        },
    });
}

function fetchClusterAssign() {
    var id_provinsi = $("#provinsiAgunan").val();
    var id_kabupaten = $("#kabupatenAgunan").val();
    var id_kecamatan = $("#kecamatanAgunan").val();
    var id_kelurahan = $("#kelurahanAgunan").val();

    // console.log("cek id cluster");

    $.ajax({
        type: "POST",

        url: urlMain + "api/fetch-clusterassign",
        // url: urlMain+"api/fetch-clusterassign",
        data: {
            provinsi: id_provinsi,
            kabupaten: id_kabupaten,
            kecamatan: id_kecamatan,
            kelurahan: id_kelurahan,
        },

        success: function (msg) {
            $("#clusterAssign").val(msg);
        },
    });
}

function onConfirm() {
    let form = document.getElementById("form-5");
    if (form) {
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            $("#smartwizard").smartWizard("setState", [3], "error");
            $("#smartwizard").smartWizard("fixHeight");
            return false;
        }

        $("#smartwizard").smartWizard("unsetState", [3], "error");

        formPengajuan.append("nama_debitur", $("#nama").val());
        formPengajuan.append("nomor_nik", $("#nik").val());
        formPengajuan.append("email", $("#email").val());
        formPengajuan.append("alamat_debitur", $("#alamatDebitur").val());
        formPengajuan.append("nomor_telepon1", $("#notelp1").val());
        // formPengajuan.append('nomor_telepon2',$('#notelp2').val());
        formPengajuan.append("tanggal_lahir", $("#tanggalLahir").val());
        formPengajuan.append("npwp", $("#npwp").val());
        formPengajuan.append("jenis_kelamin", $("#jenisKelamin").val());

        formPengajuan.append("foto_selfie_ktp", $("#fotoKTP")[0].files[0]);
        formPengajuan.append(
            "foto_tempat_usaha",
            $("#fotoTempatUsaha")[0].files[0]
        );
        formPengajuan.append(
            "foto_tanda_tangan",
            $("#fotoTandaTangan")[0].files[0]
        );

        // form di step 2
        formPengajuan.append(
            "status_kepunyaan_rekening",
            $("#punyaNorek").val()
        );
        formPengajuan.append("norek_bs", $("#noRekBS").val());
        formPengajuan.append("nama_ibu", $("#namaIbu").val());
        formPengajuan.append("status_kawin", $("#statusKawin").val());

        // form di step 3
        formPengajuan.append("plafon_dimohon", $("#jlhDimohon").val());
        formPengajuan.append("jenis_keperluan", $("#jenisKeperluan").val());
        formPengajuan.append(
            "jenis_produk_pinjaman",
            $("#jenisKeperluan").val()
        );
        formPengajuan.append("product_id", $("#credit_id").val());
        formPengajuan.append("gaji_bersih", $("#jlhPenghasilan").val());
        formPengajuan.append("loan_period", $("#jlhJangkaWaktu").val());
        formPengajuan.append("tujuan_guna", $("#listTujuanKredit").val());
        formPengajuan.append(
            "kode_cabang",
            $("#namaCabang").val().split("-")[0]
        );
        formPengajuan.append("gunakan_agunan", $("#gunakanAgunan").val());
        formPengajuan.append("source_name", $("#source_name").val());

        if ($("#gunakanAgunan").val() == 1) {
            // formPengajuan.append('agunan',JSON.stringify(listAgunan));
            formPengajuan.append("agunan", JSON.stringify(tempDataAgunan));

            formPengajuan.append("foto_agunan", JSON.stringify(fotoAgunan));
        } else if ($("#gunakanAgunan").val() == 0) {
            formPengajuan.append("agunan", "");
            formPengajuan.append("foto_agunan", "");
        }

        var jlhPenghasilan = Number(
            $("#jlhPenghasilan")
                .val()
                .replace(/[^0-9]+/g, "")
        );

        var jlhDimohon = Number(
            $("#jlhDimohon")
                .val()
                .replace(/[^0-9]+/g, "")
        );
        var jangkaWaktu = Number(
            $("#jlhJangkaWaktu")
                .val()
                .replace(/[^0-9]+/g, "")
        );
        var persenBungaPerTahun = Number($("#persenBunga").val()) / 100;
        var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(4));

        var angsuranPerBulan = Math.round(
            PMT(persenBungaPerBulan, jangkaWaktu, jlhDimohon) * -1
        );

        var format = angsuranPerBulan.toString().split("").reverse().join("");
        var convert = format.match(/\d{1,3}/g);
        var rupiah = convert.join(".").split("").reverse().join("");
  
       

        // return false;
        var nextPengajuan='';
        $.ajax({
            type: "POST", 
            url: urlMain+"api/cek-nohp-pengajuan",
            data: {
                nohp: $("#notelp1").val(),
            },
            beforeSend: function () {
                swal.fire({
                    title: "Menunggu...",
                    text: "Sedang memproses data",
                    showConfirmButton: false,
                    imageUrl: urlMain + "spinning_loading.gif",
                     
                });
            },
    
            success: function (msg) {
               if(msg.rc=='01'){
                Swal.fire({
                    icon: "error",
                    title: "Maaf...",
                    text: msg.message,
                });
                return false
                
               }else if(msg.rc=='00'){

                if (jlhDimohon > 100000000 && tempDataAgunan == []) {
                    Swal.fire({
                        icon: "error",
                        title: "Maaf...",
                        text: " Mohon untuk mengisi data agunan karena plafon yang dimohon melebihi Rp.100.000.000.",
                    }); 
                    return false;
                }

                if ($("#gunakanAgunan").val() == "1" && tempDataAgunan.length == 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Maaf...",
                        text: "Jika menggunakan Agunan, Mohon masukkan data agunan anda",
                    });
                    return false;
                }
        
                if (jlhPenghasilan < angsuranPerBulan) {
                    Swal.fire({
                        icon: "error",
                        title: "Maaf...",
                        text: "Plafon anda melebihi jumlah penghasilan",
                    });
                    return false;
                } 


                Swal.fire({
                    title: "Kirim Pengajuan",
                    icon: "warning",
                    html: "Apakah anda yakin untuk mengirim pengajuan ?",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya , kirim pengajuan",
                    cancelButtonText: "Batalkan",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // cek data diri di dukcapil
                        $.ajax({
                            url: urlMain + "api/check-dukcapil",
                            type: "POST",
        
                            data: {
                                nik: $("#nik").val(),
                                nama: $("#nama").val(),
                                tgl_lahir: $("#tanggalLahir").val(),
                            },
        
                            beforeSend: function () {
                                // console.log("loading dukcapil"); 
                                swal.fire({
                                    title: "Menunggu...",
                                    text: "Data Anda sedang diproses",
                                    showConfirmButton: false,
                                    imageUrl: urlMain + "spinning_loading.gif",
                                    // allowOutsideClick: false
                                });
                            },
                            success: function (res) {
                                // lakukan cek nama dan NIK nya
                                if (res.rc == "00") {
                                    $.ajax({
                                        url: urlMain + "api/inquery-nik-notelp",
                                        type: "POST",
        
                                        data: {
                                            nik: $("#nik").val(),
                                            nohp: $("#notelp1").val(),
                                            // nama: $("#nama").val(),
                                            // tgl_lahir: $("#tanggalLahir").val(),
                                        },
        
                                        beforeSend: function () {
                                            console.log("loading nik notelp");
                                            swal.fire({
                                                title: "Menunggu...",
                                                text: "Data Anda sedang diproses",
                                                showConfirmButton: false,
                                                imageUrl:
                                                    urlMain + "spinning_loading.gif",
                                                // allowOutsideClick: false
                                            });
                                        },
                                        success: function (response) {
                                            console.log("response" + response);
                                            if (response.rc == "02") {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Maaf...",
                                                    text: response.message,
                                                });
                                                // tampilkan data NIK yang sudah ada di database
                                                // dikasi pilihan jika pilih iya maka
                                                // OTP dikirm ke nomor NIK yang sudah terdaftar
                                                // kalau tidak , jangan kirim
                                            } else if (response.rc == "01") {
                                                var isiPesan = response.data;
                                                // console.log(JSON.stringify(isiPesan));
                                                var tbl = `
                                                        <center>
                                                            <table class="table table-borderless">
                                                                <tr>
                                                                    <td>Nama</td>
                                                                    <td>:</td>
                                                                    <td>${isiPesan.username}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>NIK</td>
                                                                    <td>:</td>
                                                                    <td>${isiPesan.nik}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>:</td>
                                                                    <td>${isiPesan.mailaddr}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>No. Telepon</td>
                                                                    <td>:</td>
                                                                    <td>${isiPesan.phonenbr}</td>
                                                                </tr>
                                                            </table>
                                                            <h5>${response.message}</h5>
                                                        </center>`;
        
                                                Swal.fire({
                                                    html: tbl,
                                                    icon: "warning",
                                                    title: "Maaf...",
                                                    // text: +' '+response.rc,
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText:
                                                        "Ya , Lanjutkan Pengajuan",
                                                    cancelButtonText: "Batalkan",
                                                    allowOutsideClick: false,
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        // console.log('lanjutkan')
                                                        kirimkanOTP(formPengajuan);
                                                    }
                                                });
        
                                                // langsung kasi kode OTP yang diambil dari angka inputan
                                            } else if (response.rc == "00") {
                                                kirimkanOTP(formPengajuan);
                                            }
                                        },
                                    });
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Maaf...",
                                        text: res.message,
                                    });
                                }
                                // }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(
                                    xhr.status +
                                        "\n" +
                                        xhr.responseText +
                                        "\n" +
                                        thrownError
                                );
                            },
                        });
                    }
                });

               }
    
            },
            error: function (
                xhr,
                ajaxOptions,
                thrownError
            ) {
                alert(
                    xhr.status +
                        "\n" +
                        xhr.responseText +
                        "\n" +
                        thrownError
                );
            },
        });

        
        
        // return false;
     
         

        

        return false;
        // return false;

      
    }
}

function kirimkanOTP(formData) {
    var response = [];
    $.ajax({
        type: "POST",
        url: urlMain + "api/kirim-otp",
        data: {
            nohp: $("#notelp1").val(),
            nik: $("#nik").val(),
            email: $("#email").val(),
        },
        success: function (data) {},
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
        },
    });

    let timerInterval;
    var duration = 60 * 5;
    var timer = duration,
        minutes,
        seconds;
    Swal.fire({
        timer: duration * 1000,

        title: "Masukkan Kode OTP Anda",
        input: "text",
        html: "Kode OTP akan terkirim lewat WA / Email </br> <b>05:00</b> ",
        inputLabel: "",
        input: "number",
        inputAttributes: {
            maxlength: 6,
        },
        // timerProgressBar: true,
        // showLoaderOnConfirm: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batalkan",
        showCancelButton: true,
        inputPlaceholder: "_ _ _ _ _ _ ",

        didOpen: () => {
            const display = Swal.getHtmlContainer().querySelector("b");

            timerInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer <= 0) {
                    timer = duration;
                }
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: urlMain + "api/check-otp",
                type: "POST",
                data: {
                    kodeKirim: result.value,

                    nohp: $("#notelp1").val(),
                    nik: $("#nik").val(),
                },
                beforeSend: function () {
                    let timerInterval;
                    Swal.fire({
                        title: "Loading.....",
                        html: "Validasi OTP..",
                        timer: 20000,
                        timerProgressBar: true,
                        showConfirmButton: false,

                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    }).then((result) => {});
                },
                success: function (mes) {
                    if (mes.rc != "00") {
                        Swal.fire({
                            icon: "error",
                            title: "Maaf...",
                            text: mes.message,
                        });
                    } else {
                        $.ajax({
                            url: urlMain + "api/save-document",
                            type: "POST",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function () {
                                swal.fire({
                                    title: "Menunggu...",
                                    text: "Data Anda Akan Dikirim",
                                    showConfirmButton: false,
                                    imageUrl: urlMain + "spinning_loading.gif",
                                    allowOutsideClick: false,
                                });
                            },

                            success: function (res) {
                                if (res.rc == "01") {
                                    swal.fire({
                                        icon: "error",
                                        title: "<h4>Maaf</h4>",
                                        text: `${res.status}`,
                                    });
                                } else if (res.rc == "00") {
                                    swal.fire({
                                        icon: "success",
                                        html: `<h4>Success!</h4><br/><h4>${res.status}</h4>`,
                                        allowOutsideClick: false,
                                        // text:
                                    }).then((result) => {
                                        var noticeData = res.data_pengaju;
                                        console.log(
                                            "notice data" +
                                                noticeData.nama_debitur
                                        );
                                        if (result.isConfirmed) {
                                            // window.location('/');
                                            location.href = urlMain;
                                            $.ajax({
                                                url:
                                                    urlMain +
                                                    "api/send-success-pengajuan",
                                                // url:'http://127.0.0.1:8000/api/save-document',
                                                type: "POST",
                                                data: {
                                                    nama: noticeData.nama_debitur,
                                                    kode_pengajuan:
                                                        noticeData.id_req,
                                                    kode_cabang:
                                                        noticeData.kode_cabang,
                                                    no_hp: noticeData.no_hp,
                                                    email: noticeData.email,
                                                },

                                                success: function (message) {},
                                                error: function (
                                                    xhr,
                                                    ajaxOptions,
                                                    thrownError
                                                ) {
                                                    alert(
                                                        xhr.status +
                                                            "\n" +
                                                            xhr.responseText +
                                                            "\n" +
                                                            thrownError
                                                    );
                                                },
                                            });
                                        }
                                    });
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                // alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);

                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text:
                                        "Ada Kesalahan " +
                                        thrownError +
                                        xhr.status +
                                        "\n" +
                                        xhr.responseText,
                                });
                            },
                        });
                    }
                },
            });

            // nik: $("#nik").val(),
            //                     nohp: $("#notelp1").val(),
        }
    });
}

function closeModal() {
    // Reset wizard
    $("#smartwizard").smartWizard("reset");

    // Reset form
    document.getElementById("form-1").reset();
    document.getElementById("form-2").reset();
    document.getElementById("form-3").reset();
    document.getElementById("form-4").reset();

    myModal.hide();
}

function detailAgunan(id) {
    let res = listAgunan.find((item) => item["id_agunan"] === id);

    var datas = $.grep(listAgunan, function (e) {
        return e.id != id;
    });

    detailAgunanModal.show();
    $("#rivJenisAgunan").html(res.jenisAgunan);
    $("#rivJenisDocAgunan").html(res.jenisDokumenAgunan);
    $("#rivAlamatAgunan").html(res.alamatAgunan);
    $("#rivKodeKlaster").html(res.clusterAssign);

    $("#rivLuasTanahAgunan").html(res.luasTanahAgunan);

    $("#rivLuasTanahAgunan").html(res.luasTanahAgunan);

    $("#rivLuasBangunanAgunan").html(res.luasBangunanAgunan);
    $("#rivHargaAgunan").html(`Rp ${res.perkiraanNilaiAgunan}`);

    $("#rivNoSuratAgunan").html(res.nomorSuratAgunan);
    $("#rivProvinsiAgunan").html(res.provinsiAgunan.split("-")[1]);
    $("#rivKabKotAgunan").html(res.kabupatenAgunan.split("-")[1]);

    $("#rivKecamatanAgunan").html(res.kecamatanAgunan.split("-")[1]);
    $("#rivDesaKelAgunan").html(res.kelurahanAgunan.split("-")[1]);

    $("#rivFotoAgunan").attr("src", res.fotoAgunanMenyeluruh);
    $("#rivPajakAgunan").attr("src", res.fotoBuktiPajak);
    $("#rivSuratAgunan").attr("src", res.fotoSuratAgunan);

    // $('#rivDesaKelAgunan').html(res.alamatAgunan)
}

function deleteAgunan(id) {
    var didConfirm = confirm("Yakin untuk hapus agunan ? ");
    if (didConfirm == true) {
        var rowId = document.getElementById("R" + id);

        for (var i = 0; i < listAgunan.length; i++) {
            if (listAgunan[i].id_agunan == id) {
                listAgunan.splice(i, 1);
                break;
            }
        }

        rowId.remove();
        return true;
    } else {
        return false;
    }
}

function PMT(ir, np, pv, fv, type) {
    // return false;
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return pmt;
}

$(function () {
    $("#btnLanjutkanTnpAgunan").on("click", function () {
        // $("#smartwizard").on("showStep");
        $("#smartwizard").smartWizard("next");
    });

    // $("#smartwizard").on(
    //     "showStep",

    $("#provinsiAgunan").on("change", function () {
        //   console.log('value provinsi '+$(this).val())

        $.ajax({
            type: "GET",
            dataType: "html",
            // url: urlMain + '127.0.0.1:8000loadkecamatan',
            url: "/loadkabupaten",
            data: {
                provinsi: this.value,
            },

            success: function (msg) {
                console.log(msg);

                $("select#kabupatenAgunan").html(msg);

                getAjaxKecamatanAgunan();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        "Ada Kesalahan " +
                        thrownError +
                        xhr.status +
                        "\n" +
                        xhr.responseText,
                    // footer: '<a href="">Why do I have this issue?</a>'
                });
            },
        });
    });
    $("#kabupatenAgunan").on("change", function () {
        $.ajax({
            type: "GET",
            dataType: "html",
            // url: urlMain + '127.0.0.1:8000loadkecamatan',
            url: "/loadkecamatan",
            // url: urlMain+"loadkecamatan",
            data: {
                kabkota: this.value,
            },

            success: function (msg) {
                $("select#kecamatanAgunan").html(msg);

                getAjaxKecamatanAgunan();
                getAjaxDesaKel();
                // fetchClusterAssign()
            },
        });
    });
    $("#kecamatanAgunan").on("change", function () {
        //   console.log('nilai kabupaten'+$(this).val)
        var id_kecamatan = $("#kecamatanAgunan").val();

        $.ajax({
            type: "GET",
            dataType: "html",
            // url: urlMain + '127.0.0.1:8000loadkecamatan',
            url: "/loadkelurahan",
            // url: urlMain+"loadkelurahan",
            data: {
                kelurahan: id_kecamatan,
                // kelurahan: id_kecamatan,
            },

            success: function (msg) {
                // console.log('data keluarahan 2'+msg);

                $("select#kelurahanAgunan").html(msg);
                fetchClusterAssign();
                fetchClusterAssign();
            },
        });
    });

    // $('#kelurahanAgunan').val(),

    $("#kelurahanAgunan").on("change", function () {
        // console.log('test');
        fetchClusterAssign();
    });

    var rowIdx = 0;

    var fotoAgunanMenyeluruh = "";
    var fotoBuktiPajak = "";
    var fotoSuratAgunan = "";

    $("#fotoAgunanMenyeluruh").on("change", function () {
        var fieldFotoSeluruhAgunan = document.querySelector(
            "#fotoAgunanMenyeluruh"
        );
        const readFoto = new FileReader();

        readFoto.readAsDataURL(fieldFotoSeluruhAgunan.files[0]);

        readFoto.onload = function (oFREvent) {
            fotoAgunanMenyeluruh = oFREvent.target.result;
        };
    });
    $("#fotoBuktiPajak").on("change", function () {
        var fieldFotoBuktiPajak = document.querySelector("#fotoBuktiPajak");
        const readFoto = new FileReader();

        readFoto.readAsDataURL(fieldFotoBuktiPajak.files[0]);

        readFoto.onload = function (oFREvent) {
            fotoBuktiPajak = oFREvent.target.result;
        };
    });
    $("#fotoSuratAgunan").on("change", function () {
        console.log($(this));

        var fieldFotoSuratAgunan = document.querySelector("#fotoSuratAgunan");
        const readFoto = new FileReader();

        readFoto.readAsDataURL(fieldFotoSuratAgunan.files[0]);

        readFoto.onload = function (oFREvent) {
            fotoSuratAgunan = oFREvent.target.result;
        };
    });
    $("#fieldAgunan").validate({
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            element.closest(".form-group").append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
        },
        rules: {
            jenisAgunan: {
                required: true,
            },
            jenisDokumenAgunan: {
                required: true,
            },
            alamatAgunan: {
                required: true,
            },
            luasTanahAgunan: {
                required: true,
            },
            luasBangunanAgunan: {
                required: true,
            },
            perkiraanNilaiAgunan: {
                required: true,
            },
            nomorSuratAgunan: {
                required: true,
            },
            provinsiAgunan: {
                required: true,
            },
            kabupatenAgunan: {
                required: true,
            },
            kecamatanAgunan: {
                required: true,
            },
            kelurahanAgunan: {
                required: true,
            },
            fotoAgunanMenyeluruh: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
            fotoBuktiPajak: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
            fotoSuratAgunan: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
        },
        messages: {
            jenisAgunan: {
                required: "Isi Jenis Agunan anda",
            },
            jenisDokumenAgunan: {
                required: "Isi Jenis Dokumen Agunan anda",
            },
            alamatAgunan: {
                required: "Isi Alamat Agunan anda",
            },
            luasTanahAgunan: {
                required: "Isi Luas Tanah Agunan anda",
            },
            luasBangunanAgunan: {
                required: "Isi Luas Bangunan Agunan anda",
            },
            perkiraanNilaiAgunan: {
                required: "Isi Perkiraan Harga Agunan anda",
            },
            nomorSuratAgunan: {
                required: "Isi Nomor Surat Agunan anda",
            },
            provinsiAgunan: {
                required: "Isi Provinsi Agunan anda",
            },
            kabupatenAgunan: {
                required: "Isi Kabupaten Agunan anda",
            },
            kecamatanAgunan: {
                required: "Isi Kecamatan Agunan anda",
            },
            kelurahanAgunan: {
                required: "Isi Kelurahan Agunan anda",
            },
            fotoAgunanMenyeluruh: {
                required: "Upload foto Keseluruhan Agunan anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload bukan foto",
                maxsize: "File tidak boleh melewati 5 MB",
            },
            fotoBuktiPajak: {
                required: "Upload foto Bukti Pajak Agunan anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload bukan foto",
                maxsize: "File tidak boleh melewati 5 MB",
            },
            fotoSuratAgunan: {
                required: "Upload foto Surat Agunan anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload bukan foto",
                maxsize: "File tidak boleh melewati 5 MB",
            },
        },
       
    });



    $("#addButtonAgunan").on("click", function (e) {
        e.preventDefault();
        // console.log('TEST')

        //         $('#fieldAgunan').validate({
        //             errorElement: 'span',
        //             errorPlacement: function (error, element) {
        //                 error.addClass('invalid-feedback');
        //                 element.closest('.form-group').append(error);
        //             },
        //             highlight: function (element, errorClass, validClass) {
        //                 $(element).addClass('is-invalid');
        //             },
        //             unhighlight: function (element, errorClass, validClass) {
        //                 $(element).removeClass('is-invalid');
        //             },
        //             rules: {
        //                 jenisAgunan: {
        //                     required: true
        //                 },

        //             },
        //             messages: {
        //                 jenisAgunan: {
        //                     required: 'Isi Jenis Agunan anda'
        //                 },

        //             },
        //             submitHandler: function(form) {
        //                 console.log(form)
        //             }

        //         });

        //         return false;

        let fieldAgunan = document.getElementById("fieldAgunan");

        if (fieldAgunan) {
            // if (!fieldAgunan.valid()) {
            if (!$("#fieldAgunan").valid()) {
                fieldAgunan.classList.add("was-validated");
                return false;
            }
        }

        var tempAgunan = {
            id_agunan: rowIdx + 1,
            clusterAssign: $("#clusterAssign").val(),
            jenisAgunan: $("#jenisAgunan").val(),
            jenisDokumenAgunan: $("#jenisDokumenAgunan").val(),
            alamatAgunan: $("#alamatAgunan").val(),

            luasTanahAgunan: $("#luasTanahAgunan").val(),
            luasBangunanAgunan: $("#luasBangunanAgunan").val(),

            perkiraanNilaiAgunan: $("#perkiraanNilaiAgunan").val(),
            nomorSuratAgunan: $("#nomorSuratAgunan").val(),
            provinsiAgunan: $("#provinsiAgunan").val(),
            kabupatenAgunan: $("#kabupatenAgunan").val(),
            kecamatanAgunan: $("#kecamatanAgunan").val(),
            kelurahanAgunan: $("#kelurahanAgunan").val(),
            fotoAgunanMenyeluruh: fotoAgunanMenyeluruh,
            fotoBuktiPajak: fotoBuktiPajak,
            fotoSuratAgunan: fotoSuratAgunan,
        };
        var dataAgunan = {
            id_agunan: rowIdx + 1,
            clusterAssign: $("#clusterAssign").val(),
            jenisAgunan: $("#jenisAgunan").val(),
            jenisDokumenAgunan: $("#jenisDokumenAgunan").val(),
            alamatAgunan: $("#alamatAgunan").val(),

            luasTanahAgunan: $("#luasTanahAgunan").val(),
            luasBangunanAgunan: $("#luasBangunanAgunan").val(),

            perkiraanNilaiAgunan: $("#perkiraanNilaiAgunan").val(),
            nomorSuratAgunan: $("#nomorSuratAgunan").val(),
            provinsiAgunan: $("#provinsiAgunan").val(),
            kabupatenAgunan: $("#kabupatenAgunan").val(),
            kecamatanAgunan: $("#kecamatanAgunan").val(),
            kelurahanAgunan: $("#kelurahanAgunan").val(),
        };

        var gambarAgunan = {
            id_agunan: rowIdx + 1,
            fotoAgunanMenyeluruh: fotoAgunanMenyeluruh,
            fotoBuktiPajak: fotoBuktiPajak,
            fotoSuratAgunan: fotoSuratAgunan,
        };

        listAgunan.push(tempAgunan);
        fotoAgunan.push(gambarAgunan);
        tempDataAgunan.push(dataAgunan);

        console.log(tempAgunan);
        console.log(gambarAgunan);
        console.log(dataAgunan);

        $("#tbody").append(`
            <tr id="R${++rowIdx}">
                
                <td>${tempAgunan.jenisAgunan}</td>
                <td>${tempAgunan.jenisDokumenAgunan}</td>
                
                <td>
                    <button type="button" class="btn btn-primary" onclick="detailAgunan(${rowIdx})">Lihat</button>
                    <input type="hidden" value="${
                        tempAgunan.id_agunan
                    }" id="idAgunan${rowIdx}">
                    <button type="button" class="btn btn-danger" onclick="deleteAgunan(${
                        tempAgunan.id_agunan
                    })" >Hapus</button>
                </td>

            </tr>
        
         `);

        myModal.hide();

        console.log(listAgunan);
    });

    $("#tbody").on("click", ".remove", function () {
        var child = $(this).closest("tr").nextAll();

        var didConfirm = confirm("Yakin untuk hapus agunan ? ");
        if (didConfirm == true) {
            child.each(function (index) {
                // Getting <tr> id.
                var id = $(this).attr("id");

                // Getting the <p> inside the .row-index class.
                var idx = $(this).children(".row-index").children("p");
                // console.log('si idx'+JSON.stringify(idx))

                // Gets the row number from <tr> id.
                var dig = parseInt(id.substring(1));

                // Modifying row index.
                idx.html(`Row ${dig - 1}`);

                // listAgunan.splice((dig-1),1);
                //
                // Modifying row id.
                $(this).attr("id", `R${dig - 1}`);
            });

            // Removing the current row.

            // $(this).closest('tr').remove();

            // Decreasing the total number of rows by 1.
            rowIdx--;
            return true;
        } else {
            return false;
        }
    });

    $("#addAgunanModal").on("hidden.bs.modal", function (e) {
        $(this)
            .find("input,textarea,select")
            .val("")
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();

        $(this).find("#fieldAgunan").removeClass("was-validated");
    });

    $("#perkiraanNilaiAgunan").mask("000.000.000", {
        reverse: true,
    });

    $("#fotoKTP").on("change", function (event) {
        const image = document.querySelector("#fotoKTP");

        const imgPreview = document.querySelector(".img-preview-ktp");

        // const imgPrevEndKTP = document.querySelector('revGambarKTP')

        var tmpPath = URL.createObjectURL(event.target.files[0]);

        urlIamgeFotoKTP = tmpPath;
        console.log(image.files[0]);
        console.log(urlIamgeFotoKTP);

        imgPreview.style.display = "block";
        imgPreview.style.position = "relative";

        const oFReader = new FileReader();

        oFReader.readAsDataURL(image.files[0]);

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result;
            imageKTPReview = oFREvent.target.result;
            // imgPrevEndKTP.src = oFREvent.target.result;
        };
    });
    $("#fotoTandaTangan").on("change", function () {
        const image = document.querySelector("#fotoTandaTangan");

        const imgPreview = document.querySelector(".img-preview-signature");

        imgPreview.style.display = "block";
        imgPreview.style.position = "relative";

        const oFReader = new FileReader();

        oFReader.readAsDataURL(image.files[0]);
        // console.log(image.files[0])

        oFReader.onload = function (oFREvent) {
            console.log(oFREvent.target.result);
            imgPreview.src = oFREvent.target.result;
            imageTandaTangan = oFREvent.target.result;
        };
    });

    // $("#keteranganAgunan").hide();
    $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop(
        "disabled",
        true
    );
    $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop(
        "required",
        false
    );

    $("#namaCabang").select2({
        theme: "bootstrap4",
        placeholder: "-- Pilih Cabang Terdekat--",
        language: "id",
    });

    $("#jlhAgunan").hide();
    $("#formAgunan").hide();
    $("#formTanpaAgunan").hide();

    $("#gunakanAgunanTemp").on("change", function () {
        var val = $(this).val();

        if (val == 1) {
            var counter = $("[id^='agunan']", $("#formAgunan")).length;

            $("#totalAgunan").val(counter);

            $("#formAgunan").show();
        } else {
            listAgunan = [];
            $("#formAgunan").hide();

            var counter = 0;

            $("#totalAgunan").val(counter);
        }
    });

    $("#nama,#alamatDebitur,#namaIbu, #namaPemilikRekBS").on(
        "input",
        function () {
            $(this).val($(this).val().toUpperCase());
            // console.log($(this).val())
        }
    );
    $("#nik").on("input", function () {
        //var len = max_length - $(this).val().length;
        var c = this.selectionStart,
            r = /[^0-9]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ""));
            c--;
        }

        this.setSelectionRange(c, c);
    });

    $("#nama,#namaPemilikRekBS, #namaIbu").on("input", function () {
        var c = this.selectionStart,
            r = /[^a-z ]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ""));
            c--;
        }

        this.setSelectionRange(c, c);
    });

    $("#jenisKeperluan").on("change", function () {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: urlMain + "api/load-produk-kredit",
            data: {
                idJenis: $(this).val(),
            },

            success: function (msg) {
                $("select#jnsProdukPinjaman").html(msg);
                loadFirstProduct();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(
                    xhr.status + "\n" + xhr.responseText + "\n" + thrownError
                );
            },
        });
    });

    $("#jnsProdukPinjaman").change(loadFirstProduct);

    function loadFirstProduct() {
        var data = $("#jnsProdukPinjaman").val().split("-");

        $("#persenBunga").val(data[1]);
        $("#credit_id").val(data[0]);

        setValueAngsuran();
    }

    $("#jnsProdukPinjaman").on("change", function () {
        var data = $(this).val().split("-");

        $("#persenBunga").val(data[1]);
        $("#credit_id").val(data[0]);
    });

    // mengatur penghasilan bersih
    $("#pointsPenghasilan").on("input", function () {
        var counter = $(this).val();

        $("#jlhPenghasilan").val(counter + ".000.000");
    });

    $("#plusPenghasilan").click(function () {
        var limitPenghasilan = 100;
        var newValuePlus = parseInt($("#jlhPenghasilan").val()) + 1;
        if (newValuePlus > limitPenghasilan) return;

        $("#jlhPenghasilan").val(newValuePlus.toString() + ".000.000");
        setValueAngsuran();
    });

    $("#minusPenghasilan").click(function () {
        var newValueMinus = parseInt($("#jlhPenghasilan").val()) - 1;
        if (newValueMinus < 1) return;

        $("#jlhPenghasilan").val(newValueMinus.toString() + ".000.000");
        setValueAngsuran();
    });

    // mengatur penghasilan bersih

    function setValueAngsuran() {
        var jlhPenghasilan = Number(
            $("#jlhPenghasilan")
                .val()
                .replace(/[^0-9]+/g, "")
        );
        var jlhDimohon = Number(
            $("#jlhDimohon")
                .val()
                .replace(/[^0-9]+/g, "")
        );
        var jangkaWaktu = Number(
            $("#jlhJangkaWaktu")
                .val()
                .replace(/[^0-9]+/g, "")
        );
        var persenBungaPerTahun = Number($("#persenBunga").val()) / 100;
        var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(4));

        var angsuranPerBulan = Math.round(
            PMT(persenBungaPerBulan, jangkaWaktu, jlhDimohon) * -1
        );

        var format = angsuranPerBulan.toString().split("").reverse().join("");
        var convert = format.match(/\d{1,3}/g);
        var rupiah = convert.join(".").split("").reverse().join("");

        if (persenBungaPerTahun == 0) {
            // console.log('kosong')
            $("#jnsProdukPinjaman").addClass("is-invalid");
            $("#angsuranPerBulan").val(0);
        } else {
            $("#jnsProdukPinjaman").removeClass("is-invalid");

            $("#angsuranPerBulan").val(rupiah);
        }

        if (jlhPenghasilan < angsuranPerBulan) {
            // alert("Maaf, angsuran anda melebihi penghasilan anda")
            // return false;

            $("#angsuranPerBulan").addClass("is-invalid");
            // if ($(this).next("#limitAngsuran").length) {
            //     $(this).next("#limitAngsuran").remove();
            // } else {

            //     $('#angsuranPerBulan').after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="limitAngsuran"><label>Wajib diisi</label></div>');
            // }
        } else {
            $("#angsuranPerBulan").removeClass("is-invalid");
            $(this).next("#limitAngsuran").remove();
        }
    }

    // mengatur plafond permohonan
    $("#pointsDimohon").on("input", function () {
        var counter = $(this).val();

        $("#jlhDimohon").val(counter + ".000.000");

        setValueAngsuran();
    });

    $("#plusDimohon").click(function () {
        var limitPenghasilan = 500;
        var newValuePlus = parseInt($("#jlhDimohon").val()) + 1;
        if (newValuePlus > limitPenghasilan) return;

        $("#jlhDimohon").val(newValuePlus.toString() + ".000.000");
        setValueAngsuran();
    });

    $("#minusDimohon").click(function () {
        var newValueMinus = parseInt($("#jlhDimohon").val()) - 1;
        if (newValueMinus < 1) return;

        $("#jlhDimohon").val(newValueMinus.toString() + ".000.000");
        setValueAngsuran();
    });

    // mengatur plafond permohonan

    // mengatur jangka waktu kredit
    $("#pointsJangkaWaktu").on("input", function () {
        var counter = $(this).val();
        setValueAngsuran();
    });

    $("#plusJangkaWaktu").click(function () {
        var limitJangkaWaktu = 240;
        var newValuePlus = parseInt($("#jlhJangkaWaktu").val()) + 1;
        if (newValuePlus > limitJangkaWaktu) return;

        $("#jlhJangkaWaktu").val(newValuePlus.toString());

        setValueAngsuran();
    });

    $("#minusJangkaWaktu").click(function () {
        var newValueMinus = parseInt($("#jlhJangkaWaktu").val()) - 1;

        if (newValueMinus < 1) return;

        $("#jlhJangkaWaktu").val(newValueMinus.toString());

        setValueAngsuran();
    });

    // mengatur jangka waktu kredit

    $("#nasabahBaruField").hide();
    $("#nasabahLamaField").hide();

    $("#punyaNorek").on("change", function () {
        var val = $(this).val();

        if (val == "1") {
            $("#noRekBS").prop("disabled", false);
            $("#namaPemilikRekBS").prop("disabled", false);
            $("#noRekBS").prop("required", true);
            $("#namaPemilikRekBS").prop("required", true);

            $("#namaIbu").prop("required", false);
            $("#statusKawin").prop("required", false);

            $("#namaIbu").prop("disabled", true);
            $("#statusKawin").prop("disabled", true);

            $("#nasabahBaruField").hide();

            $("#nasabahLamaField").show();
            // $('#inputNorek').show();
        }
        // cek dia nasabah baru
        else if (val == "0") {
            $("#noRekBS").prop("disabled", true);
            $("#namaPemilikRekBS").prop("disabled", true);
            $("#noRekBS").prop("required", false);
            $("#namaPemilikRekBS").prop("required", false);

            $("#namaIbu").prop("required", true);
            $("#statusKawin").prop("required", true);

            $("#namaIbu").prop("disabled", false);
            $("#statusKawin").prop("disabled", false);

            $("#nasabahBaruField").show();
            $("#nasabahLamaField").hide();
        }
    });

    // $("#notelp1, #notelp2").on('input', function() {
    $("#notelp1").on("input", function () {
        var value = $(this).val();

        if (value.charAt(0) != "0") {
            // console.log('tidak sesuai format');
            $(this).attr("maxlength", "1");

            if ($(this).next("#checkFormat").length) {
            } else {
                $(this).after(
                    '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="checkFormat"> <label> Penulisan wajib diawali angka 0 Contoh: 08 xx - xxxx - xxxx </label> </div>'
                );

                // $(this).next("#checkFormat").remove()
                $(this).next("#lengthCharacterPhone").remove();
            }
        } else {
            if (value.charAt(1) != "8") {
                // console.log('tidak sesuai format')
                $(this).attr("maxlength", "2");
                if ($(this).next("#formatPhone").length) {
                    // $(this).next("#formatPhone").remove();
                } else {
                    $(this).after(
                        '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="formatPhone"><label>Nomor Telepon Anda wajib diawali dengan 08</label></div>'
                    );
                }
            } else {
                $(this).next("#formatPhone").remove();
                // console.log(value.length);
                $(this).attr("maxlength", "16");
                $(this).next("#checkFormat").remove();
                if (value.length < 11) {
                    // console.log('wajib 11 karakter')
                    if ($(this).next("#lengthCharacterPhone").length) {
                        $(this).addClass("is-invalid");
                    } else {
                        if ($(this).next("#lengthCharacterPhone").length) {
                            $(this).next("#lengthCharacterPhone").remove();
                        } else {
                            $(this).addClass("is-invalid");
                            $(this).after(
                                '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacterPhone"><label>Wajib minimal 11 karakter</label></div>'
                            );
                        }
                    }
                } else {
                    $(this).next("#lengthCharacterPhone").remove();
                    $(this).next("#checkFormat").remove();
                    $(this).removeClass("is-invalid");
                }

                $(this).next("#checkFormat").remove();
                $(this).next("#formatPhone").remove();
            }
        }
    });

    $("#npwp").on("input", function () {
        var value = $(this).val();

        //var len = max_length - $(this).val().length;
        var c = this.selectionStart,
            // r = /[^0-9]/gi,
            r = /[^0-9]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ""));
            // $(this).val(v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, ''));
            c--;
        }

        if (value.charAt(0) == "0") {
            // console.log('tidak sesuai format');
            $(this).attr("maxlength", "1");

            if ($(this).next("#checkFormat").length) {
            } else {
                // console.log(value.charAt(0))
                // if (value.charAt(1) === '0') {
                //     console.log('tidak sesuai format')
                // }

                $(this).after(
                    '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="checkFormat"> <label> Penulisan NPWP tidak tidak diawali angka 0  </label> </div>'
                );

                // $(this).next("#checkFormat").remove()
                $(this).next("#lengthCharacterPhone").remove();
            }
        } else {
            $(this).attr("maxlength", "16");
            $(this).next("#checkFormat").remove();
            if (v == "") {
                $(this).next("#lengthCharacter").remove();
            }

            if (v.length < 15) {
                if ($(this).next("#lengthCharacter").length) {
                    //$(this).next("#lengthCharacter").remove();
                } else {
                    $(this).addClass("is-invalid");
                    $(this).after(
                        '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Wajib 15 karakter</label></div>'
                    );
                }
            } else {
                $(this).removeClass("is-invalid");
                $(this).next("#lengthCharacter").remove();
            }
            $(this).next("#checkFormat").remove();
            $(this).next("#formatPhone").remove();
        }

        //this.setSelectionRange(c, c);
    });

    var date = new Date();

    $("#tanggalLahir")
        .datepicker({
            yearRange: "1900:2022",
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            //minDate:new Date(limitDatePicker),
            maxDate: new Date(),
        })
        .datepicker("setDate", date);

    const ruleForm1 = {
        nama: {
            required: true,
        },
        noNIK: {
            required: true,
            minlength: 16,
        },
        email: {
            email: true,
        },
        notelp1: {
            required: true,
            minlength: 11,
        },
        // notelp2: {
        //     minlength: 11
        // },
        alamatDebitur: {
            required: true,
        },
        jenisKelamin: {
            required: true,
        },
        tgl_lahir: {
            required: true,
        },
        fotoKTP: {
            required: true,
        },
        punyaNorekBS: {
            required: true,
        },
    };
    const ruleForm2 = {
        punyaRekeningBS: {
            required: true,
        },
    };

    // $('#form-1').validate({
    // errorElement: 'span',
    // errorClass: 'form-text form-error text-danger-m2',
    // errorClass: 'is-invalid',
    // focusInvalid: false,
    // ignore: "",
    // rules: ruleForm1,

    //     messages: {
    //         nama: {
    //             required: "Masukkan Nama Anda"
    //         },
    //         noNIK: {
    //             required: "Masukkan NIK Anda",
    //             minlength: "Minimal 16 angka"
    //         },
    //         email: {
    //             email: "Email tidak sesuai format"
    //         },
    //         notelp1: {
    //             required: "Masukkan No. Telepon Anda"
    //         },
    //         alamatDebitur: {
    //             required: "Masukkan Alamat Anda"
    //         },

    //     }
    // })

    // $('#nik').on('input', function() {
    //     //var len = max_length - $(this).val().length;
    //     var c = this.selectionStart,
    //         r = /[^0-9]/gi,
    //         v = $(this).val();

    //     if (r.test(v)) {
    //         $(this).val(v.replace(r, ''));
    //         c--;
    //     }

    //     if (v.length < 16) {
    //         if ($(this).next("#lengthCharacter").length) {

    //             $(this).addClass("is-invalid");
    //         } else {
    //             if ($(this).next("#lengthCharacter").length) {
    //                 $(this).next("#lengthCharacter").remove();
    //             } else {

    //                 $(this).addClass("is-invalid");
    //                 $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Wajib minimal 16 angka</label></div>');
    //             }

    //         }
    //         //$(this).after('<div class="text-white font-weight-bold" id="alertwarning"><label><b>Wajib 16 karakter</b></label></div>');

    //     } else {
    //         $(this).next("#lengthCharacter").remove();
    //         $(this).removeClass("is-invalid");
    //         return true;
    //     }
    //     //$(this).next("#lengthCharacter").remove();

    //     this.setSelectionRange(c, c);

    // });

    // $("#nama, #nik, #notelp1,#jenisKelamin, #fotoKTP,#tanggalLahir,#detailAlamat,#jenisPembiayaan,#jlhPengajuan,#jangkaWaktu,#namaCabang, #jnsUsaha,#fotoTempatUsaha,#kota,#kecamatan,#desakel").on('blur', function() {

    //     var value = $(this).val();

    //     if (value.length == 0) {
    //         $(this).next("#lengthCharacter").remove();

    //         if ($(this).next("#alertwarning").length) {

    //         } else {
    //             if ($(this).next("#lengthCharacter").length) {
    //                 $(this).next("#lengthCharacter").remove();

    //             }
    //             $(this).addClass("is-invalid");

    //             $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="alertwarning"><label>Wajib diisi</label></div>');
    //         }
    //     } else {
    //         $(this).removeClass("is-invalid");
    //         $(this).next("#alertwarning").remove();
    //         $(this).next("#checkFormat").remove();

    //         return true;
    //     }

    //     return false;
    // });

    // $('#form-test').validate({
    //     rules: {
    //         nama: {
    //             required: true
    //         }
    //     },
    //     messages: {
    //         nama: {
    //             required: 'Please Enter Your Name'
    //         }
    //     }
    // });
    // Step show event
    // $("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection, stepPosition) {
    //     // console.log(($("#form-test")).serialize());
    //     // var form_data = new FormData();

    //     // form_data.append('nama', $('#nama').val())

    //     console.log("stepPosition " + stepPosition)
    //     console.log("stepIndex " + stepIndex)
    //     console.log("stepDirection " + stepDirection)

    //     // if (stepIndex == 0) {
    //     //     console.log(ruleForm1);
    //     // } else if (stepIndex == 1) {
    //     //     console.log(ruleForm2);
    //     // }

    //     $("#prev-btn").removeClass('disabled').prop('disabled', false);
    //     $("#next-btn").removeClass('disabled').prop('disabled', false);
    //     if (stepPosition === 'first') {
    //         $("#prev-btn").addClass('disabled').prop('disabled', true);
    //     } else if (stepPosition === 'last') {
    //         $("#next-btn").addClass('disabled').prop('disabled', true);
    //     } else {
    //         $("#prev-btn").removeClass('disabled').prop('disabled', false);
    //         $("#next-btn").removeClass('disabled').prop('disabled', false);
    //     }

    //     // Get step info from Smart Wizard
    //     let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
    //     // console.log(stepInfo)

    //     $("#sw-current-step").text(stepInfo.currentStep + 1);
    //     $("#sw-total-step").text(stepInfo.totalSteps);
    //     // console.log(stepInfo.currentStep + 1)
    // });

    $("#smartwizard").smartWizard("reset");

    $("#smartwizard").on(
        "showStep",
        function (e, anchorObject, stepIndex, stepDirection, stepPosition) {
            console.log("step index" + stepIndex);

            $("#prev-btn").removeClass("disabled").prop("disabled", false);
            $("#next-btn").removeClass("disabled").prop("disabled", false);
            if (stepPosition === "first") {
                $("#prev-btn").addClass("disabled").prop("disabled", true);
            } else if (stepPosition === "last") {
                $("#next-btn").addClass("disabled").prop("disabled", true);
            } else {
                $("#prev-btn").removeClass("disabled").prop("disabled", false);
                $("#next-btn").removeClass("disabled").prop("disabled", false);
            }

            // Get step info from Smart Wizard
            let stepInfo = $("#smartwizard").smartWizard("getStepInfo");
            $("#sw-current-step").text(stepInfo.currentStep + 1);
            $("#sw-total-step").text(stepInfo.totalSteps);

            if (stepPosition == "last") {
                showReviewPengajuan();
                $("#btnFinish").prop("disabled", false);
            } else {
                $("#btnFinish").prop("disabled", true);
            }

            if (stepIndex == 3) {
                console.log("lakukan tampilkan komponen agunan atau tidak");
                var jlhDimohon = Number(
                    $("#jlhDimohon")
                        .val()
                        .replace(/[^0-9]+/g, "")
                );
                console.log(jlhDimohon);

                if (jlhDimohon <= 100000000) {
                    console.log("tanpa agunan");

                    $("#gunakanAgunan").val("0");

                    $("#formAgunan").hide();
                    $("#formTanpaAgunan").show();
                    // $('#smartwizard').smartWizard("goToStep", 5, true);
                } else if (jlhDimohon > 100000000) {
                    console.log("gunakan agunan");

                    $("#gunakanAgunan").val("1");

                    $("#formAgunan").show();
                    $("#formTanpaAgunan").hide();
                }
            }

            // Focus first name
            if (stepIndex == 1) {
                setTimeout(() => {
                    $("#first-name").focus();
                }, 0);
            }
        }
    );

    $("#smartwizard").on("initialized", function (e) {
        // console.log("initialized");
        // $('#smartwizard').smartWizard("goToStep", 1, true);

        // console.log('anukan');

        // $('#smartwizard').smartWizard("reset");

        // Reset form
        document.getElementById("form-1").reset();
        document.getElementById("form-2").reset();
        document.getElementById("form-3").reset();
        document.getElementById("form-4").reset();
    });

    $("#smartwizard").on("loaded", function (e) {
        console.log("loaded");
    });

    // Smart Wizard
    // $('#smartwizard').smartWizard({
    //     autoAdjustHeight: true,
    // });
    $("#smartwizard").smartWizard({
        selected: 0,
        lang: { next: "Selanjutnya", previous: "Kembali" },
        autoAdjustHeight: false,
        theme: "arrows", // basic, arrows, square, round, dots
        transition: {
            // animation: 'myFade' // none|fade|slideHorizontal|slideVertical|slideSwing|css
            animation: "none", // none|fade|slideHorizontal|slideVertical|slideSwing|css
        },
        toolbar: {
            showNextButton: true, // show/hide a Next button
            showPreviousButton: true, // show/hide a Previous button
            position: "bottom", // none/ top/ both bottom
            extraHtml: `<button class="btn btn-success" id="btnFinish" onclick="onConfirm()">Selesai</button>
                    <button class="btn btn-secondary" onclick="onCancel()">Batalkan</button>`,
        },
        anchor: {
            enableNavigation: true, // Enable/Disable anchor navigation
            enableNavigationAlways: false, // Activates all anchors clickable always
            enableDoneState: true, // Add done state on visited steps
            markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
            unDoneOnBackNavigation: false, // While navigate back, done state will be cleared
            enableDoneStateNavigation: true, // Enable/Disable the done state navigation
        },
        disabledSteps: [], // Array Steps disabled
        errorSteps: [], // Highlight step with errors
        hiddenSteps: [], // Hidden steps
        // getContent: (idx, stepDirection, selStep, callback) => {
        //   console.log('getContent',selStep, idx, stepDirection);
        //   callback('<h1>'+idx+'</h1>');
        // }
    });

    $("#email").on("input", function () {
        var val = $(this).val();

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(val)) {
            $(this).addClass("is-invalid");
            if ($(this).next("#lengthCharacter").length) {
            } else {
                $(this).after(
                    '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Email anda tidak sesuai format</label></div>'
                );
            }
        } else {
            $(this).removeClass("is-invalid");
            $(this).next("#lengthCharacter").remove();
        }
    });

    $("#noRekBS").on("input", function () {
        var value = $(this).val();

        //var len = max_length - $(this).val().length;
        var c = this.selectionStart,
            // r = /[^0-9]/gi,
            r = /[^0-9]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ""));
            // $(this).val(v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, ''));
            c--;
        }

        if (value.charAt(0) == "0") {
            // console.log('tidak sesuai format');
            $(this).attr("maxlength", "1");

            if ($(this).next("#checkFormat").length) {
            } else {
                // console.log(value.charAt(0))
                // if (value.charAt(1) === '0') {
                //     console.log('tidak sesuai format')
                // }

                $(this).after(
                    '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="checkFormat"> <label> Penulisan Nomor Rekening tidak tidak diawali angka 0  </label> </div>'
                );

                // $(this).next("#checkFormat").remove()
                $(this).next("#lengthCharacterNoRek").remove();
            }
        } else {
            $(this).attr("maxlength", "16");
            $(this).next("#checkFormat").remove();
            if (v == "") {
                $(this).next("#lengthCharacter").remove();
            }

            if (v.length < 14) {
                if ($(this).next("#lengthCharacter").length) {
                    //$(this).next("#lengthCharacter").remove();
                } else {
                    $(this).addClass("is-invalid");
                    $(this).after(
                        '<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Wajib 14 karakter</label></div>'
                    );
                }
            } else {
                $(this).removeClass("is-invalid");
                $(this).next("#lengthCharacter").remove();
            }
            $(this).next("#checkFormat").remove();
            $(this).next("#formatPhone").remove();
        }

        //this.setSelectionRange(c, c);
    });

    $("#form-1").validate({
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            element.closest(".form-group").append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
        },
        rules: {
            nama: {
                required: true,
            },
            noNIK: {
                required: true,
                minlength: 16,
            },
            email: {
                required: true,
                email: true,
            },
            alamatDebitur: {
                required: true,
            },
            notelp1: {
                required: true,
            },
            jenisKelamin: {
                required: true,
            },
            tgl_lahir: {
                required: true,
            },
            fotoKTP: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
            fotoTandaTangan: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
        },
        messages: {
            nama: {
                required: "Mohon Isi Nama Anda",
            },
            noNIK: {
                required: "Mohon Isi NIK Anda",
                minlength: "Minimal 16 Karakter",
            },
            email: {
                required: "Mohon Isi Email Anda",
                email: "Email Anda tidak sesuai format",
            },
            alamatDebitur: {
                required: "Mohon masukkan Alamat anda",
            },
            notelp1: {
                required: "Mohon masukkan No. Telepon anda",
            },
            jenisKelamin: {
                required: "Mohon masukkan Jenis Kelamin anda",
            },
            tgl_lahir: {
                required: "Mohon masukkan Tanggal Lahir anda",
            },
            fotoKTP: {
                required: "Mohon masukkan foto anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload tidak sesuai",
                maxsize: "File tidak boleh melewati 5 MB",
            },
            fotoTandaTangan: {
                required: "Mohon masukkan foto anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload tidak sesuai",
                maxsize: "File tidak boleh melewati 5 MB",
            },
        },
    });

    $("#form-3").validate({
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            element.closest(".form-group").append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
        },
        rules: {
            jenisKeperluan: {
                required: true,
            },
            jnsProdukPinjaman: {
                required: true,
            },
            jnsUsaha: {
                required: true,
            },
            fotoTempatUsaha: {
                required: true,
                extension: "jpg|jpeg|png|JPG|JPEG|PNG",
                accept: "image/*",
                maxsize: 5000000,
            },
        },
        messages: {
            jenisKeperluan: {
                required: "Mohon Pilih Jenis Pengajuan",
            },
            jnsProdukPinjaman: {
                required: "Mohon Plih Jenis Produk Pinjaman Anda",
            },
            jnsUsaha: {
                required: "Mohon Plih Jenis Produk Pinjaman Anda",
            },
            fotoTempatUsaha: {
                required: "Mohon masukkan foto anda",
                extension: "Wajib dalam Bentuk Foto",
                accept: "File yang anda upload tidak sesuai",
                maxsize: "File tidak boleh melewati 5 MB",
            },
        },
    });

    console.log($("#fieldAgunan"));

    $("#form-4").validate({
        rules: {
            nama: {
                required: true,
            },
            noNIK: {
                required: true,
            },
            nama: {
                required: true,
            },
        },
        messages: {
            nama: {
                required: "Mohon Isi Nama Anda",
            },
            noNIK: {
                required: "Mohon Isi NIK Anda",
            },
        },
    });

    $("#smartwizard").on(
        "leaveStep",
        function (e, anchorObject, currentStepIdx, nextStepIdx, stepDirection) {
            // Validate only on forward movement

            if (stepDirection == "forward") {
                let form = document.getElementById(
                    "form-" + (currentStepIdx + 1)
                );

                console.log("form-" + (currentStepIdx + 1));

                // alert( "Valid: " + form.valid() );

                // if ($('#form-1').valid()) {
                //     return true
                // } else {
                //     return false
                // }

                if (form) {
                    // if (!form.checkValidity()) {
                    if (!$("#form-" + (currentStepIdx + 1)).valid()) {
                        // alert("Error"+form.validationMessage)

                        form.classList.add("was-validated");
                        $("#smartwizard").smartWizard(
                            "setState",
                            [currentStepIdx],
                            "error"
                        );
                        $("#smartwizard").smartWizard("fixHeight");
                        // console.log(dataForm.get)
                        return false;
                    }

                    // console.log(listAgunan);

                    $("#smartwizard").smartWizard(
                        "unsetState",
                        [currentStepIdx],
                        "error"
                    );
                }
            }
        }
    );

    $.fn.smartWizard.transitions.myFade = (
        elmToShow,
        elmToHide,
        stepDirection,
        wizardObj,
        callback
    ) => {
        if (!$.isFunction(elmToShow.fadeOut)) {
            callback(false);
            return;
        }

        if (elmToHide) {
            elmToHide.fadeOut(
                wizardObj.options.transition.speed,
                wizardObj.options.transition.easing,
                () => {
                    elmToShow.fadeIn(
                        wizardObj.options.transition.speed,
                        wizardObj.options.transition.easing,
                        () => {
                            callback();
                        }
                    );
                }
            );
        } else {
            elmToShow.fadeIn(
                wizardObj.options.transition.speed,
                wizardObj.options.transition.easing,
                () => {
                    callback();
                }
            );
        }
    };

    $("#state_selector").on("change", function () {
        $("#smartwizard").smartWizard(
            "setState",
            [$("#step_to_style").val()],
            $(this).val(),
            !$("#is_reset").prop("checked")
        );
        return true;
    });

    $("#style_selector").on("change", function () {
        $("#smartwizard").smartWizard(
            "setStyle",
            [$("#step_to_style").val()],
            $(this).val(),
            !$("#is_reset").prop("checked")
        );
        return true;
    });

    //add more fields group
    $("#add").click(function () {
        myModal.show();
    });

    $("#close").click(function () {
        myModal.hide();
    });

    $("#closeCross").click(function () {
        myModal.hide();
    });

    $("#closeCrossAgunan").click(function () {
        detailAgunanModal.hide();
    });

    $("#closeDetailAgunan").click(function () {
        detailAgunanModal.hide();
    });

    //remove fields group
    $("#formAgunan").on("click", "a[id^='remove']", function () {
        $(this).parents("div.col-sm-12").remove();

        var counter = $("[id^='agunan']", $("#formAgunan")).length;

        // console.log('counter '+counter)
        // console.log("total agunan " + counter--);

        $("#totalAgunan").val(counter--);

        // addElement($("#formAgunan"))
    });

    //   $("#formAgunan").on("click", "input[type='radio']", showHidden);
});

function showReviewPengajuan() {
    const reviewFotoKTP = document.querySelector(".reviewGambarKTP");

    let panjangAgunan = listAgunan.length;
    // console.log("panjang agunan" + panjangAgunan);
    // var testAgunan =[];

    let htmlAgunan = [];

    for (var i = 0; i < panjangAgunan; i++) {
        // console.log('agunan' +listAgunan[i]['jenisDokumenAgunan'])
        htmlAgunan += `
        <h5>Agunan </h5>
       
        <div class="row">
            <div class="col-sm-9 col-12 mx-3">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${i + 1}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
                            i + 1
                        }" aria-expanded="true" aria-controls="collapse${
            i + 1
        }">
                        Agunan - ${i + 1}
                        </button>
                    </h2>
                    <div id="collapse${
                        i + 1
                    }" class="accordion-collapse collapse" aria-labelledby="heading${
            i + 1
        }" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <table class="table">
                        <tbody>
                            <tr>
                                <td>Jenis Agunan</td>
                                <td>:</td>
                                <td>${listAgunan[i]["jenisAgunan"]}</td>
                            </tr>
                            <tr>
                                <td>Jenis Dokumen Agunan</td>
                                <td>:</td>
                                <td> ${listAgunan[i]["jenisDokumenAgunan"]}</td>
                            </tr>
                            <tr>
                                <td>Alamat Agunan</td>
                                <td>:</td>
                                <td>${listAgunan[i]["alamatAgunan"]}</td>
                            </tr>
                            <tr>
                                <td>Luas Tanah Agunan</td>
                                <td>:</td>
                                <td>${listAgunan[i]["luasTanahAgunan"]} meter persegi</td>
                            </tr>
                            <tr>
                                <td>Luas Bangunan Agunan</td>
                                <td>:</td>
                                <td>${listAgunan[i]["luasBangunanAgunan"]} meter persegi</td>
                            </tr>
                            <tr>
                                <td>Perkiraan Nilai Agunan</td>
                                <td>:</td>
                                <td>Rp. ${listAgunan[i]["perkiraanNilaiAgunan"]}</td>
                            </tr>
                            <tr>
                                <td>Nomor Surat Agunan</td>
                                <td>:</td>
                                <td>${listAgunan[i]["nomorSuratAgunan"]}</td>
                            </tr>
                            <tr>
                                <td>Provinsi Agunan</td>
                                <td>:</td>
                                <td>${(listAgunan[i]["provinsiAgunan"]).split("-")[1] } </td>
                            </tr>
                            <tr>
                                <td>Kabupaten / Kota Agunan</td>
                                <td>:</td>  
                                <td>${ (listAgunan[i]["kabupatenAgunan"]).split("-")[1] }</td>
                            </tr>
                            <tr>
                                <td>Kecamatan Agunan</td>
                                <td>:</td>
                                <td>${(listAgunan[i]["kecamatanAgunan"]).split("-")[1] }</td>
                            </tr>
                            <tr>
                                <td>Desa / Kelurahan Agunan</td>
                                <td>:</td>
                                <td>${(listAgunan[i]["kelurahanAgunan"]).split("-")[1]}</td>
                            </tr>
                           
                            <tr>
                                <td>Foto Tampak Agunan Secara Jelas Menyeluruh</td>
                                <td>:</td>
                                <td> <img class="reviewGambarKTP" style=" max-width: 100%;width:500px;" src="${
                                    listAgunan[i]["fotoAgunanMenyeluruh"]
                                }" ></td>
                            </tr>
                            <tr>
                                <td>Foto Bukti Pembayaran PBB/Pajak Agunan atau Dokumen Pelengkap lainnnya  </td>
                                <td>:</td>
                                <td> <img class="reviewGambarKTP" style=" max-width: 100%;width:500px;" src="${
                                    listAgunan[i]["fotoBuktiPajak"]
                                }" ></td>
                            </tr>
                            <tr>
                                <td>Foto Bagian Halaman yang Menampilkan Nomor Surat, Luas dan Nama Pemilik Agunan</td>
                                <td>:</td>
                                <td> <img class="reviewGambarKTP" style=" max-width: 100%;width:500px;" src="${
                                    listAgunan[i]["fotoSuratAgunan"]
                                }" ></td>
                            </tr>
                            
                        </tbody>
                    </table>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
        `;
    }

    let anu = `
    <div class="row">
        ${htmlAgunan}
    </div>
    `;

    let html = `
    <h2>Cek Pengajuan Kredit Anda</h2>
    
    <h4 class="m-3" >Data Diri</h4>

    <div class="row">
        <div class="col-sm-9 col-12 mx-3">
            <table class="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <td>Nama </td>
                        
                        <td> ${$("#nama").val()}</td>
                    </tr>
                    <tr>
                        <td>NIK </td>
                       
                        <td> ${$("#nik").val()}</td>
                    </tr>
                    <tr>
                        <td>Email </td>
                        
                        <td> ${$("#email").val()}</td>
                    </tr>
                    <tr>
                        <td>Alamat </td>
                        
                        <td> ${$("#alamatDebitur").val()}</td>
                    </tr>
                    <tr>
                    <td>Nomor Telepon </td>
                    
                    <td> ${$("#notelp1").val()} </td>
                    </tr>

                    <tr>
                        <td>Jenis Kelamin</td>
                        
                        <td> ${$("#jenisKelamin").val()}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Lahir</td>
                        
                        <td> ${$("#tanggalLahir").val()}</td>
                    </tr>

                    <tr>
                        <td>NPWP</td>
                        
                        <td> ${$("#npwp").val()}</td>
                    </tr>
                    <tr>
                        <td>Foto Selfie dengan KTP</td>
                        
                        <td> <img id="reviewGambarKTP" class="reviewGambarKTP"  style=" max-width: 100%;width:500px;" src="${imageKTPReview}" ></td>
                    </tr>
                    
                    

                </tbody>
            </table>
        </div>         
    </div>
    <h5>Rekening Bank</h5>

    <div class="row">
        <div class="col-sm-9 col-12 mx-3">
            <table class="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <td>Keterangan </td>
                        
                        <td>  ${
                            $("#punyaNorek").val() == "1"
                                ? "Sudah punya nomor rekening "
                                : $("#punyaNorek").val() == "0"
                                ? "   Belum punya Rekening  "
                                : " Belum punya Rekening  "
                        }</td>
                    </tr>


                    ${
                        $("#punyaNorek").val() == "1"
                            ? " <tr><td>Nomor Rekening Bank Sumut </td><td>" +
                              $("#noRekBS").val() +
                              "</td></tr>"
                            : $("#punyaNorek").val() == "0"
                            ? "<tr><td>Nama Ibu  </td><td>" +
                              $("#namaIbu").val() +
                              "</td></tr>"
                            : ""
                    }
            
                ${
                    $("#punyaNorek").val() == "1"
                        ? " <tr><td>Nama pemilik rekening </td><td>" +
                          $("#namaPemilikRekBS").val() +
                          "</td></tr>"
                        : $("#punyaNorek").val() == "0"
                        ? "<tr><td>Status Kawin </td><td>" +
                          $("#statusKawin").val() +
                          "</td></tr>"
                        : ""
                }
                
                
                    
                
                    

                </tbody>
            </table>
        </div> 
        
    </div>

    <h5>Jenis Kredit</h5>

    <div class="row">
        <div class="col-sm-9 col-12 mx-3">
            <table class="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <td>Keperluan </td>
                        <td>  ${
                            $("#jenisKeperluan").val() == "1"
                                ? "Investasi "
                                : $("#jenisKeperluan").val() == "2"
                                ? "   Modal Kerja  "
                                : "   "
                        }</td>
                    </tr>
                    <tr>
                        <td>Jenis Produk Pinjaman </td>
                        <td> ${
                            $("#jnsProdukPinjaman").val() == null
                                ? ""
                                : $("#jnsProdukPinjaman").val()
                        } </td>
                    </tr>
                   
                    <tr>
                        <td>Penghasilan Bersih </td>
                        <td>Rp.  ${$("#jlhPenghasilan").val()}</td>
                    </tr>
                    <tr>
                        <td>Plafon dimohon </td>
                        <td>Rp.   ${$("#jlhDimohon").val()}</td>
                    </tr>
                    <tr>
                        <td>Jangka Waktu  </td>
                        <td>  ${$("#jlhJangkaWaktu").val()} kali </td>
                    </tr>
                    <tr>
                        <td>Estimasi Angsuran  </td>
                        <td>  ${$("#angsuranPerBulan").val()}</td>
                    </tr>
                    <tr>
                        <td>Tujuan Guna Kredit</td>
                        <td>  ${$("#listTujuanKredit").val()}</td>
                    </tr>
                    <tr>
                        <td>Cabang Bank Sumut Terdekat </td>
                        <td>    ${$("#namaCabang").val().split("-")[1]}</td>
                        </tr>
                    <tr>
                        <td>Foto Tempat Usaha </td>
                        <td> <img id="reviewGambarKTP" class="reviewGambarKTP" style=" max-width: 100%;width:500px;" src="${imageFotoUsaha}" ></td>
                    </tr>
                    <tr>
                        <td>Foto Tanda Tangan </td>
                        <td> <img id="reviewGambarKTP" class="reviewGambarKTP" style=" max-width: 100%;width:500px;" src="${imageTandaTangan}" ></td>
                    </tr>
                    

                </tbody>
            </table>
        </div> 
    </div> 
    `;

    $("#reviewPengajuan").html(html);

    if (listAgunan == []) {
        $("#reviewAgunan").html("<h3>Tidak Menggunakan Agunan</h3>");
    } else {
        $("#reviewAgunan").html(anu);
    }
}

function previewImageTempatUsaha() {
    const image = document.querySelector("#fotoTempatUsaha");

    const imgPreview = document.querySelector(".img-preview-tempat-usaha");

    imgPreview.style.display = "block";
    imgPreview.style.position = "relative";

    const oFReader = new FileReader();

    oFReader.readAsDataURL(image.files[0]);

    oFReader.onload = function (oFREvent) {
        imgPreview.src = oFREvent.target.result;
        imageFotoUsaha = oFREvent.target.result;
    };
}
