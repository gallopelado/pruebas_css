import Panel from "./panel.js";
import ButtonGroupComponent from "../molecules/buttonGroupComponent.js";

export default class PanelAgentes extends HTMLElement {
    constructor(){
        super();
    }
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = /*html*/`
            <panel-organism>

                <div class="panel-heading text-center">
                    <button-group
                        button_text="INICIO DE LA ANESTESIA" button_id="btInicioAnestesia" spanclass="glyphicon-time"
                        button_text_second="INICIO DE LA CIRUGÍA" button_id_second="btInicioCirugia" spanclass_second="glyphicon-time">
                    </button-group>
                </div>
                <div class="panel-body">
                    soy un contenido
                </div>
                <div class="panel-footer text-center">
                    <button-group
                        button_text="FIN DE LA ANESTESIA" button_id="btFinAnestesia" spanclass="glyphicon-time"
                        button_text_second="FIN DE LA CIRUGÍA" button_id_second="btFinCirugia" spanclass_second="glyphicon-time">
                    </button-group>
                </div>

            </panel-organism>
        `;
        return template;
    }
    render(){
        this.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render();
    }
}

customElements.define('panel-agentes', PanelAgentes);