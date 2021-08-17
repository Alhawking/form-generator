import ui from './UI.js';
const UI = new ui();
export default class Select{
    constructor(label,required,name,options){
        this.label = label;
        this.required = required;
        this.name = name;
        this.options = options;
    }
    build(){
        const div = UI.createElement('div');
        div.classList.add('campo');
        const label = UI.createElement('label',{for: this.name});
        const select = UI.createElement('select',{name:this.name,id:this.name});
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
            UI.showMessage(`Por favor selecciona una opción del campo ${this.label}`,document.querySelector('button[type="submit"]'))
        }else{
            error=false
        }
        return error;
    }
    fillField(){
        
    }
}