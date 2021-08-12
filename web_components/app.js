import InputComponent from './molecules/inputComponent.js';
import PanelAgentes from './organisms/panelAgentes.js';
import Panel from './organisms/panel.js';

class IntraAnestesiaUi extends HTMLElement {
    constructor(){
        super();
        //this.attachShadow({ mode: "open" });
    }
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = /*html*/`
            <panel-agentes></panel-agentes>
        `;
        return template;
    }
    render(){
        //this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
        this.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render();
    }
}

customElements.define('intra-anestesia-ui', IntraAnestesiaUi);