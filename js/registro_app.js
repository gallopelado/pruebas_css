const row_model = () => `
<tr>
<td class="medicamentos_td">
    <div>
        <div class="titulo_medicamento">
            SOLUCION DEXTROSA (10 %)
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
<td class="horario_td"></td>
<td class="horario_td"></td>
</tr>
`;

for(let i=0; i<5; i++) {
    $('#tabla_registro tbody').append( row_model );
}