let mostrarTiempo=()=>{
    let horas= document.getElementById('tiempo');
    let fecha = document.getElementById('fecha');
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', ' agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let tiempo = new Date();
    let h=tiempo.getHours();
    let min = tiempo.getMinutes();
    let seg = tiempo.getSeconds();

    let dia = tiempo.getDate();
    let mes = tiempo.getMonth();
    let anio = tiempo.getFullYear();

    let m = meses[mes];
    let hr = (h>12)? h-12: h;
    let am = (h > 12) ? 'PM': 'AM';
    if(hr<12){hr='0'+hr};
    horas.textContent=`${hr} : ${min} : ${seg} ${am}`;
    fecha.textContent=`${dia} de ${m} del ${anio}`;
}
setInterval(mostrarTiempo, 1000);

function mostrar_inf1(){
    document.getElementById('inf1').style.display='block';
}
function ocultar_inf1(){
    document.getElementById('inf1').style.display='none';
}