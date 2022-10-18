const urlMain = "http://192.168.177.27:8000/";
// const urlMain = "http://127.0.0.1:8000/";


function sendOTP(form_data) {
    Swal.fire({
        title: 'Yakin Untuk mengirim pengajuan ?',
        text: 'Pilih "Ya" untuk mengajukan ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya , kirim pengajuan'
    }).then((result) => {
        if (result.isConfirmed) {



            if ($('#notelp1').val() == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Maaf...',
                    text: 'Mohon masukkan nomor telepon anda ',

                })
                return false;
            } else {

                var email = ($('#email').val());
                var notelp1 = ($('#notelp1').val()).replace(/[^0-9]/g, "");
                var notelp2 = ($('#notelp2').val()).replace(/[^0-9]/g, "");
                var nik = ($('#nik').val());

                $.ajax({
                    type: 'POST',
                    url: urlMain + 'api/send-otp',
                    data: {
                        email: email,
                        notelp1: notelp1,
                        notelp2: notelp2,
                        noNIK: nik,
                    },
                    success: function(data) {
                        // console.log(data);

                    },

                });

                let timerInterval
                var duration = 60 * 5;
                var timer = duration,
                    minutes, seconds;

                Swal.fire({
                    timer: duration * 1000,


                    title: 'Masukkan Kode OTP Anda',
                    input: 'text',
                    html: 'Kode OTP akan terkirim lewat WA / Email </br> <b>05:00</b> ',
                    inputLabel: '',
                    input: 'number',
                    inputAttributes: {
                        maxlength: 6,
                    },
                    // timerProgressBar: true,
                    // showLoaderOnConfirm: true,
                    confirmButtonText: 'Kirim',
                    cancelButtonText: 'Batalkan',
                    showCancelButton: true,
                    inputPlaceholder: '_ _ _ _ _ _ ',


                    didOpen: () => {


                        const display = Swal.getHtmlContainer().querySelector('b')


                        timerInterval = setInterval(function() {
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
                        clearInterval(timerInterval)
                    }
                })

                .then((result) => {


                    if (result.isConfirmed) {

                        $.ajax({
                            url: urlMain + 'api/check-otp',
                            type: "POST",
                            data: {
                                kodeKirim: result.value,
                                noNIK: nik,
                            },

                            beforeSend: function() {
                                // $("#submit").prop('disabled', true);
                                // $('#loading').click();
                                // console.log('menunggu....')
                                let timerInterval
                                Swal.fire({
                                    title: 'Loading.....',
                                    html: 'Validasi OTP..',
                                    timer: 20000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                    // didOpen: () => {
                                    //     Swal.showLoading()
                                    //     const b = Swal.getHtmlContainer().querySelector('b')
                                    //     timerInterval = setInterval(() => {
                                    //         b.textContent = Swal.getTimerLeft()
                                    //     }, 100)
                                    // },
                                    willClose: () => {
                                        clearInterval(timerInterval)
                                    }
                                }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    // if (result.dismiss === Swal.DismissReason.timer) {
                                    //     console.log('I was closed by the timer')
                                    // }
                                })
                            },
                            complete: function() {
                                // $("#submit").prop('disabled', false);
                                // $(".close_loading").click();

                                // console.log('selesai')

                            },
                            success: function(rest) {
                                // return false;
                                // console.log('data yang dikirim' + dataSend.kodeKirim)
                                // console.log('sukses')
                                // console.log('sukses')
                                // console.log(rest)
                                if (rest.rc != '00') {

                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Maaf...',
                                        text: rest.message,

                                    })
                                } else {
                                    // Swal.fire({
                                    //     icon: 'success',
                                    //     title: 'Selamat...',
                                    //     text: rest.message,

                                    // })
                                    $.ajax({
                                        url: 'http://192.168.177.27/pms_ritel/index.php/apicontroller/inserttomasterdebit',
                                        type: "POST",
                                        data: form_data,
                                        cache: false,
                                        contentType: false,
                                        processData: false,
                                        success: function(msg) {
                                            // $('#check_form').submit();
                                            var response = JSON.parse(msg);
                                            // return false;
                                            if (response.rc == '01') {

                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Gagal... ',
                                                    text: response.message,

                                                })
                                            } else {
                                                $('#check_form').submit()
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Berhasil dikirim...',
                                                    text: response.message,

                                                })

                                                $.ajax({
                                                    type: 'POST',
                                                    url: urlMain + 'api/send-success-pengajuan',
                                                    data: form_data,
                                                    cache: false,
                                                    contentType: false,
                                                    processData: false,
                                                    success: function(data) {
                                                        console.log(data);

                                                    },

                                                });
                                                // kirim ke sini notifikasinya


                                            }
                                            // console.log(rest)


                                        }
                                    });
                                    //return false;




                                }



                            },
                            error: function(xhr, ajaxOptions, thrownError) {
                                // alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ada Kesalahan ' + thrownError + xhr.status + "\n" + xhr.responseText
                                        // footer: '<a href="">Why do I have this issue?</a>'
                                })
                            }
                        });

                        // Swal.fire({
                        //     // title: `${result.value.login}'s avatar`,
                        //     // title: `${result.value}`,
                        //     title: `Mohon Masukkan Kode OTP Anda`,
                        //     //     // imageUrl: result.value.avatar_url
                        // })
                    }

                })

            }

            // var CustomerKey = 1234; //your customer key value.
            // Swal.fire({
            //     title: "Add Note",
            //     input: "textarea",
            //     showCancelButton: true,
            //     confirmButtonColor: "#1FAB45",
            //     confirmButtonText: "Save",
            //     cancelButtonText: "Cancel",
            //     buttonsStyling: true
            // }).then(function() {
            //         $.ajax({
            //             type: "POST",
            //             url: urlMain + 'api/send-otp',
            //             data: { 'kodeKirim': CustomerKey },
            //             cache: false,
            //             success: function(response) {
            //                 swal(
            //                     "Sccess!",
            //                     "Your note has been saved!",
            //                     "success"
            //                 )
            //             },
            //             failure: function(response) {
            //                 swal(
            //                     "Internal Error",
            //                     "Oops, your note was not saved.", // had a missing comma
            //                     "error"
            //                 )
            //             }
            //         });
            //     },
            //     function(dismiss) {
            //         if (dismiss === "cancel") {
            //             swal(
            //                 "Cancelled",
            //                 "Canceled Note",
            //                 "error"
            //             )
            //         }
            //     })

        }
    })
}

