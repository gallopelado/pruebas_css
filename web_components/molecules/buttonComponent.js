export default class Button extends HTMLElement {
    constructor(){
        super();
    }
    static get observedAttributes(){
        return [
            'button_text', 'button_id', 'button_class','spanclass'
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
    }
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = /*html*/`
            <button class="btn ${this.button_class}" type="button" id="${this.button_id}"><span class="glyphicon ${this.spanclass}"></span> ${this.button_text}</button>
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

customElements.define('button-component', Button);