<!doctype html>
<html lang="en">

<head>
    <title>Form Pengajuan Kredit - Bank Sumut</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootrap for the demo page -->
    <link href="{{ asset('plugins/bootstrap/bootstrap.min.css') }}" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <link href="{{ asset('plugins/jquery-ui/jquery-ui.css') }}" rel="stylesheet">

    <!-- Animate CSS for the css animation support if needed -->
    <link href="{{ asset('plugins/animate/animate.min.css') }}" rel="stylesheet" />

    <!-- Include SmartWizard CSS -->
    <link rel="stylesheet" href="{{ asset('style/main.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css') }}" />





    <link rel="stylesheet" href="{{ asset('plugins/bootstrap/bootstrap-icons.css') }}">
    <link href="{{ asset('plugins/smartwizard/smart_wizard_all.min.css') }}" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="{{ asset('plugins/select2/css/select2.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css') }} ">


</head>

<body>

    <div class="container mt-5">


        <div class="mb-5 border-bottom">


            <div class="float-end text-muted me-3 mt-2">
                Step number: <span id="sw-current-step"></span> of <span id="sw-total-step"></span>
            </div>

            <h1>Form Pengajuan Kredit - Bank Sumut</h1>

            <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header border-bottom">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Smart Wizard Settings</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                    <div class="mb-2">
                        <label for="theme_selector" class="form-label">Theme</label>
                        <select id="theme_selector" class="form-select form-select-sm" aria-label="">
                            <option value="basic">Basic (Default)</option>
                            <option value="arrows" selected>Arrows</option>
                            <option value="square">Square</option>
                            <option value="round">Round</option>
                            <option value="dots">Dots</option>
                        </select>
                        <div class="form-check form-check-inline ">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="is_justified" value="1" checked>
                            <label class="form-check-label align-middle" for="is_justified">Justified</label>
                        </div>
                    </div>

                    <div class="mb-2">
                        <label for="animation" class="form-label">Transition</label>
                        <select id="animation" class="form-select form-select-sm" aria-label="">
                            <optgroup label="Buit-in Animations">
                                <option value="none">None</option>
                                <option value="fade">Fade</option>
                                <option value="slideHorizontal" selected>Slide Horizontal</option>
                                <option value="slideVertical">Slide Vertical</option>
                                <option value="slideSwing">Slide Swing</option>
                            </optgroup>
                            <optgroup label="CSS Animations (External Plugin)">
                                <option value="cssSlideH">Slide Horizontal</option>
                                <option value="cssSlideV">Slide Vertical</option>
                                <option value="cssFade">Fade</option>
                                <option value="cssFadeSlideH">Fade + Slide Horizontal</option>
                                <option value="cssFadeSlideV">Fade + Slide Vertical</option>
                                <option value="cssFadeSlideCorner1">Fade + Slide Corner 1</option>
                                <option value="cssFadeSlideCorner2">Fade + Slide Corner 2</option>
                                <option value="cssBounce">Bounce</option>
                                <option value="cssBounceSlideH">Bounce + Slide Horizontal</option>
                                <option value="cssBounceSlideV">Bounce + Slide Vertical</option>
                                <option value="cssBackSlideH">Back + Slide Horizontal</option>
                                <option value="cssBackSlideV">Back + Slide Vertical</option>
                                <option value="cssFlipH">Flip Horizontal</option>
                                <option value="cssFlipV">Flip Vertical</option>
                                <option value="cssLightspeed">Lightspeed</option>
                                <option value="cssRotate">Rotate</option>
                                <option value="cssRotateClock">Rotate Clockwise</option>
                                <option value="cssRotateAntiClock">Rotate Anti Clockwise</option>
                                <option value="cssZoom">Zoom</option>
                            </optgroup>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label for="theme_colors" class="form-label">Colors</label>
                        <select id="theme_colors" class="form-select form-select-sm" aria-label="">
                            <!-- <option value="custom" selected>Custom</option> -->
                        </select>
                    </div>
                    <fieldset class="mb-2" style="display: none;" id="color-list">
                        <!-- <legend class="col-form-label col-sm-2 col-form-label">Colors</legend> -->

                    </fieldset>
                    <!-- </div>
            
            <div class="col"> -->
                    <div class="mb-2">
                        <h6 for="Anchor" class="form-label border-bottom">Anchor Settings</h6>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="anchor_navigation" value="1" checked>
                            <label class="form-check-label align-middle" for="anchor_navigation">Enable
                                Navigation</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="enableNavigationAlways" value="1">
                            <label class="form-check-label align-middle" for="enableNavigationAlways">Enable
                                Navigation Always</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="enableDoneState" value="1" checked>
                            <label class="form-check-label align-middle" for="enableDoneState">Enable Done
                                State</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="unDoneOnBackNavigation" value="1">
                            <label class="form-check-label align-middle" for="unDoneOnBackNavigation">Undone On Back
                                Navigation</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="enableDoneStateNavigation" value="1" checked>
                            <label class="form-check-label align-middle" for="enableDoneStateNavigation">Enable Done
                                State Navigation</label>
                        </div>
                    </div>

                    <div class="mb-2">
                        <h6 for="Toolbar" class="form-label border-bottom">Toolbar Settings</h6>
                        <label class="form-check-label align-middle-">Position: </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="toolbar-position" id="toolbar-position-none" value="none">
                            <label class="form-check-label" for="toolbar-position-none">none</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="toolbar-position" id="toolbar-position-top" value="top">
                            <label class="form-check-label" for="toolbar-position-top">top</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="toolbar-position" id="toolbar-position-bottom" value="bottom">
                            <label class="form-check-label" for="toolbar-position-bottom">bottom</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="toolbar-position" id="toolbar-position-both" value="both" checked>
                            <label class="form-check-label" for="toolbar-position-both">both</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="toolbar-showNextButton" value="1" checked>
                            <label class="form-check-label align-middle" for="toolbar-showNextButton">Show Next
                                Button</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="toolbar-showPreviousButton" value="1" checked>
                            <label class="form-check-label align-middle" for="toolbar-showPreviousButton">Show
                                Previous Button</label>
                        </div>
                    </div>

                    <div class="mb-2">
                        <h6 for="Other" class="form-label border-bottom">Other Settings</h6>
                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="key_navigation" value="1" checked>
                            <label class="form-check-label align-middle" for="key_navigation">Keyboard
                                Navigation</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="back_button_support" value="1" checked>
                            <label class="form-check-label align-middle" for="back_button_support">Back Button
                                Support</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input align-middle option-setting-checkbox" type="checkbox" id="autoAdjustHeight" value="1" checked>
                            <label class="form-check-label align-middle" for="autoAdjustHeight">Auto Adjust
                                Height</label>
                        </div>
                    </div>

                    <div class="mb-2">
                        <h6 for="theme_selector" class="form-label border-bottom">External Controls</h6>
                        <button class="btn btn-secondary btn-sm" id="prev-btn" type="button">Previous</button>
                        <button class="btn btn-secondary btn-sm" id="next-btn" type="button">Next</button>
                        <button class="btn btn-danger btn-sm" id="reset-btn" type="button">Reset</button>

                        <div class="input-group input-group-sm mt-2">
                            <select class="form-select" id="got_to_step" aria-label="Select step number">
                                <option selected>Choose step...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>

                            <button class="btn btn-primary" id="btn-go-to" type="button">Go</button>
                            <button class="btn btn-warning" id="btn-go-to-forced" type="button">Force Go</button>
                        </div>
                    </div>

                    <div class="mb-2">
                        <h6 for="theme_selector" class="form-label border-bottom">State</h6>
                        <div class="input-group input-group-sm mt-2">
                            <select class="form-select" id="state_step_selection" aria-label="Select step number">
                                <option selected>Choose step...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>

                            <select class="form-select" id="state_selection" aria-label="Select state">
                                <option selected>Choose state...</option>
                                <option value="default">default</option>
                                <option value="active">active</option>
                                <option value="done">done</option>
                                <option value="disable">disable</option>
                                <option value="hidden">hidden</option>
                                <option value="error">error</option>
                                <option value="warning">warning</option>
                            </select>

                            <button class="btn btn-success" id="btn-state-set" type="button">Set</button>
                            <button class="btn btn-danger" id="btn-state-unset" type="button">Unset</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- SmartWizard html -->
        <div id="smartwizard">
            <ul class="nav nav-progress">
                <li class="nav-item">
                    <a class="nav-link" href="#step-1">
                        <div class="num">1</div> Data Diri
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#step-2">
                        <span class="num">2</span> Nomor Rekening
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#step-3">
                        <span class="num">3</span> Jenis Kredit
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="#step-4">
                        <span class="num">4</span> Agunan
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="#step-5">
                        <span class="num">5</span> Cek Pengajuan
                    </a>
                </li>
                {{-- <li class="nav-item">
                    <a class="nav-link " href="#step-5">
                        <span class="num">5</span> Cek Kembali
                    </a>
                </li> --}}
            </ul>


            <div class="tab-content">
                {{-- <form id="form-test"> --}}
                <div id="step-1" class="tab-pane" role="tabpanel" aria-labelledby="step-1">
                    <form id="form-1" class="row row-cols-1 ms-1 me-5 needs-validation" novalidate>
                        <div class="info-form p-3">

                            
                            <h3>Data Diri</h3>
                            <h5>(Mohon isi sesuai KTP)</h5>
                            {{-- {{ $sumber }} --}}
                            <div class="row mt-3 overflow-auto">

                                <div class="col-md-4 xs-6 my-2">
                                    <input type="hidden" id="source_name" value="{{ $sumber }}" />

                                    <div class="form-group">
                                        <label class="sr-only error">Nama <span class="text-danger font-weight-bold ">*</span></label>
                                        <input type="text" name="nama" class="form-control " placeholder="Nama Lengkap" id="nama" maxlength="35" required>
                                        <small>(Maksimal 35 karakter dan Sesuai KTP)</small>


                                    </div>



                                </div>
                                <div class="col-md-4 xs-6   my-2">
                                    <div class="form-group">
                                        <label class="sr-only">NIK <span class="text-danger font-weight-bold ">*</span></label>

                                        <input placeholder="NIK Sesuai KTP" minlength="16" maxlength="16" type="text" name="noNIK" class="form-control" id="nik" required>
                                        <small>(NIK Sesuai KTP)</small>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Email<span class="text-danger">*</span></label>
                                        <input type="email" name="email" class="form-control " id="email" placeholder="Masukkan Email" maxlength="35" email="true" required>
                                        <small>Maksimal 35 karakter</small>


                                    </div>
                                </div>
                                <div class="col-md-8 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Alamat <span class="text-danger">*</span></label>
                                        <textarea class="form-control" name="alamatDebitur" id="alamatDebitur" rows="3" required></textarea>
                                        <small>Sesuai dengan KTP </small>

                                    </div>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="sr-only">No. Handphone<span class="text-danger">*</span>
                                        </label>
                                        <input type="text" name="notelp1" id="notelp1" class="form-control" placeholder="mis: 08xx-xxxx-xxxx" id="notelp" required>
                                        <br /><small> (Pastikan nomor telepon aktif)</small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">

                                        <label class="sr-only">Jenis Kelamin <span class="text-danger">*</span></label>
                                        <select class="form-select  " name="jenisKelamin" aria-label="Default select example" id="jenisKelamin" required>
                                            <option value="" selected>----Jenis Kelamin-----</option>
                                            <option value="LAKI-LAKI">Laki-laki
                                            </option>
                                            <option value="PEREMPUAN">Perempuan
                                            </option>
                                        </select>


                                    </div>
                                </div>


                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Tanggal Lahir <span class="text-danger">*</span></label>
                                        <input type="text" name="tgl_lahir" class="form-control" placeholder="Masukkan tanggal lahir anda" id="tanggalLahir" required readonly>

                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">NPWP <small>(opsional)</small></label>
                                        <input type="text" name="npwp" class="form-control  " value="" placeholder="Masukkan Nomor NPWP" id="npwp" maxlength="15">



                                    </div>
                                </div>

                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Foto Selfie dengan KTP<span class="text-danger">*</span></label>
                                        {{-- <input type="file" name="fotoKTP" class="form-control"
                                            style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoKTP"
                                            onchange="previewImageKTP()" required> --}}
                                        <input type="file" name="fotoKTP" class="form-control" style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoKTP" required>
                                        <div class="row">
                                            <img class="img-preview-ktp img-fluid mt-1 col-sm-8" />
                                        </div>
                                        <small>File dalam bentuk JPG,PNG,JPEG </small>
                                        {{-- <button class="btn btn-danger" type="button">test</button> --}}
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Foto Tanda Tangan<span class="text-danger">*</span></label>
                                        {{-- <input type="file" name="fotoKTP" class="form-control"
                                            style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoKTP"
                                            onchange="previewImageKTP()" required> --}}
                                        <input type="file" name="fotoTandaTangan" class="form-control" style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoTandaTangan" required>
                                        <div class="row">
                                            <img class="img-preview-signature img-fluid mt-1 col-sm-8" />
                                        </div>
                                        <small>File dalam bentuk JPG,PNG,JPEG </small>
                                        {{-- <button class="btn btn-danger" type="button">test</button> --}}
                                    </div>
                                </div>




                            </div>







                        </div>

                    </form>
                </div>


                <div id="step-2" class="tab-pane" role="tabpanel" aria-labelledby="step-2">
                    {{-- <h3>Step 2 Content</h3> --}}
                    <form id="form-2" class="row row-cols-1 ms-1 me-5 needs-validation" novalidate>
                        <div class="info-form p-3">
                            <h3>Rekening Bank</h3>

                            <div class="row mt-3">
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Punya Nomor Rekening Bank Sumut ? <span class="text-danger">*</span><span class="text-danger"></span></label>
                                        <select class="form-control" name="punyaNorekBS" id="punyaNorek" aria-label="Default select example" required>
                                            <option value="" selected>---Pilih Di Sini---</option>
                                            <option value="1">Ya</option>
                                            <option value="0">Tidak </option>

                                        </select>
                                    </div>


                                </div>
                                {{-- <div id="nasabahBaru"> --}}
                                {{-- nasabah baru --}}
                                <div class="row" id="nasabahBaruField">
                                    <div class="col-md-4 my-2">
                                        <div class="form-group">
                                            <label class="sr-only">Nama Ibu <span class="text-danger">*</span></label>
                                            <input type="text" name="namaIbu" class="form-control" placeholder="--- Masukkan Nama Ibu ---" id="namaIbu" disabled="true">

                                        </div>
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <div class="form-group">
                                            <label class="sr-only">Status Kawin <span class="text-danger">*</span></label>
                                            <select class="form-control" name="statusKawin" id="statusKawin" placeholder="--Pilih Jenis Keperluan--" disabled="true">
                                                <option value="" selected hidden>---Pilih Status---</option>
                                                <option value="KAWIN">KAWIN</option>
                                                <option value="BELUM KAWIN">BELUM KAWIN</option>
                                                <option value="CERAI HIDUP">CERAI HIDUP</option>
                                                <option value="CERAI MATI">CERAI MATI</option>

                                            </select>

                                        </div>
                                    </div>


                                </div>
                                {{-- nashaabh lama --}}
                                <div class="row" id="nasabahLamaField">
                                    <div class="col-md-4 my-2">
                                        <div class="form-group">
                                            <label class="sr-only">Nomor Rekening Bank Sumut <span class="text-danger">*</span></label>
                                            <input type="text" name="noRekBS" class="form-control" placeholder="" disabled="true" id="noRekBS">

                                        </div>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <div class="form-group">
                                            <label class="sr-only">Nama Pemilik Rekening <span class="text-danger">*</span></label>
                                            <input type="text" name="namaPemilikRekBS" class="form-control" placeholder="" disabled="true" id="namaPemilikRekBS" maxlength="35">

                                        </div>
                                    </div>

                                </div>
                                {{-- </div> --}}

                            </div>

                            <div class="row mt-3">







                            </div>
                        </div>
                    </form>




                </div>

                <div id="step-3" class="tab-pane" role="tabpanel" aria-labelledby="step-3">
                    {{-- <h3>Step 2 Content</h3> --}}
                    <form id="form-3" class="row row-cols-1 ms-1 me-5 needs-validation" novalidate>

                        <div class="info-form p-3">
                            <h3>Jenis Kredit</h3>

                            <div class="row mt-3">
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Keperluan<span class="text-danger">*</span></label>

                                        <select class="form-control" name="jenisKeperluan" id="jenisKeperluan" placeholder="--Pilih Jenis Keperluan--" required>
                                            <option selected hidden>---Pilih Keperluan---</option>
                                            <option value="1">Investasi</option>
                                            <option value="2">Modal Kerja</option>

                                        </select>





                                    </div>
                                </div>
                                <div class="col-md-6 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Jenis Produk Pinjaman<span class="text-danger">*</span></label>

                                        <select class="form-control" name="jnsProdukPinjaman" placeholder="--Pilih Jenis Keperluan--" id="jnsProdukPinjaman" required>
                                            {{-- <option>---Pilih Jenis Produk---</option> --}}
                                            {{-- <option value="1">Investasi</option>
                                                    <option value="2">Modal Kerja</option> --}}

                                        </select>
                                        <input type="hidden" name="persenBunga" id="persenBunga">
                                        <input type="hidden" name="credit_id" id="credit_id">

                                        <input type="hidden" name="prod_pinjaman" id="prod_pinjaman">


                                    </div>
                                </div>



                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <label for="" class="form-label">Penghasilan Bersih(Rp.)
                                        <span class="text-danger">*</span></label>
                                    {{-- <div class="input-group"> --}}
                                    {{-- <span class="input-group-text" id="inputGroupPrepend2">Rp.</span> --}}

                                    <div class="row">
                                        <div class="col-2 ">
                                            <input type="button" class="btn btn-danger" id="minusPenghasilan" value="-" />
                                        </div>
                                        <div class="col-8">
                                            {{-- <input type="hidden" id="limitPengajuan"/> --}}
                                            <input type="text" class="form-control" name="jlhPenghasilan" id="jlhPenghasilan" placeholder="Masukkan Jumlah Nominal" max="100" value="1.000.000" readonly oninput="this.form.amountRangePenghasilan.value=this.value" step="1">
                                            <input type="range" name="amountRangePenghasilan" id="pointsPenghasilan" value="40" min="1" max="100" oninput="this.form.jlhPenghasilan.value=this.value" step="1" />

                                        </div>
                                        <div class="col-2">
                                            <input type="button" class="btn btn-success" id="plusPenghasilan" value="+" />
                                        </div>


                                    </div>

                                </div>


                                <div class="col-md-4">
                                    <label for="" class="form-label">Plafon Dimohon(Rp.)
                                        <span class="text-danger">*</span></label>

                                    <div class="row">
                                        <div class="col-2 ">
                                            <input type="button" class="btn btn-danger" id="minusDimohon" value="-" />
                                        </div>
                                        <div class="col-8">
                                            <input type="hidden" id="limitPengajuan" />
                                            <input type="text" class="form-control" name="jlhDimohon" id="jlhDimohon" placeholder="Masukkan Jumlah Nominal" max="500" value="1.000.000" readonly oninput="this.form.amountRangePengajuan.value=this.value" step="1">
                                            <input type="range" name="amountRangePengajuan" id="pointsDimohon" value="40" min="1" max="500" oninput="this.form.jlhDimohon.value=this.value" step="1" />

                                        </div>
                                        <div class="col-2">
                                            <input type="button" class="btn btn-success" id="plusDimohon" value="+" />
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="" class="form-label">Jangka Waktu(Bulan)
                                        <span class="text-danger">*</span></label>

                                    <div class="row">
                                        <div class="col-2 ">
                                            <input type="button" class="btn btn-danger" id="minusJangkaWaktu" value="-" />
                                        </div>
                                        <div class="col-8">
                                            <input type="hidden" id="limitPengajuan" />
                                            <input type="text" class="form-control" name="jlhJangkaWaktu" id="jlhJangkaWaktu" placeholder="Masukkan Jumlah Nominal" max="500" value="1" readonly oninput="this.form.amountRangeJangkaWaktu.value=this.value" step="1">
                                            <input type="range" name="amountRangeJangkaWaktu" id="pointsJangkaWaktu" value="40" min="1" max="240" oninput="this.form.jlhJangkaWaktu.value=this.value" step="1" />

                                        </div>
                                        <div class="col-2">
                                            <input type="button" class="btn btn-success" id="plusJangkaWaktu" value="+" />
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label for="" class="form-label">Estimasi Angsuran Per Bulan(Rp.)
                                        <span class="text-danger">*</span></label>
                                    {{-- <input type="hidden" id="limitPengajuan"/> --}}
                                    <input type="text" class="form-control" name="angsuranPerBulan" id="angsuranPerBulan" placeholder="" readonly required>

                                </div>




                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Tujuan Guna Kredit<span class="text-danger">*</span></label>

                                        <select class="form-control tujuan-kredit" name="jnsUsaha" id="listTujuanKredit" required>
                                            <option value="">---Pilih Tujuan Kredit---</option>
                                            @foreach ($listTujuanKredit as $lk)
                                            <option value="{{ $lk->nama_tujuan }}">{{ $lk->nama_tujuan }}
                                            </option>
                                            @endforeach

                                        </select>




                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Cabang Bank Sumut Terdekat<span class="text-danger">*</span></label>

                                        <select name="namaCabang" class="form-red bussiness form-select nama-cabang" id="namaCabang" required>
                                            {{-- <option value="" selected>----Jenis Pembiayaan---</option>
                                                    <option value="KUR" @if (old('ketIzinUsaha') == 'KUR') {{ 'selected' }} @endif>KUR</option>
                                            <option value="KMSB" @if (old('ketIzinUsaha')=='KMSB' ) {{ 'selected' }} @endif>KMSB</option> --}}
                                            {{-- <option value="">---Pilih Nama Cabang---</option> --}}
                                            @foreach ($listKodeCabang as $lkc)
                                            <option value="{{ $lkc->branch_id }}-{{ $lkc->branch_name }}">
                                                {{ $lkc->branch_name }}</option>
                                            @endforeach

                                        </select>

                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="sr-only">Upload Foto Tempat Usaha <span class="text-danger">*</span></label>

                                        <input type="file" name="fotoTempatUsaha" class="form-control " accept=".jpg, .jpeg, .png" id="fotoTempatUsaha" onchange="previewImageTempatUsaha()" required>
                                        <div class="row">
                                            <img class="img-preview-tempat-usaha img-fluid mt-2 col-sm-8" />
                                        </div>
                                        <small>File dalam bentuk JPG,PNG,JPEG</small>

                                    </div>

                                </div>



                            </div>



                        </div>

                    </form>



                </div>



                <div id="step-4" class="tab-pane" role="tabpanel" aria-labelledby="step-4">
                    <form id="form-4" class="row row-cols-1 ms-1 me-5 needs-validation" novalidate>

                        <div class="col">

                            <h3>Agunan</h3>

                            <div class="row mt-3">
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Apakah pengajuan menggunakan agunan<span class="text-danger">*</span></label>

                                        <select class="form-control" name="gunakanAgunan" id="gunakanAgunan" placeholder="--Pilih Jenis Agunan--" required>
                                            <option value="">--- Ya / Tidak---</option>
                                            <option value="1">Ya</option>
                                            <option value="0">Tidak</option>

                                        </select>
                                        <small>Pilih Ya atau Tidak</small>


                                    </div>
                                </div>

                                <div class="form-group row" id="formAgunan">
                                    <div class="input-group-addon">
                                        <button id="add" type="button" class="btn btn-success addMore" data-toggle="modal" data-target="#exampleModal"><span class="glyphicon glyphicon glyphicon-plus" aria-hidden="true"></span>
                                            Tambahkan Agunan</button>

                                    </div>
                                    <div class="col-sm-12 mt-2">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    {{-- <th scope="col">#</th> --}}
                                                    <th scope="col">Jenis Agunan</th>
                                                    <th scope="col">Jeni Dokumen Agunan</th>
                                                    
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody">

                                            </tbody>
                                        </table>

                                    </div>



                                </div>





                            </div>



                        </div>
                    </form>


                </div>
                <div id="step-5" class="tab-pane" role="tabpanel" aria-labelledby="step-5">
                    {{-- <div id="signature" style="width: 100%;height: auto;border: 1px solid black;"></div>
                     --}}
                    <form id="form-5" class="row row-cols-1 ms-1 me-5 needs-validation" novalidate>
                        <div class="col">

                            <div id="reviewPengajuan">


                            </div>

                            <div id="reviewAgunan">


                            </div>




                            <div class="form-check">
                                {{-- <input class="form-check-input " type="checkbox" id="setujuKirim"  value=""  name="cekPengajuan" required > --}}
                                <input class="form-check-input " type="checkbox" id="setujuKirim" value="" name="cekPengajuan" required>
                                <label class="form-check-label px-1" for="flexCheckDefault" id="labelSetujuKirim">
                                    Dengan ini saya menyetujui memberikan data tersebut diatas untuk dipergunakan dalam
                                    proses pengajuan Kredit melalui
                                    <b>PT Bank Sumut</b>
                                </label>


                                <div class="mt-3">

                                    * Pengajuan melalui website ini gratis<br>
                                    * Proses analisa dan persetujuan dilakukan bank penyalur KUR<br>
                                    * Pastikan data diri anda sesuai dengan KTP<br>
                                    * Pastikan no. HP Anda sudah benar dan aktif<br>

                                </div>
                            </div>
                        </div>
                    </form>

                </div>

                {{-- </form> --}}
            </div>

            {{-- </form> --}}

            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>



        <br /> &nbsp;
    </div>
    <div class="modal fade " id="addAgunanModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Tambah Agunan</h5>
                    <button type="button" id="closeCross" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form action="" id="fieldAgunan" class="needs-validation " novalidate>
                    <div class="modal-body">

                        <div class="col-sm-12" id="agunan-1">
                            <h3> Benda Agunan </h3>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Jenis Agunan<span class="text-danger">*</span></label>

                                    <select class="form-control" name="jenisAgunan" id="jenisAgunan" placeholder="--Pilih Jenis Agunan--" required>
                                        <option selected value="" hidden>---Pilih Jenis Dokumen---</option>
                                        <option value="Tanah">Tanah</option>
                                        <option value="Rumah">Rumah</option>
                                        <option value="Ruko">Ruko</option>
                                        <option value="Apartemen">Apartemen</option>



                                    </select>

                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="sr-only">Jenis Dokumen Agunan<span class="text-danger">*</span></label>
                                        <select class="form-control" name="jenisDokumenAgunan" id="jenisDokumenAgunan" placeholder="--Pilih Jenis Agunan--" required>
                                            <option selected value="" hidden>---Pilih Jenis Dokumen---</option>
                                            <option value="SHM">SHM</option>
                                            <option value="SHGB">SHGB</option>
                                            <option value="AJB">AJB</option>
                                            <option value="GIRIK">GIRIK</option>
                                            <option value="PPJB">PPJB</option>
                                            <option value="BPKB">BPKB</option>
                                            <option value="SKCAMAT">SKCAMAT</option>
                                            <option value="Lainnya">Lainnya</option>


                                        </select>

                                    </div>
                                </div>
                                <div class="col-sm-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Alamat / Lokasi Bangunan<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" name="alamatAgunan" id="alamatAgunan" placeholder="Alamat / Lokasi Agunan" required>


                                    </div>
                                </div>
                                <div class="col-sm-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Luas Tanah (m2) <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" name="luasTanahAgunan" id="luasTanahAgunan" placeholder="Luas Tanah (m2) " required>
                                    </div>
                                </div>
                                <div class="col-sm-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Luas Bangunan (m2) <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" name="luasBangunanAgunan" id="luasBangunanAgunan" placeholder="Luas Bangunan (m2) " required>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Perkiraan Nilai Agunan<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" name="perkiraanNilaiAgunan" id="perkiraanNilaiAgunan" placeholder="Perkiraan Nilai Agunan" required>


                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Nomor Surat Agunan<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" name="nomorSuratAgunan" id="nomorSuratAgunan" placeholder="Nomor Surat Agunan" required>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Provinsi Agunan<span class="text-danger">*</span></label>
                                        <select type="text" class="form-control" name="provinsiAgunan" id="provinsiAgunan" placeholder="Nomor Surat Agunan" required>
                                            <option value="">--- Pilih Provinsi ---</option>
                                            <option value="12-SUMATERA UTARA">12 - SUMATERA UTARA</option>
                                            <option value="21-KEPULAUAN RIAU">21 - KEPULAUAN RIAU</option>
                                            <option value="31-DKI JAKARTA">31 - DKI JAKARTA</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Kabupaten/ Kota Agunan<span class="text-danger">*</span></label>
                                        <select type="text" class="form-control" name="kabupatenAgunan" id="kabupatenAgunan" placeholder="Nomor Surat Agunan" required>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Kecamatan Agunan<span class="text-danger">*</span></label>
                                        <select type="text" class="form-control" name="kecamatanAgunan" id="kecamatanAgunan" placeholder="Nomor Surat Agunan" required>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Desa / Kelurahan Agunan<span class="text-danger">*</span></label>
                                        <select type="text" class="form-control" name="kelurahanAgunan" id="kelurahanAgunan" placeholder="Nomor Surat Agunan" required>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>

                                <input type="hidden" name="clusterAssign" id="clusterAssign" />

                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Foto Tampak Agunan Secara Jelas Menyeluruh<span class="text-danger">*</span></label>
                                        <input type="file" name="fotoAgunanMenyeluruh" class="form-control" style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoAgunanMenyeluruh" required>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Foto Bukti Pembayaran PBB/Pajak Agunan atau Dokumen
                                            Pelengkap lainnnya<span class="text-danger">*</span></label>
                                        <input type="file" name="fotoBuktiPajak" class="form-control" style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoBuktiPajak" required>
                                    </div>
                                </div>
                                <div class="col-md-4 my-2">
                                    <div class="form-group">
                                        <label class="sr-only">Foto Bagian Halaman yang Menampilkan Nomor Surat, Luas
                                            dan Nama Pemilik Agunan<span class="text-danger">*</span></label>
                                        <input type="file" name="fotoSuratAgunan" class="form-control" style="position:relative;" accept=".jpg, .jpeg, .png" id="fotoSuratAgunan" required>
                                    </div>
                                </div>

                            </div>
                        </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Batalkan</button>
                <button type="button" class="btn btn-primary" id="addButtonAgunan">Tambahkan</button>
            </div>
            </form>


        </div>
    </div>
    </div>





    <div class="modal fade " id="detailAgunanModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Detail Agunan</h5>
                    <button type="button" id="closeCrossAgunan" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div>
                        <div class="col-sm-12" id="agunan-1">
                            {{-- <h3> Detail Agunan</h3> --}}
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Jenis Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivJenisAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Jenis Dokumen Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivJenisDocAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Alamat Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivAlamatAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Luas Tanah Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivLuasTanahAgunan"></p>
                                </div>
                            </div>

                            
                            
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Luas Bangunan Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivLuasBangunanAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Perkiraan Nilai Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivHargaAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Nomor Surat Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivNoSuratAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Provinsi Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivProvinsiAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Kabupaten / Kecamatan Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivKabKotAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Kecamatan Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivKecamatanAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Desa / Kelurahan Agunan</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivDesaKelAgunan"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only">Kode Klaster</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="rivKodeKlaster"></p>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only" style=" max-width: 100%;width:500px;">Tampak Depan Agunan</label>
                                </div>
                                <div class="col-sm-4 mt-2">
                                    <img id="rivFotoAgunan" style="width:100%" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only" style=" max-width: 100%;width:500px;" >Foto Bukti Bayar PBB Agunan</label>
                                </div>
                                <div class="col-sm-4 mt-2">
                                    <img id="rivPajakAgunan" style="width:100%" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="sr-only" style=" max-width: 100%;width:500px;">Surat Kepemilikan Agunan</label>
                                </div>
                                <div class="col-sm-4 mt-2">
                                    <img id="rivSuratAgunan" style="width:100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeDetailAgunan">Tutup</button>
                    {{-- <button type="button" class="btn btn-primary" id="addButtonAgunan">Tambahkan</button> --}}
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade " id="tandaTanganModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Masukkan Tanda Tangan</h5>
                    <button type="button" id="closeCross" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="wrapper">

                        <canvas id="signature-pad" class="signature-pad" width="400" height="200"></canvas>
                    </div>

                    <button id="save-png" class="btn btn-danger">Save as PNG</button>
                    <button id="save-jpeg">Save as JPEG</button>
                    <button id="save-svg">Save as SVG</button>
                    <button id="draw">Draw</button>
                    <button id="erase">Erase</button>
                    <button id="clear">Clear</button>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Batalkan</button>
                    <button type="button" class="btn btn-primary">Kirim</button>
                </div>
                </form>


            </div>
        </div>
    </div>

    <script src="{{ asset('plugins/bootstrap/bootstrap.bundle.min.js') }}" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
    </script>

    <!-- Include jQuery -->
    <script src="{{ asset('plugins/jquery/jquery-3.6.0.min.js') }}"></script>



    <script src="{{ asset('plugins/smartwizard/jquery.smartWizard.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('plugins/js/ui/jquery-ui.min.js') }}"></script>


    <script src="{{ asset('plugins/jquery.validate.min.js') }}"></script>

    <script src="{{ asset('plugins/js/app3.js') }}"></script>

    <script src="{{ asset('plugins/js/jquery.mask.min.js') }}"></script>
    <script src="{{ asset('plugins/js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('plugins/select2/js/select2.full.min.js') }}"></script>







</body>

</html>