function checkFormValidation() {
    var file_ktp = $('#fotoKTP')[0].files[0];
    var file_tempat_usaha = $('#fotoTempatUsaha')[0].files[0];
    var form_data = new FormData();

    form_data.append('fotoKTP', file_ktp);
    form_data.append('fotoTempatUsaha', file_tempat_usaha);

    form_data.append('nama', $('#nama').val());
    form_data.append('noNIK', $('#nik').val());

    form_data.append('email', $('#email').val());
    form_data.append('notelp1', $('#notelp1').val());
    form_data.append('jenisKelamin', $('#jenisKelamin').val());
    form_data.append('notelp2', $('#notelp2').val());
    form_data.append('tgl_lahir', $('#tanggalLahir').val());
    form_data.append('usahaKabupaten', $('#kota').val());
    form_data.append('usahaKecamatan', $('#kecamatan').val());
    form_data.append('usahaDesaKel', $('#desakel').val());
    form_data.append('detailAlamat', $('#detailAlamat').val());
    form_data.append('jlhPengajuan', $('#jlhPengajuan').val());
    form_data.append('jangkaWaktu', $('#jangkaWaktu').val());
    form_data.append('jnsUsaha', $('#listTujuanKredit').val());
    form_data.append('namaCabang', $('#namaCabang').val());
    form_data.append('ketIzinUsaha', $('#jenisPembiayaan').val());
    form_data.append('npwp', $('#npwp').val());
    form_data.append('cekPengajuan', $('#setujuKirim').val());
    form_data.append('id_petugas', $('#id_petugas').val());
    form_data.append('nama_petugas', $('#nama_petugas').val());

    // console.log(file_ktp);

    $.ajax({
        url: urlMain + 'api/check-form',
        type: "POST",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            let timerInterval
            Swal.fire({
                title: 'Loading.....',
                // html: 'Sedang Validasi Form  ..',
                timer: 30000,
                showConfirmButton: false,
                timerProgressBar: true,

            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })

        },
        complete: function() {
            // $("#submit").prop('disabled', false);
            // $(".close_loading").click();

            // console.log('selesai')

        },
        success: function(rest) {
            // console.log(rest);
            if (rest.rc == '01') {

                var listMessage = rest.message;
                var resMessage = "";;

                $.each(listMessage, function(i, member) {
                    // console.log(member);
                    for (var i in member) {
                        // console.log(member[i]);
                        // resMessage.push(member[i]);
                        resMessage += "<p>" + member[i] + "</p>";
                    }
                });
                // console.log(typeof listMessage);



                Swal.fire({
                    icon: 'error',
                    title: 'Maaf...',
                    html: "<p>" + resMessage + "</p>",

                })

            } else {
                sendOTP(form_data);
                // console.log(sendOTP());
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Selamat....',
                //     text: 'Form Sudah Lengkap',

                // })
            }




        },
        error: function(xhr, ajaxOptions, thrownError) {
            // alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            // console.log(thrownError);
            Swal.fire({
                icon: 'error',
                title: 'Runtime Excepion',
                html: "<p>" + thrownError + "</p>" + "<p>" + xhr.status + "</p>" + "<p>" + xhr.status + "</p>",

            })

        }
    });


    return false;



}


