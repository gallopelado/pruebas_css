export default class InputComponent extends HTMLElement {
    constructor(){
        super();
        //this.attachShadow({ mode: "open" });
    }
    static get observedAttributes(){
        return [
            , 'title_class', 'title_text', 'title_unit_text'
            , 'id_input_disabled' , 'type_input_disabled', 'class_input_disabled', 'placeholder_input_disabled'
            , 'id_input', 'type_input', 'class_input', 'name_input', 'codigo_grupo_examination', 'codigo_item_examination'
            , 'min', 'max', 'step', 'placeholder_input'
        ];
    }
    attributeChangedCallback(attr, oldVal, newVal){
        if(attr==="title_class"){
            this.title_class = newVal;
        }
        if(attr==="title_text"){
            this.title_text = newVal;
        }
        if(attr==="title_unit_text"){
            this.title_unit_text = newVal;
        }
        if(attr==="id_input_disabled"){
            this.id_input_disabled = newVal;
        }
        if(attr==="type_input_disabled"){
            this.type_input_disabled = newVal;
        }
        if(attr==="class_input_disabled"){
            this.class_input_disabled = newVal;
        }
        if(attr==="placeholder_input_disabled"){
            this.placeholder_input_disabled = newVal;
        }
        if(attr==="id_input"){
            this.id_input = newVal;
        }
        if(attr==="type_input"){
            this.type_input = newVal;
        }
        if(attr==="class_input"){
            this.class_input = newVal;
        }
        if(attr==="name_input"){
            this.name_input = newVal;
        }
        if(attr==="codigo_grupo_examination"){
            this.codigo_grupo_examination = newVal;
        }
        if(attr==="codigo_item_examination"){
            this.codigo_item_examination = newVal;
        }
        if(attr==="min"){
            this.min = newVal;
        }
        if(attr==="max"){
            this.max = newVal;
        }
        if(attr==="step"){
            this.step = newVal;
        }
        if(attr==="placeholder_input"){
            this.placeholder_input = newVal;
        }
    }
    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = /*html*/`
        <div class="form-group">
            <h5 class="${this.title_class}">${this.title_text} <span class="label label-default">${this.title_unit_text}</span></h5>
            <div class="col-md-4">
                <input type="${this.type_input_disabled}" class="${this.class_input_disabled}" id="${this.id_input_disabled}" placeholder="${this.placeholder_input_disabled}" disabled>
            </div>
            <div class="col-md-4">
                <input type="${this.type_input}" class="${this.class_input}" name="${this.name_input}" id="${this.id_input}" codigo_grupo_examination="${this.codigo_grupo_examination}" codigo_item_examination="${this.codigo_item_examination}" min="${this.min}" max="${this.max}" step="${this.step}" autocomplete="off" placeholder="${this.placeholder_input}">
            </div>
        </div>
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

customElements.define('input-component', InputComponent);