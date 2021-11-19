import ui from './UI.js';
const UI = new ui();
export default class Select{
    constructor(label,required,name,options,classList){
        this.label = label;
        this.required = required;
        this.name = name;
        this.options = options;
        this.classList = classList?classList:[];
    }
    build(){
        const div = UI.createElement('div',{},['campo','justify-content-center',...this.classList]);
        const label = UI.createElement('label',{for: this.name},['fs-3']);
        const select = UI.createElement('select',{name:this.name,id:this.name},['fs-3','form-select']);
        const errorMsg = UI.createElement('div',{role:'alert',id:`alert-${this.name}`},['alert','alert-warning','d-flex','align-items-center','fs-4','mt-3','d-none']);
        errorMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill me-4" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
            <div>
            </div>`;
        label.textContent = this.label;
        if(this.required){
            const span = UI.createElement('span');
            span.classList.add('required');
            span.textContent = '*';
            label.appendChild(span)
        }
        this.buildOption(select,{text:'--Seleccionar--',value:'',disabled:true,selected:true});
        for(const objOption of this.options){
            this.buildOption(select,objOption);
        }
        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(errorMsg);
        return div
    }
    buildOption(select,objOption){
        const option = UI.createElement('option',{value:objOption.value});
        option.disabled = objOption.disabled;
        option.selected = objOption.selected;
        option.textContent = objOption.text;
        select.appendChild(option);
    }
    validate(){
        const select = document.getElementsByName(this.name)[0];    
        let error;
        if(select.options.selectedIndex === 0 && this.required){
            error = true
            UI.showMessageAt(`Por favor selecciona una opción del campo ${this.label}`,this.name,document.querySelector('button[type="submit"]'))
        }else{
            error=false
        }
        return error;
    }
}