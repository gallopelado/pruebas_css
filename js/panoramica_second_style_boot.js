$(function() {

    const sub_titulos_items = [
        "F.C [lat/min]"
        , "F.R[resp/min]"
        , "P.A [mmHg]"
        , "P.A.M [mmHg]"
        , "T.inc [°C]"
        , "PVC [cmH2O]"
        , "SAT.O2 [%]"
        , "Llenado Capilar [seg]"
    ]

    const ingresos_parenteral_items = [
        "Expans. [ml]"
        , "Correcc. [ml]"
        , "Comp.Sang [ml]"
        , ...lazzyPlanGenerator()
    ]

    const ingresos_enteral_items = [
        "V.O [ml]"
        , "P/Maternos [ml]"
        , "S.N.G/SOG [ml]"
        , "S.T.P [ml]"
    ]

    const egresos_item = [
        "Diuresis [ml]"
        , "Heces [ml]"
        , "Ext-Sangre [ml]"
        , "R. Gástrico [ml]"
        , "Drenajes [ml]"
        , "Drenajes Preural [Derecho][ml]"
        , "Drenajes Preural [Izquierdo][ml]"
        , "Vomitos [ml]"
        , "Pérdida Insensible [ml]"
    ];

    const cuidados_enferm_items = [
        "Asp./B/T:"
        , "HGT"
        , "O2"
        , "Nebuliz"
        , "Aerosolt"
        , "Higiene"
        , "Moviliz"
        , "Estudios Auxiliares"
        , "Observaciones"
    ]

    const titulos = {
        others : sub_titulos_items
        , ingresos_parenteral: {
            title: "Ingresos(Parenteral)"
            , items: ingresos_parenteral_items
        }
        , ingresos_enteral: {
            title: "Ingresos(Enteral)"
            , items: ingresos_enteral_items
        }
        , egresos: {
            title: "Egresos"
            , items: egresos_item
        }
        , balance: {
            title: "Balance"
            , items: []
        }
        , cuidados_enferm: {
            title: "Cuidados de Enfermería"
            , items: cuidados_enferm_items
        }
    } 

    const tbodyGenerator = () => {
        let cadena = "";
        const { others, ingresos_parenteral, ingresos_enteral, egresos, balance, cuidados_enferm } = titulos;
        others.forEach(it => {
            cadena += `<tr><td>${it}</td>${emptyTd(24, generateIdByName(it))}</tr>`
        });
        cadena += `<tr><td><h4>${ingresos_parenteral.title}</h4></td>${emptyTd(24)}</tr>`
        ingresos_parenteral.items.forEach(it => {
            cadena += `<td>${it}</td>${emptyTd(24, generateIdByName(it))}</tr>`
        });
        cadena += `<tr><td><h4>${ingresos_enteral.title}</h4></td>${emptyTd(24)}</tr>`
        ingresos_enteral.items.forEach(it => {
            cadena += `<td>${it}</td>${emptyTd(24, generateIdByName(it))}</tr>`
        });
        cadena += `<tr><td><h4>${egresos.title}</h4></td>${emptyTd(24)}</tr>`
        egresos.items.forEach(it => {
            cadena += `<td>${it}</td>${emptyTd(24, generateIdByName(it))}</tr>`
        });
        cadena += `<tr><td><h4>${balance.title}</h4></td></tr>`
        cadena += `<tr><td><h4>${cuidados_enferm.title}</h4></td>${emptyTd(24)}</tr>`
        cuidados_enferm.items.forEach(it => {
            cadena += `<td>${it}</td>${emptyTd(24, generateIdByName(it))}</tr>`
        });
        $('#tb_diagnosticos').html(cadena);
    }
    
    console.log(titulos);
    sessionStorage.clear()
    sessionStorage.setItem('fecha_actual', '2021-06-03T16:05');
    sessionStorage.setItem('fecha_modificada', '');
    console.log(getCalendar("2021-06-01T16:05"))
    tbodyGenerator();
    setCurrentDay('2021-06-03T16:05');

    $('#txtSearch').on('keyup', function(){
        const valor = $(this).val().toLowerCase();
        $('#panoramica_table tr').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });

    $('#avanzarDerecha').on("click", function(e) {
        if(!sessionStorage.getItem('fecha_modificada')) { 

            const next_day = mutarFecha("plus", sessionStorage.getItem('fecha_actual'));
            sessionStorage.setItem('fecha_modificada', next_day);
            $('#headerDateShort').html(getFormatedDate(next_day));

        } else if(sessionStorage.getItem('fecha_modificada')) { 

            const next_day = mutarFecha("plus", sessionStorage.getItem('fecha_modificada'));
            $('#headerDateShort').html(getFormatedDate(next_day));
            sessionStorage.setItem('fecha_modificada', next_day);

        }
    });

    $('#avanzarIzquierda').on("click", function(e) {
        if(!sessionStorage.getItem('fecha_modificada')) { 

            const next_day = mutarFecha("minus", sessionStorage.getItem('fecha_actual'));
            sessionStorage.setItem('fecha_modificada', next_day);
            $('#headerDateShort').html(getFormatedDate(next_day));

        } else if(sessionStorage.getItem('fecha_modificada')) { 

            const next_day = mutarFecha("minus", sessionStorage.getItem('fecha_modificada'));
            $('#headerDateShort').html(getFormatedDate(next_day));
            sessionStorage.setItem('fecha_modificada', next_day);

        }
    });

    $('#btIrHoy').on("click", function(e) {

        sessionStorage.setItem('fecha_modificada', '');
        setCurrentDay(sessionStorage.getItem('fecha_actual'));

    });

});

