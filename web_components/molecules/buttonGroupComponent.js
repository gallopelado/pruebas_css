import Button from "./buttonComponent.js";

export default class ButtonGroupComponent extends HTMLElement {
    constructor(){
        super();
    }
    static get observedAttributes(){
        return [
            'button_text', 'button_id', 'button_class','spanclass'
            , 'button_text_second', 'button_id_second', 'button_class_second','spanclass_second'
        ];
    }
    attributeChangedCallback(attr, oldVal, newVal){
        if(attr==="button_text"){
            this.button_text = newVal;
        }
        if(attr==="button_id"){
            this.button_id = newVal;
        }
        if(attr==="button_class"){
            this.button_class = newVal;
        }
        if(attr==="spanclass"){
            this.spanclass = newVal;
        }
        if(attr==="button_text_second"){
            this.button_text_second = newVal;
        }
        if(attr==="button_id_second"){
            this.button_id_second = newVal;
        }
        if(attr==="button_class_second"){
            this.button_class_second = newVal;
        }
        if(attr==="spanclass_second"){
            this.spanclass_second = newVal;
        }
    }
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = /*html*/`
        <div class="form-group">
            <button-component button_text="${this.button_text}" button_id="${this.button_id}" button_class="btn-primary" spanclass="${this.spanclass}"></button-component>
            <button-component button_text="${this.button_text_second}" button_id="${this.button_id_second}" button_class="btn-primary" spanclass="${this.spanclass_second}"></button-component>
        </div>
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

customElements.define('button-group', ButtonGroupComponent);