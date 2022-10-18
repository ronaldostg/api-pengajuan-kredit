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

//$('#smartwizard').smartWizard("reset");

function onFinish() {
    // alert('Finish Clicked');
    Swal.fire({
        title: "Halo",
        icon: "info",

        // html:'<h4>Masukkan tanda tangan anda</h4> <div style="width: 100%;height: auto;border: 1px solid black;"></div><br/>'
        // html:'<h4>Masukkan tanda tangan anda</h4> <div style="width: 100%;height: auto;border: 1px solid black;"></div><br/>'
    });
    console.log("kirimkan");

    formPengajuan.append("nama_debitur", $("#nama").val());
    formPengajuan.append("nomor_nik", $("#nik").val());
    formPengajuan.append("email", $("#email").val());
    formPengajuan.append("alamat_debitur", $("#alamatDebitur").val());
    formPengajuan.append("nomor_telepon1", $("#notelp1").val());
    // formPengajuan.append('nomor_telepon2',$('#notelp2').val());
    formPengajuan.append("tanggal_lahir", $("#tanggalLahir").val());
    formPengajuan.append("npwp", $("#npwp").val());
    formPengajuan.append("foto_selfie_ktp", $("#fotoKTP")[0].files[0]);

    // form di step 2
    formPengajuan.append("status_kepunyaan_rekening", $("#punyaNorek").val());
    formPengajuan.append("norek_bs", $("#noRekBS").val());
    formPengajuan.append("nama_ibu", $("#namaIbu").val());
    formPengajuan.append("status_kawin", $("#statusKawin").val());

    // form di step 3
    formPengajuan.append("jenis_keperluan", $("#jenisKeperluan").val());
    formPengajuan.append("jenis_produk_pinjaman", $("#credit_id").val());
    formPengajuan.append("product_id", $("#credit_id").val());
    formPengajuan.append("gaji_bersih", $("#jlhPenghasilan").val());
    formPengajuan.append("loan_period", $("#jlhJangkaWaktu").val());
    formPengajuan.append("tujuan_guna", $("#listTujuanKredit").val());
    formPengajuan.append("kode_cabang", $("#namaCabang").val().split("-")[0]);
    formPengajuan.append(
        "foto_tempat_usaha",
        $("#fotoTempatUsaha")[0].files[0]
    );
    formPengajuan.append(
        "foto_tanda_tangan",
        $("#fotoTandaTangan")[0].files[0]
    );

    formPengajuan.append("agunan", $("#fotoTandaTangan")[0].files[0]);

    // form di step 4
    // // console.log(listAgunan)
    // formPengajuan.append('is_agunan', $('#gunakanAgunan').val())
    // for(var i=0;i<listAgunan.length;i++){
    //     formPengajuan.append('jenisAgunan[]',listAgunan[i]['jenisAgunan'])
    // }
    // formPengajuan.append('item_agunan', listAgunan)

    // console.log('form pengajuan')
    // // console.log(JSON.stringify(formPengajuan.values()))

    // $.ajax({
    //     url:'http://127.0.0.1:8081/api/insert-pengajuan',
    //     type:'POST',
    //     data : formPengajuan,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     success:function(res){
    //         console.log('respon '+ JSON.stringify(res) )
    //     }

    // })
}

function previewImageKTP() {
    const image = document.querySelector("#fotoKTP");

    const imgPreview = document.querySelector(".img-preview-ktp");

    imgPreview.style.display = "block";

    const oFReader = new FileReader();

    oFReader.readAsDataURL(image.files[0]);

    oFReader.onload = function (oFREvent) {
        imgPreview.src = oFREvent.target.result;
    };

    // $('#smartwizard').smartWizard({
    //     autoAdjustHeight: true,
    // });
}

function onCancel() {
    $("#smartwizard").smartWizard("reset");
}
document.getElementById("notelp1").addEventListener("keyup", function (evt) {
    var phoneNumber = document.getElementById("notelp1");
    var charCode = evt.which ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
});
// document.getElementById('notelp2').addEventListener('keyup', function(evt) {
//     var phoneNumber = document.getElementById('notelp2');
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     phoneNumber.value = phoneFormat(phoneNumber.value);
// });

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
// document.getElementById('notelp2').value = phoneFormat(document.getElementById('notelp2').value);

