<!DOCTYPE html>
<html>

<head>
    <title>Dokuemn Kepemilikan Agunan</title>
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
        <!DOCTYPE html>
<html>

<head>
    <title>Dokuemn Kepemilikan Agunan</title>
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
        {{-- <tr >
            <th>Nama. </th>
            <th>{{ $nama }}</th>        
        </tr> --}}
        <tr >
            <th>FOTO Bukti Bayar PBB Agunan</th>
            <th>
                {{-- {{$id_req}} --}}
                <img src="{{$foto_bukti_bayar_agunan }}" style="max-width: 80%;width:500px;">
            </th>        
        </tr>
        {{-- <tr >
            <th>NIK. </th>
            <th>{{ $nik }}</th>        
        </tr> --}}
        <tr >
            <th>QR Signature </th>
            <th>
                 <img src="data:image/png;base64, {!! $qrcode !!}">
            </th>        
        </tr>
        <tr >  
        </tr>


    </table>



</body>

</html>

    

    </table>



</body>

</html>
