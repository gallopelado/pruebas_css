export default class Panel extends HTMLElement {
    constructor(){
        super();
    }
    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = /*html*/`
            <div class="panel panel-default"></div>
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

customElements.define('panel-organism', Panel);