$(document).ready(function(){
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

});