const lazzyPlanGenerator = () => {
    let cadena = [];
    for(let i=65; i<=80; i++){
        cadena.push(`Plan ${String.fromCharCode(i)} [ml]`)
    }
    return cadena;
}


const emptyTd = (n, tag) => {
    let cadena = "";
    let c = 0;
    n = n + 6;
    for(let i=7; i<=n;i++) {
        if(i > 24) {
            c++;
            cadena += `<td id="${tag}_${c}"></td>`;
        } else {
            cadena += `<td id="${tag}_${i}"></td>`;
        }
    }
    return cadena;
}

const generateIdByName = (id) => id.toLowerCase().replace(" ", "_")

const getCalendar = (fecha_actual) => {
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
        case 1: return "Enero"
        case 2: return "Febrero"
        case 3: return "Marzo"
        case 4: return "Abril"
        case 5: return "Mayo"
        case 6: return "Junio"
        case 7: return "Julio"
        case 8: return "Agosto"
        case 9: return "Septiembre"
        case 10: return "Octubre"
        case 11: return "Noviembre"
        case 12: return "Diciembre"
    }
}

const setCurrentDay = (fecha_actual) => {
    const v_date = luxon.DateTime.fromISO(fecha_actual).setLocale("es");
    const nombre_dia = v_date.weekdayShort.charAt(0).toUpperCase() + v_date.weekdayShort.slice(1);
    const num_dia = v_date.day;
    const num_mes = v_date.month;
    const nombre_mes = v_date.monthShort.charAt(0).toUpperCase() + v_date.monthShort.slice(1);
    $('#headerDateShort').html(`Hoy - ${nombre_dia} ${num_dia}/${nombre_mes}`);
}

const mutarFecha = (tipo, fecha) => {
    const v_date = luxon.DateTime.fromISO(fecha);
    switch(tipo) {
        case "plus": return luxon.DateTime.fromISO(v_date).plus({ day: 1 }).toISODate()
        case "minus": return luxon.DateTime.fromISO(v_date).minus({ day: 1 }).toISODate()
    }
}

const getFormatedDate = (fecha_actual) => {
    const v_date = luxon.DateTime.fromISO(fecha_actual).setLocale("es");
    const nombre_dia = v_date.weekdayShort.charAt(0).toUpperCase() + v_date.weekdayShort.slice(1);
    const num_dia = v_date.day;
    const nombre_mes = v_date.monthShort.charAt(0).toUpperCase() + v_date.monthShort.slice(1);
    return `${nombre_dia} ${num_dia}/${nombre_mes}`;
}