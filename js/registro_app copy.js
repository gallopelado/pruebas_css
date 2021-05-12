$(document).ready(function(){
    sessionStorage.setItem('semana_modificada_numero', '');
    sessionStorage.setItem('fecha_modificada', '');
        const row_model = (rn) => `
        <tr>
        <td class="medicamentos_td">
            <div>
                <div class="titulo_medicamento">
                    SOLUCION DEXTROSA (10 %) ${Math.random()}
                </div>
                <div>Dosis: 4</div>
                <div>Cada: 12 Hora(s)</div>
                <div>Inicio: 05/05/21 Fin: 08/05/21</div>
            </div>
        </td>
        <td class="horario_td"></td>
        <td class="horario_td"></td>
        <td class="horario_td"></td>
        <td class="horario_td"></td>
        <td class="horario_td"></td>
        <td class="horario_td" style="${ rn >= 0.1 && rn <= 0.5 ? 'background: #ffe8bf!important' : '' }">${ rn >= 0.1 && rn <= 0.5 ? '<div class="horarios"><div>11:00</div><div>18:00</div></div>' : '' }</td>
        <td class="horario_td"></td>
        </tr>
        `;

        for(let i=0; i<5; i++) {
            $('#tabla_registro tbody').append( row_model(Math.random()) );
        }

        $('#txtSearch').on('keyup', function(){
            const valor = $(this).val().toLowerCase();
            $('#tabla_registro tr').filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
            });
        });
        console.log(calcularTodosDiasMes("2021-05-12T16:05"));
        console.log(otroCalculoDiasAnio("2021-05-12T16:05"));
        //console.log(generarSemana("2021-05-11T16:05"));
        //console.log(generarSemana(mutarFecha("plus", "2021-05-11T16:05")));

        $('#avanzarDerecha').on("click", function(e) {
            e.preventDefault();
            const fecha_actual = "2021-05-12T16:05";
            const v_date = luxon.DateTime.fromISO(fecha_actual);
            const v_current_week_number = luxon.DateTime.local(v_date.year, v_date.month, v_date.day).weekNumber;
            
            if(!sessionStorage.getItem('fecha_modificada')) {

                const sigt_semana = mutarFecha("plus", fecha_actual);
                sessionStorage.setItem('fecha_modificada', sigt_semana);
                console.log(generarSemana(sigt_semana));
            } else if(sessionStorage.getItem('fecha_modificada')) {
                
                const fecha_modificada = sessionStorage.getItem('fecha_modificada');
                
                
                const sigt_semana = mutarFecha("plus", fecha_modificada);
                sessionStorage.setItem('fecha_modificada', sigt_semana);
                console.log(generarSemana(sigt_semana));
            }

            //console.log(generarSemana(mutarFecha("plus", "2021-05-11T16:05")));
        });
        $('#avanzarIzquierda').on("click", function(e) {
            e.preventDefault();
            const fecha_actual = "2021-05-12T16:05";
            const v_date = luxon.DateTime.fromISO(fecha_actual);
            const v_current_week_number = luxon.DateTime.local(v_date.year, v_date.month, v_date.day).weekNumber;
            
            if(!sessionStorage.getItem('fecha_modificada')) {
                const sigt_semana = mutarFecha("plus", fecha_actual);
                sessionStorage.setItem('fecha_modificada', sigt_semana);
                console.log(generarSemana(sigt_semana));
            } else if(sessionStorage.getItem('fecha_modificada')) {
                const fecha_modificada = sessionStorage.getItem('fecha_modificada');
                const sigt_semana = mutarFecha("minus", fecha_modificada);
                sessionStorage.setItem('fecha_modificada', sigt_semana);
                console.log(generarSemana(sigt_semana));
            }
        });
});


    // dateFns.getDay(new Date(2012, 1, 29)) trae los numeros del dia segun su nombre 0- domingo 6 - sabado
    // dateFns.getDaysInMonth(new Date(2021, 6)) trae los dias que tiene un mes
    // dateFns.getMonth(new Date(2012, 5, 1)) trae el numero del mes
    // 2021-05-10T16:05 formato que returna el his
    // usando luxon luxon.DateTime.local(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()).weekNumber
    // luxon.DateTime.local(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()).weekday
    // luxon.DateTime.local(2021, 5, 03).weekNumber && luxon.DateTime.local(2021, 5, 08).weekNumber ? true : false
    // luxon maneja de lunes a domingo cada semana
    const calcularDia= (numberDay) => {
        switch(numberDay){
            case 1: return "Lun"
            case 2: return "Mar"
            case 3: return "Mie"
            case 4: return "Jue"
            case 5: return "Vie"
            case 6: return "Sab"
            case 7: return "Dom"
        }
    }

    const calcularMes = (numberMonth) => {
        switch(numberMonth){
            case 1: return "Ene"
            case 2: return "Feb"
            case 3: return "Mar"
            case 4: return "Abr"
            case 5: return "May"
            case 6: return "Jun"
            case 7: return "Jul"
            case 8: return "Ago"
            case 9: return "Sep"
            case 10: return "Oct"
            case 11: return "Nov"
            case 12: return "Dic"
        }
    }

