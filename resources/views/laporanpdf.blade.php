<!DOCTYPE html>
<html>

<head>
    <title>Report Setoran Saham Pemda</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    {{-- <link rel="stylesheet" href="{{  url('') }}/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"> --}}
    
</head>

<body>
    <style type="text/css">
        table tr td,
        table tr th {
            font-size: 9pt;

        }

        ,
    </style>
    <div class="text-center">
        <h4 class="mt-2"></h4>
    </div>

    <table class='table-bordered my-4 '>
        <tr >
            <th>Nama. </th>
            <th>{{ $nama }}</th>        
        </tr>
        <tr>
            <th>NIK</th>
            <th>{{ $nik }}</th>        
        </tr>
        <tr>
            <th>email</th>
            <th>{{ $email }}</th>        
        </tr>
        <tr>
            <th>Alamat Debitur</th>
            <th>{{ $alamat_debitur }}</th>        
        </tr>
        <tr>
            <th>FOTO Selfie KTP</th>
            <th><img style="max-width: 80%;width:500px;" src="{{$foto_selfie_ktp }}"></th>        
        </tr>
        <tr>
            <th>Foto Tempat Usaha</th>
            <th><img style="max-width: 80%;width:500px;" src="{{$foto_selfie_ktp }}"></th>        
        </tr>
        
        
        <tr>
            <th>Agunan</th>
            <th>{{$agunan}}</th>        
        </tr>



 
    

    </table>



</body>

</html>