document.getElementById('notelp1').addEventListener('keyup', function(evt) {
    var phoneNumber = document.getElementById('notelp1');
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
});
document.getElementById('notelp2').addEventListener('keyup', function(evt) {
    var phoneNumber = document.getElementById('notelp2');
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
});



// We need to manually format the phone number on page load
document.getElementById('notelp1').value = phoneFormat(document.getElementById('notelp1').value);
document.getElementById('notelp2').value = phoneFormat(document.getElementById('notelp2').value);

// A function to determine if the pressed key is an integer
function numberPressed(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 36 || charCode > 40)) {
        return false;
    }
    return true;
}


// A function to format text to look like a phone number
function phoneFormat(input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 13);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    if (size == 0) {
        input = input;
    } else if (size < 5) {
        input = '' + input;
    } else if (size < 8) {
        input = '' + input.substring(0, 4) + '-' + input.substring(4, 8);
    } else {
        input = '' + input.substring(0, 4) + '-' + input.substring(4, 8) + '-' + input.substring(8, 14);
    }
    return input;
}





$(document).ready(function() {

    // $("#wizard").steps({
    //     headerTag: "h4",
    //     bodyTag: "section",
    //     transitionEffect: "fade",
    //     enableAllSteps: true,
    //     transitionEffectSpeed: 500,
    //     onStepChanging: function(event, currentIndex, newIndex) {
    //         if (newIndex === 1) {
    //             $('.steps ul').addClass('step-2');
    //         } else {
    //             $('.steps ul').removeClass('step-2');
    //         }
    //         if (newIndex === 2) {
    //             $('.steps ul').addClass('step-3');
    //         } else {
    //             $('.steps ul').removeClass('step-3');
    //         }

    //         if (newIndex === 3) {
    //             $('.steps ul').addClass('step-4');
    //             $('.actions ul').addClass('step-last');
    //         } else {
    //             $('.steps ul').removeClass('step-4');
    //             $('.actions ul').removeClass('step-last');
    //         }
    //         return true;
    //     },
    //     labels: {
    //         finish: "Order again",
    //         next: "Next",
    //         previous: "Previous"
    //     }
    // });
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function() {
        $(this).parent().addClass('checked');
        $(this).parent().prevAll().addClass('checked');
        $(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function() {
        $("#wizard").steps('next');
    })
    $('.backward').click(function() {
            $("#wizard").steps('previous');
        })
        // Checkbox
    $('.checkbox-circle label').click(function() {
        $('.checkbox-circle label').removeClass('active');
        $(this).addClass('active');
    })



    $("#jangkaWaktuField").hide();
    $("#nasabahBaruField").hide();
    $("#nasabahLamaField").hide();
    $("#formAgunan").hide();



    $("#jumlahPengajuanField").hide();

    $('.usahaKabupaten1').select2({
        theme: 'bootstrap4',
        placeholder: '-- Pilih Kabupaten / Kota--',
        language: "id"

    });
    $('.usahaKecamatan1').select2({
        placeholder: '-- Pilih Kecamatan --',
        theme: 'bootstrap4',

    });
    $('.usahaDesaKel1').select2({
        placeholder: '-- Pilih Desa / Kelurahan --',
        theme: 'bootstrap4',

    });
    $('.tujuan-kredit').select2({
        placeholder: '-- Pilih Tujuan Kredit --',
        theme: 'bootstrap4',

    });
    $('.nama-cabang').select2({
        placeholder: '-- Pilih nama cabang --',
        theme: 'bootstrap4',

    });


    $('#punyaNorek').on('change', function() {

        var val = $(this).val();
        if (val == "1") {
            $("#nasabahBaruField").hide();
            $("#nasabahLamaField").show();
            // $('#inputNorek').show();
            // console.log('jangan')
        } else if (val == "0") {
            $("#nasabahBaruField").show();
            $("#nasabahLamaField").hide();
            // $('#inputNorek').hide();
        }


    });
    $('#jenisKeperluan').on('change', function() {

        var val = $(this).val();

        console.log(val);
        return false

    });

    $('#cekAgunan').on('change', function() {

        var val = $(this).val();

        if (val = "1") {
            // $('#inputNorek').show();
            $("#formAgunan").show();
        } else if (val == "0") {
            // $('#inputNorek').hide();
            $("#formAgunan").hide();
        }
    });


    $(".usahaKabupaten1").change(function() {
        // $("img#load1").show();
        var val_kabupatenkota = $(this).val();
        // console.log(val_kabupatenkota);
        $.ajax({
            type: "GET",
            dataType: "html",
            url: urlMain + 'kecamatan',
            data: {
                kabkota: this.value,
            },

            success: function(msg) {

                $("select#kecamatan").html(msg);

                getAjaxDesaKel();

            }
        });
    });

    $('#kecamatan').change(getAjaxDesaKel);

    function getAjaxDesaKel() {
        var id_kecamatan = $("#kecamatan").val();
        // console.log('id_kecamatan' + id_kecamatan);
        $.ajax({
            type: "GET",
            dataType: "html",
            url: urlMain + 'desakel',
            data: {
                kecamatan: id_kecamatan,
            },

            success: function(msg) {
                // console.log(msg)
                $("select#desakel").html(msg);


            }
        });
    }




    // $('#namaCabang').on('change', function() {


    //     var idCabang = $(this).val();
    //     // console.log(idCabang)
    //     $.ajax({
    //         type: "POST",
    //         dataType: "html",
    //         url: 'http://192.168.177.27/pms_ritel/index.php/apicontroller/getaocabang',
    //         data: {
    //             idCabang: idCabang,
    //         },

    //         success: function(msg) {
    //             var res = JSON.parse(msg)



    //             if (res.rc == '01') {

    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Maaf...',
    //                     text: res.message,
    //                 })
    //             } else {
    //                 $('#id_petugas').val(res.data.id_ao);
    //                 $('#nama_petugas').val(res.data.nama_ao);
    //             }
    //         }
    //     });

    // });



    $('#nama').on('input', function() {
        $(this).val($(this).val().toUpperCase());
    });

    $('#setujuKirim').on('click', function() {

        if ($(this).is(":checked")) {
            $(this).val('1');

        } else {
            $(this).val('');

        }

    })






    var rangePenghasilan = $('.input-range-penghasilan'),
        valuePenghasilan = $('.range-penghasilan');
    valuePenghasilan.html(rangePenghasilan.attr('value'));
    rangePenghasilan.on('input', function() {
        valuePenghasilan.html(this.value);
    });


    //$("#checkValidation").focus();tanggalLahir
    var date = new Date();
    $('#tanggalLahir').datepicker({
        yearRange: '1900:2022',
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        //minDate:new Date(limitDatePicker),
        maxDate: new Date()
    }).datepicker("setDate", date);




    $('#email').on('input', function() {
        var val = $(this).val();

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(val)) {
            $(this).addClass("is-invalid");
            if ($(this).next("#lengthCharacter").length) {

            } else {

                $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Email anda tidak sesuai format</label></div>');
            }


        } else {
            $(this).removeClass("is-invalid");
            $(this).next("#lengthCharacter").remove();
        }



    });

    // $('#jlhPengajuan').on('change', function() {
    //     console.log($(this).val())
    // });


    // mengatur bagian penghasilan bersih 

    $("#plusPenghasilan").click(function() {

        // console.log('test')

        // var penghasilan = 3000000;
        // var limit = 15;
        // var valueCurrency = Number(($('#jlhPengajuan').val()).replace(/[^0-9]+/g, ""));

        // if (valueCurrency > penghasilan) {
        //     console.error('Pinjaman melebihi penghasilan')
        // } else {
        //     console.log('oke');
        // }

        // var kreditType = $('#jenisPembiayaan').val();
        // var limitPengajuan = parseInt($('#limitPengajuan').val());

        // console.log(limitPengajuan);

        // if (kreditType == '1') {

        //     // console.log(kreditType)



        // } else if (kreditType == '2') {

        //     $("#jlhPengajuan").val(limitPengajuan.toString() + ".000.000");



        // }

        var limirPengajuan = 100;
        var newValuePlus = parseInt($("#jlhPenghasilan").val()) + 1;
        if (newValuePlus > limitPengajuan) return;

        // if (newValuePlus < limit) console.log(newValuePlus);




        $("#jlhPenghasilan").val(newValuePlus.toString() + ".000.000");

    });


    $("#minusPenghasilan").click(function() {

        var newValueMinus = parseInt($("#jlhPengajuan").val()) - 1;
        if (newValueMinus < 1) return;

        $("#jlhPengajuan").val(newValueMinus.toString() + ".000.000");
    });


    $('#pointsPenghasilan').on('input', function() {

        var counter = $(this).val();

        $('#jlhPengajuan').val(counter + ".000.000");


    });
    // / batas mengatur bagian penghasilan bersih








    $("#notelp1, #notelp2").on('input', function() {

        var value = ($(this).val());


        if (value.charAt(0) != '0') {
            // console.log('tidak sesuai format');
            $(this).attr('maxlength', '1');

            if ($(this).next("#checkFormat").length) {


            } else {
                // console.log(value.charAt(0))
                // if (value.charAt(1) === '0') {
                //     console.log('tidak sesuai format')
                // }

                $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="checkFormat"> <label> Penulisan wajib diawali angka 0 Contoh: 08 xx - xxxx - xxxx </label> </div>');

                // $(this).next("#checkFormat").remove()
                $(this).next("#lengthCharacterPhone").remove();
            }
        } else {


            if (value.charAt(1) != '8') {
                // console.log('tidak sesuai format')
                $(this).attr('maxlength', '2');
                if ($(this).next("#formatPhone").length) {
                    // $(this).next("#formatPhone").remove();
                } else {
                    $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="formatPhone"><label>Nomor Telepon Anda wajib diawali dengan 08</label></div>');

                }

            } else {
                $(this).next("#formatPhone").remove()
                    // console.log(value.length);
                $(this).attr('maxlength', '16');
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
                            $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacterPhone"><label>Wajib minimal 11 karakter</label></div>');
                        }


                    }
                } else {
                    $(this).next("#lengthCharacterPhone").remove();
                    $(this).next("#checkFormat").remove()
                    $(this).removeClass("is-invalid");
                }

                $(this).next("#checkFormat").remove();
                $(this).next("#formatPhone").remove();
            }

        }


    });
    $("#notelp2").on('change', function() {

        var value = ($(this).val());

        if ($(this).next("#checkFormat").length) {
            $(this).next("#checkFormat").remove();
        }


        if ($(this).next("#lengthCharacterPhone").length) {
            $(this).next("#lengthCharacterPhone").remove();
        }



    });

    $("#npwp").on('change', function() {

        if ($(this).next("#lengthCharacter").length) {
            $(this).next("#lengthCharacter").remove();
        }

        if ($(this).next("#checkFormat").length) {
            $(this).next("#checkFormat").remove();
        }

    });





    $('#nik').on('input', function() {
        //var len = max_length - $(this).val().length;
        var c = this.selectionStart,
            r = /[^0-9]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }

        if (v.length < 16) {
            if ($(this).next("#lengthCharacter").length) {

                $(this).addClass("is-invalid");
            } else {
                if ($(this).next("#lengthCharacter").length) {
                    $(this).next("#lengthCharacter").remove();
                } else {

                    $(this).addClass("is-invalid");
                    $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Wajib minimal 16 angka</label></div>');
                }

            }
            //$(this).after('<div class="text-white font-weight-bold" id="alertwarning"><label><b>Wajib 16 karakter</b></label></div>');

        } else {
            $(this).next("#lengthCharacter").remove();
            $(this).removeClass("is-invalid");
            return true;
        }
        //$(this).next("#lengthCharacter").remove();


        this.setSelectionRange(c, c);

    });

    $('#npwp').on('input', function() {

        var value = ($(this).val());

        //var len = max_length - $(this).val().length;
        var c = this.selectionStart,
            // r = /[^0-9]/gi,
            r = /[^0-9]/gi,

            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            // $(this).val(v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, ''));
            c--;
        }

        if (value.charAt(0) == '0') {
            // console.log('tidak sesuai format');
            $(this).attr('maxlength', '1');

            if ($(this).next("#checkFormat").length) {


            } else {
                // console.log(value.charAt(0))
                // if (value.charAt(1) === '0') {
                //     console.log('tidak sesuai format')
                // }

                $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="checkFormat"> <label> Penulisan NPWP tidak tidak diawali angka 0  </label> </div>');

                // $(this).next("#checkFormat").remove()
                $(this).next("#lengthCharacterPhone").remove();
            }
        } else {
            $(this).attr('maxlength', '16');
            $(this).next("#checkFormat").remove();
            if (v == '') {
                $(this).next("#lengthCharacter").remove();
            }

            if (v.length < 15) {
                if ($(this).next("#lengthCharacter").length) {
                    //$(this).next("#lengthCharacter").remove();
                } else {
                    $(this).addClass("is-invalid");
                    $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="lengthCharacter"><label>Wajib 15 karakter</label></div>');
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



    $('#email').on('input', function() {
        var c = this.selectionStart,
            r = /[^a-z0-9@_.]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }


        this.setSelectionRange(c, c);


    });

    $('#nama').on('input', function() {
        var c = this.selectionStart,
            r = /[^a-z ]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }


        this.setSelectionRange(c, c);


    });

    $('#detailAlamat').on('input', function() {
        $(this).val($(this).val().toUpperCase());
    });


    $('#detailAlamat').on('input', function() {



        var c = this.selectionStart,
            r = /[^a-z0-9 .]/gi,
            v = $(this).val();

        if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
        }


        this.setSelectionRange(c, c);

    });








    $("#nama, #nik, #notelp1,#jenisKelamin, #fotoKTP,#tanggalLahir,#detailAlamat,#jenisPembiayaan,#jlhPengajuan,#jangkaWaktu,#namaCabang, #jnsUsaha,#fotoTempatUsaha,#kota,#kecamatan,#desakel").on('blur', function() {

        var value = $(this).val();

        if (value.length == 0) {
            $(this).next("#lengthCharacter").remove();

            if ($(this).next("#alertwarning").length) {

            } else {
                if ($(this).next("#lengthCharacter").length) {
                    $(this).next("#lengthCharacter").remove();

                }
                $(this).addClass("is-invalid");

                $(this).after('<div class="text-white font-weight-bold alert-warning px-2 mt-1" id="alertwarning"><label>Wajib diisi</label></div>');
            }
        } else {
            $(this).removeClass("is-invalid");
            $(this).next("#alertwarning").remove();
            $(this).next("#checkFormat").remove();


            return true;
        }

        return false;
    });

    $('#jenisPembiayaan').on('change', function() {

        var kreditType = $(this).val();

        var jangkaWaktuElement = document.querySelector('#jangkaWaktuField')

        // jangkaWaktu.disabled = false;

        // jangkaWaktu.remove();


        if (kreditType == '1') {
            $("#jangkaWaktuField").show();
            $("#jumlahPengajuanField").show();

            $('#points').attr('max', 500);
            $('#limitPengajuan').val("500")

            jangkaWaktu.innerHTML = `
            <option value='1'>1 tahun </option>
            <option value='2'>2 tahun </option>
            <option value='3'>3 tahun </option>
            <option value='4'>4 tahun </option>
            <option value='5'>5 tahun </option>
                `;




        } else if (kreditType == '2') {

            $("#jangkaWaktuField").show();
            $("#jumlahPengajuanField").show();
            $('#limitPengajuan').val("15")
            $('#points').attr('max', 15);
            // jangkaWaktu.show();
            jangkaWaktu.innerHTML = `
                <option value='1'>1 tahun </option>
                <option value='2'>2 tahun </option>
                <option value='3'>3 tahun </option>
               `;
            $("#jlhPengajuan").val((15).toString() + ".000.000");


        } else {
            $("#jangkaWaktuField").hide();
            $("#jumlahPengajuanField").hide();
        }



    })




    $('.uang').mask('000.000.000', {
        reverse: true

    });



});