const calcularTodosDiasMes = (fecha_actual) => {
    const v_date = luxon.DateTime.fromISO(fecha_actual);
    const todosDiasMes = luxon.DateTime.local(v_date.year, v_date.month).daysInMonth
    //const todosDiasAnio = luxon.DateTime.local(v_date.year).daysInYear
    //const todosDiasMes = dateFns.getDaysInMonth(new Date(fecha_actual));
    const numeroMes =  v_date.month;
    const currentyear = v_date.year;
    let lista = [];
    for(let i=1; i<=todosDiasMes; i++){
        const numeroDia = luxon.DateTime.local(v_date.year, v_date.month, i).weekday;
        lista.push({
            nroDia: i, nombreDia: calcularDia(numeroDia), nombreMes: calcularMes(numeroMes), nroMes: numeroMes
            , currentWeek: luxon.DateTime.local(currentyear, numeroMes, i).weekNumber, currentyear: currentyear
        });
    }
    return lista;
}

const generarSemana = (fecha_actual) => {
    const v_date = luxon.DateTime.fromISO(fecha_actual);
    const v_current_week_number = luxon.DateTime.local(v_date.year, v_date.month, v_date.day).weekNumber;
    //return calcularTodosDiasMes(fecha_actual).filter( item => item.currentWeek === v_current_week_number );
    return otroCalculoDiasAnio(fecha_actual).filter( item => item.currentWeek === v_current_week_number );
}

const mutarFecha = (tipo, fecha) => {
    const v_date = luxon.DateTime.fromISO(fecha);
    switch(tipo) {
        case "plus":
            return luxon.DateTime.fromISO(v_date).plus({ week: 1 }).toISODate()

        case "minus": return luxon.DateTime.fromISO(v_date).minus({ week: 1 }).toISODate()
    }
}

const otroCalculoDiasAnio = (fecha_actual) => {
    const v_date = luxon.DateTime.fromISO(fecha_actual);
    const meses = 12;
    const anio = v_date.year;
    let lista = [];

    for (let mes = 1; mes <= meses; mes++) {
      const dias_mes = luxon.DateTime.local(anio, mes).daysInMonth;

      for (let dia = 1; dia <= dias_mes; dia++) {
        const numeroDia = luxon.DateTime.local(anio, mes, dia).weekday;
        lista.push({
          nroDia: dia,
          nombreDia: calcularDia(numeroDia),
          nombreMes: calcularMes(mes),
          nroMes: mes,
          currentWeek: luxon.DateTime.local(anio, mes, dia).weekNumber,
          currentyear: anio,
        });
      }
    }
    return lista;
}