// const myModal = new bootstrap.Modal(document.getElementById('confirmModal'));

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
        // url: urlMain + '127.0.0.1:8000loadkecamatan',
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

    console.log("cek id cluster");

    $.ajax({
        type: "POST",
        // dataType: "html",
        // url: urlMain + '127.0.0.1:8000loadkecamatan',
        url: "http://127.0.0.1:8081/api/fetch-clusterassign",
        data: {
            provinsi: id_provinsi,
            kabupaten: id_kabupaten,
            kecamatan: id_kecamatan,
            kelurahan: id_kelurahan,
        },

        success: function (msg) {
            // console.log();
            // console.log(msg.kode_klaster);
            console.log(msg);
            $("#clusterAssign").val(msg);
            // console.log('data desa kelurahan 1'+msg);
            // console.log('data desa kelurahan 1'+msg);

            //    $("select#kelurahanAgunan").html(msg);

            // //    console.log('test 123');
            // fetchClusterAssign();
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
        // formPengajuan.append('foto_selfie_ktp',$('#fotoKTP')[0].files[0]);

        // formPengajuan.append('foto_selfie_ktp',imageKTPReview);
        // formPengajuan.append('foto_tempat_usaha',imageFotoUsaha);
        // formPengajuan.append('foto_tanda_tangan',imageTandaTangan);

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


        if (($("#gunakanAgunan").val()=='1') && (tempDataAgunan.length==0)) {
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

        // return false;
        // return false;

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
                    url: "http://127.0.0.1:8081/api/check-dukcapil",
                    type: "POST",

                    data: {
                        nik: $("#nik").val(),
                        nama: $("#nama").val(),
                        tgl_lahir: $("#tanggalLahir").val(),
                    },

                    beforeSend: function () {
                        console.log("loading dukcapil");
                        swal.fire({
                            title: "Menunggu...",
                            text: "Data Anda sedang diproses",
                            showConfirmButton: false,
                            imageUrl:
                                "http://127.0.0.1:8000/spinning_loading.gif",
                            // allowOutsideClick: false
                        });
                    },
                    success: function (res) {
                        // lakukan cek nama dan NIK nya
                        if (res.rc == "00") {
                            $.ajax({
                                url: "http://127.0.0.1:8081/api/inquery-nik-notelp",
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
                                            "http://127.0.0.1:8000/spinning_loading.gif",
                                        // allowOutsideClick: false
                                    });
                                },
                                success: function (response) {
                                    console.log("response" + response);
                                    if (response.rc == "02") {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Maaf...",
                                            text:
                                                response.message
                                                
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
}

function kirimkanOTP(formData) {
    var response = [];
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8081/api/kirim-otp",
        data: {
            nohp: $("#notelp1").val(),
            nik: $("#nik").val(),
        },
        success: function (data) {
            console.log("data OTP" + data);
        },
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
                // console.log(timer)
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
                url: "http://127.0.0.1:8081/api/check-otp",
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
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        // if (result.dismiss === Swal.DismissReason.timer) {
                        //     console.log('I was closed by the timer')
                        // }
                    });
                },
                success: function (mes) {
                    // console.log('hasil kirim OTP'+JSON.stringify(mes));
                    if (mes.rc != "00") {
                        Swal.fire({
                            icon: "error",
                            title: "Maaf...",
                            text: mes.message,
                        });
                        //                         } else {
                        console.log("ada kesalahan");
                    } else {
                        console.log("gak ada lagi ");
                        $.ajax({
                            url: "http://127.0.0.1:8081/api/save-document",
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
                                    imageUrl:
                                        "http://127.0.0.1:8000/spinning_loading.gif",
                                });
                            },

                            success: function (res) {
                                console.log(
                                    "hasil kirim ke appraisal" +
                                        JSON.stringify(res)
                                );
                                // var noticeData = res.data_pengaju;

                                if (res.rc == "01") {
                                    console.log(
                                        "ada pengajuan yang belum diproses"
                                    );

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
                                            location.href =
                                                "http://127.0.0.1:8000/";
                                            $.ajax({
                                                url: "http://127.0.0.1:8081/api/send-success-pengajuan",
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

                                                success: function (message) {
                                                    console.log(
                                                        "res kirim berhasil " +
                                                            message
                                                    );
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
                                    // footer: '<a href="">Why do I have this issue?</a>'
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
    console.log(res);

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
        // console.log('id'+id)
        var rowId = document.getElementById("R" + id);

        for (var i = 0; i < listAgunan.length; i++) {
            if (listAgunan[i].id_agunan == id) {
                listAgunan.splice(i, 1);
                break;
            }
        }

        rowId.remove();
        console.log(listAgunan);
        return true;
    } else {
        return false;
    }
}

// var canvas = document.getElementById('signature-pad');
// // console.log('tests')

// // Adjust canvas coordinate space taking into account pixel ratio,
// // to make it look crisp on mobile devices.
// // This also causes canvas to be cleared.
// function resizeCanvas() {
//     // When zoomed out to less than 100%, for some very strange reason,
//     // some browsers report devicePixelRatio as less than 1
//     // and only part of the canvas is cleared then.
//     var ratio =  Math.max(window.devicePixelRatio || 1, 1);
//     canvas.width = canvas.offsetWidth * ratio;
//     canvas.height = canvas.offsetHeight * ratio;
//     canvas.getContext("2d").scale(ratio, ratio);
// }

// window.onresize = resizeCanvas;
// resizeCanvas();

// var signaturePad = new SignaturePad(canvas, {
//   backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
// });

// document.getElementById('save-png').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }

//   var data = signaturePad.toDataURL('image/png');
//   console.log(data);
// //   window.open(data);
// });

// document.getElementById('save-jpeg').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }

//   var data = signaturePad.toDataURL('image/jpeg');
//   console.log(data);
// //   window.open(data);
// });

// document.getElementById('save-svg').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }

//   var data = signaturePad.toDataURL('image/svg+xml');
//   console.log(data);
//   console.log(atob(data.split(',')[1]));
// //   window.open(data);
// });

// document.getElementById('clear').addEventListener('click', function () {
//   signaturePad.clear();
// });

// document.getElementById('undo').addEventListener('click', function () {
// 	var data = signaturePad.toData();
//   if (data) {
//     data.pop(); // remove the last dot or line
//     signaturePad.fromData(data);
//   }
// });

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

    //ajax unutuk pilih desa kelurahan
    $("#provinsiAgunan").on("change", function () {
        //   console.log('value provinsi '+$(this).val())

        $.ajax({
            type: "GET",
            dataType: "html",
            // url: urlMain + '127.0.0.1:8000loadkecamatan',
            url: "/loadkabupaten",
            // url: "http://127.0.0.1:8081/loadkabupaten",
            // url: "http://127.0.0.1:8081/api/loadkabupaten",
            data: {
                provinsi: this.value,
            },

            success: function (msg) {
                console.log(msg)

                // console.log("select#kabupatenAgunan");

                $("select#kabupatenAgunan").html(msg);

                getAjaxKecamatanAgunan();
                // fetchClusterAssign()

                // getAjaxDesaKel();
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
            // url: "http://127.0.0.1:8081/loadkecamatan",
            data: {
                kabkota: this.value,
            },

            success: function (msg) {
                //console.log(msg);

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
            // url: "http://127.0.0.1:8081/loadkelurahan",
            data: {
                kelurahan: id_kecamatan,
                // kelurahan: id_kecamatan,
            },

            success: function (msg) {
                // console.log('data keluarahan 2'+msg);

                $("select#kelurahanAgunan").html(msg);
                // console.log('test 1234');
                fetchClusterAssign();
                fetchClusterAssign();
            },
        });
    });

    // $('#kelurahanAgunan').val(),

    $("#kelurahanAgunan").on("change", function () {
        // console.log('test');
        fetchClusterAssign();
        //   console.log('nilai kabupaten'+$(this).val)
        // var id_kecamatan = $('#kecamatanAgunan').val();

        // $.ajax({
        //     type: "GET",
        //     dataType: "html",
        //     // url: urlMain + '127.0.0.1:8000loadkecamatan',
        //     url: '/loadkelurahan',
        //     data: {
        //         kelurahan: id_kecamatan,
        //         // kelurahan: id_kecamatan,
        //     },

        //     success: function(msg) {
        //         // console.log('data keluarahan 2'+msg);

        //         $("select#kelurahanAgunan").html(msg);

        //     }
        // });
    });

    var rowIdx = 0;

    var fotoAgunanMenyeluruh = "";
    var fotoBuktiPajak = "";
    var fotoSuratAgunan = "";

    $("#fotoAgunanMenyeluruh").on("change", function () {
        var fieldFotoSeluruhAgunan = document.querySelector(
            "#fotoAgunanMenyeluruh"
        );
        // var fieldFotoBuktiPajak = document.querySelector('#fotoBuktiPajak');
        // var fieldFotoSuratAgunan = document.querySelector('#fotoSuratAgunan');
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

    $("#addButtonAgunan").on("click", function (e) {
        e.preventDefault();

        // console.log('foto agunan menyeluruh'+fotoAgunanMenyeluruh)
        //     var fotoBuktiPajak="";
        // var fotoSuratAgunan="";

        // var fotoBuktiPajak = '';
        // var fotoSuratAgunan = '';

        let fieldAgunan = document.getElementById("fieldAgunan");

        if (fieldAgunan) {
            if (!fieldAgunan.checkValidity()) {
                fieldAgunan.classList.add("was-validated");
                return false;
            }
        }

        // console.log($('#jenisAgunan:checked').val());

        // console.log()

        // alert()
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

        // console.log(tempAgunan);
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

    $("#seeAgunan").on("click", function () {
        console.log("listAgunan " + JSON.stringify(listAgunan));
        console.log("gambar agunan " + JSON.stringify(fotoAgunan));
    });

    $("#tbody").on("click", ".remove", function () {
        //  hapusAgunan();

        // Getting all the rows next to the
        // row containing the clicked button
        var child = $(this).closest("tr").nextAll();
        // console.log('child' +JSON.stringifychild)

        // Iterating across all the rows
        // obtained to change the index
        console.log("anak" + JSON.stringify(child));
        var didConfirm = confirm("Yakin untuk hapus agunan ? ");
        if (didConfirm == true) {
            child.each(function (index) {
                console.log("index" + index);

                // Getting <tr> id.
                var id = $(this).attr("id");
                console.log("si id" + id);

                console.log("value id agunan" + $("#idAgunan" + id).val());

                // Getting the <p> inside the .row-index class.
                var idx = $(this).children(".row-index").children("p");
                // console.log('si idx'+JSON.stringify(idx))

                // Gets the row number from <tr> id.
                var dig = parseInt(id.substring(1));
                console.log("id agunan " + $("#idAgunan" + dig).val());

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

        // console.log('list agunan setelah dihapus '+JSON.stringify(listAgunan))
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
        // console.log('test 123')
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
        // console.log(image.files[0])

        oFReader.onload = function (oFREvent) {
            //   console.log(oFREvent.target.result);
            imgPreview.src = oFREvent.target.result;
            imageKTPReview = oFREvent.target.result;
            // imgPrevEndKTP.src = oFREvent.target.result;
        };

        // console.log(imageKTPReview);

        // $("#smartwizard").smartWizard('fixHeight');

        // $('#smartwizard').smartWizard(
        //     "overflow-y",
        //     "auto"
        // );
    });
    $("#fotoTandaTangan").on("change", function () {
        // console.log('test 123')
        const image = document.querySelector("#fotoTandaTangan");

        const imgPreview = document.querySelector(".img-preview-signature");

        // const imgPrevEndKTP = document.querySelector('revGambarKTP')

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

        // console.log(imageKTPReview);

        // $("#smartwizard").smartWizard('fixHeight');

        // $('#smartwizard').smartWizard(
        //     "overflow-y",
        //     "auto"
        // );
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

    $("#gunakanAgunan").on("change", function () {
        var val = $(this).val();

        if (val == 1) {
            var counter = $("[id^='agunan']", $("#formAgunan")).length;

            $("#totalAgunan").val(counter);

            $("#formAgunan").show();

            // $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop("disabled", false);
            // $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop("required", true);
            // $("#keteranganAgunan").show();
            // $("#jlhAgunan").show()
        } else {
            listAgunan = [];
            $("#formAgunan").hide();

            var counter = 0;

            $("#totalAgunan").val(counter);
            // $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop("disabled", true);
            // $("#keteranganAgunan>div>div>input, #keteranganAgunan>div>div>select").prop("required", false);
            // $("#keteranganAgunan>div").remove();
            // $("#jlhAgunan").hide()
        }
    });

    // $("#jumlahAgunan").on('change', function() {

    //     // var menu = document.getElementsByTagName('div');
    //     // var val = $(this).val()
    //     var val = $(this).val()
    //     console.log(typeof val)

    //     var tempHtml = [];

    //     for (let i = 0; i < val; i++) {
    //         console.log('halo');
    //         // console.log('<h1>Haolo ' + i + '</h1>')

    //         // tempHtml.push(`<div><h1>Haolo ${i}</h1></div>`);

    //         tempHtml.push(`<div class="row mt-3" >
    //         <h3>Benda Agunan - </h3>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Jenis Agunan<span class="text-danger">*</span></label>
    //                 <br />
    //                 <input class="form-check-input" type="radio" name="jenisAgunan${i+1}"
    //                 id="jenisAgunan${i+1}" required value="tanah">
    //                         <label class="form-check-label" for="flexRadioDefault${i+1}">
    //                             Tanah
    //                         </label>
    //                         <input class="form-check-input" type="radio" name="jenisAgunan${i+1}"
    //                         id="jenisAgunan${i+1}" required value="rumah">
    //                         <label class="form-check-label" for="flexRadioDefault${i+1}">
    //                             Rumah
    //                         </label>
    //                         <input class="form-check-input" type="radio" name="jenisAgunan${i+1}"
    //                         id="jenisAgunan${i+1}" required value="toko">
    //                         <label class="form-check-label" for="flexRadioDefault${i+1}">
    //                             Ruko
    //                         </label>
    //                         <input class="form-check-input" type="radio" name="jenisAgunan${i+1}"
    //                         id="jenisAgunan${i+1}" required value="apartemen">
    //                         <label class="form-check-label" for="flexRadioDefault${i+1}">
    //                             Apartemen
    //                         </label>

    //                 <div class="row">
    //                     <div class="col-sm-6">

    //                     </div>
    //                     <div class="col-sm-6">

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Jenis Dokumen Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <select class="form-control" name="jenisDokumenAgunan${i+1}" id="jenisDokumenAgunan${i+1}"
    //                     placeholder="--Pilih Jenis Agunan--" required>
    //                     <option selected hidden>---Pilih Jenis Dokumen---</option>
    //                     <option value="SHM">SHM</option>
    //                     <option value="SHGB">SHGB</option>
    //                     <option value="AJB">AJB</option>
    //                     <option value="GIRIK">GIRIK</option>
    //                     <option value="PPJB">PPJB</option>
    //                     <option value="BPKB">BPKB</option>
    //                     <option value="SKCAMAT">SKCAMAT</option>
    //                     <option value="Lainnya">Lainnya</option>

    //                 </select>

    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Alamat / Lokasi Bangunan<span
    //                         class="text-danger">*</span></label>
    //                 <input type="text" class="form-control" name="alamatAgunan${i+1}" id="alamatAgunan${i+1}"
    //                     placeholder="Alamat / Lokasi Agunan" required>

    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Luas Tanah (m2) <span
    //                         class="text-danger">*</span></label>
    //                 <input type="text" class="form-control" name="luasTanahAgunan${i+1}" id="luasTanahAgunan${i+1}"
    //                     placeholder="Luas Tanah (m2) " required>

    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Perkiraan Nilai Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <input type="text" class="form-control" name="perkiraanNilaiAgunan${i+1}" id="perkiraanNilaiAgunan${i+1}"
    //                     placeholder="Perkiraan Nilai Agunan" required>

    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Nomor Surat Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <input type="text" class="form-control" name="nomorSuratAgunan${i+1}" id="nomorSuratAgunan${i+1}"
    //                     placeholder="Nomor Surat Agunan" required>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Provinsi Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <select class="form-control" name="provinsiAgunan" id="provinsiAgunan${i+1}"
    //                     placeholder="--Pilih Jenis Agunan--" required>
    //                     <option selected hidden>---Pilih Provinsi---</option>
    //                     <option value="dki jakarta">DKI JAKARTA</option>
    //                     <option value="kepulauan riau">KEPULAUAN RIAU</option>
    //                     <option value="sumatera utara">SUMATERA UTARA</option>

    //                 </select>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Kabupaten Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <select class="form-control" name="kabupatenAgunan${i+1}" id="kabupatenAgunan${i+1}"
    //                     placeholder="--Pilih Jenis Agunan--" required>
    //                     <option hidden>---Pilih Kabupaten---</option>

    //                 </select>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Kecamatan Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <select class="form-control" name="kecamatanAgunan${i+1}" id="kecamatanAgunan${i+1}"
    //                     placeholder="--Pilih Jenis Agunan--" required>
    //                     <option selected hidden>---Pilih Kecamatan---</option>

    //                 </select>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Desa / Kelurahan Agunan<span
    //                         class="text-danger">*</span></label>
    //                 <select class="form-control" name="desakelAgunan${i+1}" id="desakelAgunan${i+1}"
    //                     placeholder="--Pilih Jenis Agunan--" required>
    //                     <option selected hidden>---Pilih Desa / Kelurahan---</option>

    //                 </select>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Foto Tampak Depan Agunan Secara Jelas Menyeluruh<span
    //                         class="text-danger">*</span></label>
    //                 <input type="file" name="tampakDepanAgunan${i+1}" id="tampakDepanAgunan${i+1}" class="form-control"
    //                         style="position:relative;" accept=".jpg, .jpeg, .png"
    //                         required>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Foto Bukti Pembayaran PBB/ Pajak Agunan atau dokumen pelengkap lainnya<span
    //                         class="text-danger">*</span></label>
    //                 <input type="file" name="buktiBayarPbb${i+1}" id="buktiBayarPbb${i+1}" class="form-control"
    //                         style="position:relative;" accept=".jpg, .jpeg, .png"
    //                         required>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Foto Bagian Halaman yang menampilkan nomor surat, luas, dan nama pemilik agunan<span
    //                         class="text-danger">*</span></label>
    //                 <input type="file" name="bagianHalamanAgunan${i+1}" id="bagianHalamanAgunan${i+1}" class="form-control"
    //                         style="position:relative;" accept=".jpg, .jpeg, .png"
    //                         required>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Apakah Jaminan Merupakan Tempat Tinggal Anda?<span
    //                         class="text-danger">*</span></label>
    //                 <input class="form-check-input" type="radio" name="tempatTinggalAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Ya
    //                 </label>
    //                 <input class="form-check-input" type="radio" name="tempatTinggalAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Tidak
    //                 </label>

    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Apakah Jaminan Merupakan Tempat Usaha Anda?<span
    //                         class="text-danger">*</span></label>
    //                 <input class="form-check-input" type="radio" name="tempatUsahaAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Ya
    //                 </label>
    //                 <input class="form-check-input" type="radio" name="tempatUsahaAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Tidak
    //                 </label>
    //             </div>
    //         </div>
    //         <div class="col-md-4 my-2">
    //             <div class="form-group">
    //                 <label class="sr-only">Apakah Jaminan Sedang disewakan?<span
    //                         class="text-danger">*</span></label>
    //                         <br/>
    //                 <input class="form-check-input" type="radio" name="disewakanAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Ya
    //                 </label>
    //                 <input class="form-check-input" type="radio" name="disewakanAgunan${i+1}"
    //                     required>
    //                 <label class="form-check-label" for="flexRadioDefault1">
    //                     Tidak
    //                 </label>
    //             </div>
    //         </div>
    //     </div>`);

    //     }

    //     $('#keteranganAgunan').html(tempHtml);
    //     // console.log(tempHtml);

    // });

    // console.log($('#nasabahBaruField > input'));

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

        //$(this).next("#lengthCharacter").remove();

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
        // console.log()

        $.ajax({
            type: "GET",
            dataType: "html",
            url: "http://127.0.0.1:8000/api/load-produk-kredit",
            data: {
                idJenis: $(this).val(),
            },

            success: function (msg) {
                // console.log(msg)
                $("select#jnsProdukPinjaman").html(msg);
                loadFirstProduct();
            },
        });

        // console.log($('#jnsProdukPinjaman').val())
    });

    $("#jnsProdukPinjaman").change(loadFirstProduct);

    function loadFirstProduct() {
        var data = $("#jnsProdukPinjaman").val().split("-");

        $("#persenBunga").val(data[1]);
        $("#credit_id").val(data[0]);

        setValueAngsuran();
    }

    $("#jnsProdukPinjaman").on("change", function () {
        // console.log($(this).val())

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

        // var jlhPenghasilan = Number(($('#jlhPenghasilan').val()).replace(/[^0-9]+/g, ""));
        // var jlhDimohon = Number(($('#jlhDimohon').val()).replace(/[^0-9]+/g, ""));
        // // var jlhDimohon = $('#jlhDimohon').val();

        // console.log(jlhPenghasilan)
        // console.log(jlhDimohon)

        // if (jlhPenghasilan < jlhDimohon) {
        //     console.log("Maaf, plafon anda melebihi penghasilan")
        // }

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

        // $('#jlhDimohon').val(counter + ".000.000");

        // var jlhPenghasilan = Number(($('#jlhPenghasilan').val()).replace(/[^0-9]+/g, ""));
        // var jlhDimohon = Number(($('#jlhDimohon').val()).replace(/[^0-9]+/g, ""));
        // // var jlhDimohon = $('#jlhDimohon').val();

        // console.log(jlhPenghasilan)
        // console.log(jlhDimohon)

        // if (jlhPenghasilan < jlhDimohon) {
        //     console.log("Maaf, plafon anda melebihi penghasilan")
        // }
    });

    $("#plusJangkaWaktu").click(function () {
        var limitJangkaWaktu = 240;
        var newValuePlus = parseInt($("#jlhJangkaWaktu").val()) + 1;
        if (newValuePlus > limitJangkaWaktu) return;

        $("#jlhJangkaWaktu").val(newValuePlus.toString());

        setValueAngsuran();

        // var jlhPenghasilan = Number(($('#jlhPenghasilan').val()).replace(/[^0-9]+/g, ""));
        // var jlhDimohon = Number(($('#jlhDimohon').val()).replace(/[^0-9]+/g, ""));
        // var jangkaWaktu = Number(($('#jlhJangkaWaktu').val()).replace(/[^0-9]+/g, ""));
        // var persenBungaPerTahun = Number($('#persenBunga').val()) / 100;
        // // var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(2));
        // var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(4));
        // // var jlhDimohon = $('#jlhDimohon').val();

        // // console.log('jlhPenghasilan ' + jlhPenghasilan)
        // // console.log('jlhDimohon ' + jlhDimohon)
        // // console.log('jangkaWaktu ' + jangkaWaktu)
        // // console.log('persenBungaPerTahun ' + parseFloat(persenBungaPerTahun))
        // // console.log('persenBungaPerBulan ' + persenBungaPerBulan)

        // var angsuranPerBulan = Math.round(PMT(persenBungaPerBulan, jangkaWaktu, jlhDimohon) * -1);
        // // console.log(angsuranPerBulan)

        // $('#angsuranPerBulan').val(angsuranPerBulan)
    });

    $("#minusJangkaWaktu").click(function () {
        var newValueMinus = parseInt($("#jlhJangkaWaktu").val()) - 1;

        if (newValueMinus < 1) return;

        $("#jlhJangkaWaktu").val(newValueMinus.toString());

        // var newValueMinus = parseInt($("#jlhPenghasilan").val()) - 1;
        // if (newValueMinus < 1) return;

        // $("#jlhPenghasilan").val(newValueMinus.toString() + ".000.000");

        // var jlhPenghasilan = Number(($('#jlhPenghasilan').val()).replace(/[^0-9]+/g, ""));
        // var jlhDimohon = Number(($('#jlhDimohon').val()).replace(/[^0-9]+/g, ""));
        // var jangkaWaktu = Number(($('#jlhJangkaWaktu').val()).replace(/[^0-9]+/g, ""));
        // var persenBungaPerTahun = Number($('#persenBunga').val()) / 100;
        // // var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(2));
        // var persenBungaPerBulan = Number((persenBungaPerTahun / 12).toFixed(4));

        // var angsuranPerBulan = Math.round(PMT(persenBungaPerBulan, jangkaWaktu, jlhDimohon) * -1);
        // // console.log(angsuranPerBulan)

        // $('#angsuranPerBulan').val(angsuranPerBulan)
        setValueAngsuran();
    });

    // mengatur jangka waktu kredit

    $("#nasabahBaruField").hide();
    $("#nasabahLamaField").hide();

    $("#punyaNorek").on("change", function () {
        var val = $(this).val();

        // console.log(val)
        // cek dia nasabah lama
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

    // $('#form-test').validate({
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

            // Focus first name
            if (stepIndex == 1) {
                setTimeout(() => {
                    $("#first-name").focus();
                }, 0);
            }
        }
    );

    $("#smartwizard").on("initialized", function (e) {
        console.log("initialized");

        // console.log('anukan');

        // $('#smartwizard').smartWizard("reset");

        // // Reset form
        // document.getElementById("form-1").reset();
        // document.getElementById("form-2").reset();
        // document.getElementById("form-3").reset();
        // document.getElementById("form-4").reset();
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

    // $('#smartwizard').on("leaveStep", function(e, anchorObject, stepIndex, stepNumber, stepDirection) {
    //     var elmForm = $('#form-step-' + stepIndex);

    //     // console.log(elmForm)

    //     console.log('Navigated to stepIndex ' + stepIndex + ' moving in stepDirection ' + stepDirection);

    //     // var anu = 5
    //     // if (stepDirection == 'forward' && elmForm) {

    //     //     console.log($('#form-test').validate())
    //     //     console.log($('#form-test').valid())
    //     //     if ($('#form-test').valid()) {
    //     //         return true;
    //     //     } else {
    //     //         return false;
    //     //     }
    //     // }

    //     // return checkForm($('#nama').val());
    //     // console.log($('#form-test').valid());

    //     // console.log(confirm("Do you want to leave the step " + stepNumber + "?"));
    //     // console.log("stepNumber " + stepNumber)
    //     // console.log("stepDirection " + stepDirection)

    //     // var step = [{
    //     //         'number': 0,
    //     //         'url': 'step-1'
    //     //     },
    //     //     {
    //     //         'number': 1,
    //     //         'url': 'step-2'
    //     //     },
    //     //     {
    //     //         'number': 2,
    //     //         'url': 'step-3'
    //     //     },
    //     // ]
    //     // if (stepNumber == 0) {
    //     //     console.log('step-1')
    //     // } else if (stepNumber == 1) {
    //     //     console.log('step-2')

    //     // }
    //     // return false;
    //     // var test =
    //     // $.ajax({
    //     //     type: "GET",
    //     //     // dataType: "html",
    //     //     url: "http://127.0.0.1:8000/api/step-1",
    //     //     data: {
    //     //         nama: $('#nama').val(),
    //     //     },

    //     //     success: function(msg) {
    //     //         console.log(msg)

    //     //         if (msg.rc == "00") {
    //     //             console.log('berhasil')
    //     //                 // return true;
    //     //                 // return true;
    //     //                 // $("#smartwizard").smartWizard("next");

    //     //         } else {
    //     //             console.log('gagal')
    //     //         }
    //     //         // return 'tidak';
    //     //         // return false;

    //     //     }

    //     // });
    //     // return true;

    // })
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

    $("#smartwizard").on(
        "leaveStep",
        function (e, anchorObject, currentStepIdx, nextStepIdx, stepDirection) {
            // Validate only on forward movement

            if (stepDirection == "forward") {
                let form = document.getElementById(
                    "form-" + (currentStepIdx + 1)
                );

                if (form) {
                    // if (!form.checkValidity()) {
                    //     form.classList.add('was-validated');
                    //     $('#smartwizard').smartWizard("setState", [currentStepIdx], 'error');
                    //     $("#smartwizard").smartWizard('fixHeight');
                    //     // console.log(dataForm.get)
                    //     return false;
                    // }

                    // console.log(listAgunan);

                    $("#smartwizard").smartWizard(
                        "unsetState",
                        [currentStepIdx],
                        "error"
                    );
                }
            }

            // $('#smartwizard').data('smartWizard')._showStep(1);

            // setTimeout(function() {
            //     // $('#smartwizard').data('smartWizard')._showStep(0);

            //     $("#smartwizard").data('smartWizard');
            // }, 50);
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

    //   closeDetailAgunan
    //   $("#addTandaTangan").click(function() {

    //     modalTandaTangan.show();

    // });

    //remove fields group
    $("#formAgunan").on("click", "a[id^='remove']", function () {
        $(this).parents("div.col-sm-12").remove();

        var counter = $("[id^='agunan']", $("#formAgunan")).length;

        // console.log('counter '+counter)
        console.log("total agunan " + counter--);

        $("#totalAgunan").val(counter--);

        // addElement($("#formAgunan"))
    });

    //   $("#formAgunan").on("click", "input[type='radio']", showHidden);
});

function showReviewPengajuan() {
    console.log(imageKTPReview);
    console.log("foto tempat usaha" + imageFotoUsaha);
    // const image = document.querySelector('#fotoKTP');

    const reviewFotoKTP = document.querySelector(".reviewGambarKTP");

    let panjangAgunan = listAgunan.length;
    console.log("panjang agunan" + panjangAgunan);
    // var testAgunan =[];

    let htmlAgunan = [];

    for (var i = 0; i < panjangAgunan; i++) {
        // console.log('agunan' +listAgunan[i]['jenisDokumenAgunan'])

        htmlAgunan += `
        <div class="col-sm-6">

            <h3>Agunan - ${i + 1}</h3>
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