function loadTujuanKredit() {
    $.ajax({
        type: 'GET',
        url: urlMain + 'tujuankredit',


        success: function(data) {

            // return false;
            // const datas = JSON.parse(data);
            const items = data.data;
            const kota = document.querySelector('#listTujuanKredit');

            // console.log(items);
            items.forEach((item) => {

                kota.innerHTML += `
                <option value='${item.nama_tujuan}'>${item.nama_tujuan}</option>
                `;
            });
            // console.log(data);

        }
    });
}

// loadDataKabupaten();
// loadTujuanKredit();


function previewImageKTP() {
    const image = document.querySelector('#fotoKTP');

    const imgPreview = document.querySelector('.img-preview-ktp')


    imgPreview.style.display = 'block'

    const oFReader = new FileReader();

    oFReader.readAsDataURL(image.files[0]);

    oFReader.onload = function(oFREvent) {
        imgPreview.src = oFREvent.target.result;
    }

}

function previewImageTempatUsaha() {
    const image = document.querySelector('#fotoTempatUsaha');

    const imgPreview = document.querySelector('.img-preview-tempat-usaha')


    imgPreview.style.display = 'block'

    const oFReader = new FileReader();

    oFReader.readAsDataURL(image.files[0]);

    oFReader.onload = function(oFREvent) {
        imgPreview.src = oFREvent.target.result;
    }

}