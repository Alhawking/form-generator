import ui from './UI.js';
const UI = new ui();
export default class CustomSelect{
    constructor(label,required,name,endPoint){
        this.label = label;
        this.name = name;
        this.required = required;
        this.endPoint = endPoint;
        this.options = [];
        this.button;
        this.option;
    }
    selectOption(options,button) {
            options.forEach(option=>{
                const divOption = UI.createElement('div',{},['custom-option']);
                divOption.dataset.name = this.name;
                divOption.innerHTML = `
                <span>${option.label}</span>
                `
                divOption.dataset.value = option.value;
                divOption.addEventListener('click',function handler(){
                    const deleteButton = UI.createElement('div');
                    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>`
                    divOption.appendChild(deleteButton);
                    new CustomSelect().replace(button.parentNode,divOption,button);
                    document.querySelector('.div-search').remove();
                    divOption.removeEventListener('click',handler);
                    deleteButton.addEventListener('click',()=>{
                        new CustomSelect().replace(divOption.parentNode,button,divOption);
                    },true);
                })
                document.querySelector('.content').appendChild(divOption);
            })
    }
    getOptions(endPoint){
        return new Promise((resolve, reject) =>{
            fetch(endPoint)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(e=> reject(e));
        }) 
    }
    async createWindow(){
        await this.getOptions(this.endPoint)
            .then(json => this.options = json);
        const window = UI.createElement('div',{},['div-search']);
        const inputSearch = UI.createElement('div',{},['search']);
        const content = UI.createElement('div',{},['content']);
        const inputContainer = UI.createElement('div',{},['div-input']);
        const buttonClose = UI.createElement('div',{},['svg-close']);
        const svgSearch = UI.createElement('div',{},['svg-search']);
        svgSearch.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
        </svg>`
        buttonClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>`
        const input = UI.createElement('input',{
            type:'text',
            placeholder:'Buscar',
            id:'search',
        });
        inputContainer.append(svgSearch,input);
        inputSearch.append(inputContainer,buttonClose);
        window.append(inputSearch,content);
        this.closeWindow(buttonClose);
        document.querySelector('form').appendChild(window);
        this.selectOption(this.options,this.button);
    }
    closeWindow(button){
        button.addEventListener('click',()=>document.querySelector('.div-search').remove());
    }
    build(){
        const container = UI.createElement('div',{},['custom-select']);
        const label = UI.createElement('label');
        const button = this.createButton();
        label.textContent = this.label;
        if(this.required){
            const span = UI.createElement('span',{},['required']);
            span.textContent = '*';
            label.appendChild(span);
        }
        container.append(label,button);
        return container
    }
    replace(parentNode,newChild,oldChild) {
        parentNode.replaceChild(newChild,oldChild);
    }
    createButton(){
        const button = UI.createElement('div');
        const svg = UI.createElement('div');
        const textAdd = UI.createElement('span');
        button.classList.add('custom-select-button');
        textAdd.textContent = 'Agregar';
        svg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="48" height="48" viewBox="0 0 24 24" stroke-width="3" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        `;
        svg.style.display = 'flex';
        button.append(svg,textAdd);
        this.button = button;
        this.button.addEventListener('click',()=>{
            this.createWindow();
        });
        return button;
    }
    validate(){
        const option = document.querySelector(`.custom-select div[data-name="${this.name}"]`);
        let error;
        if(option === null && this.required){
            error = true;
            UI.showMessage(`Debes elegir una opción de ${this.label}`,document.querySelector('button[type="submit"]'))
        }else{
            error = false;
        }        
        return error;
    }
    fillField(){
        const option = document.querySelector(`div[data-name="${this.name}"]`);
        if(option){
            const value = option.querySelector('span').textContent;
            const input = UI.createElement('input',{
                type:'text',
                name:this.name,
            },['hidden']);
            input.value = value;
            document.querySelector('form').appendChild(input);
        }
    }
}