import ui from './UI.js';
const UI = new ui();
export default class Field{
    constructor(type,label,required,name,placeholder,classList){
        this.type = type;
        this.label = label;
        this.required = required;
        this.name =name;
        this.placeholder = placeholder;
        this.classList = classList?classList:[];
    }
    build(){
        const div = UI.createElement('div',{},['campo',...this.classList]);
        const label = UI.createElement('label',{for: this.name},['fs-3']);
        const input = UI.createElement('input',{name:this.name,id:this.name,type:this.type,placeholder:this.placeholder},['fs-4','form-control']);
        label.textContent = this.label;
        if(this.required){
            input.addEventListener('blur',e=>{
                this.validateEntry(e);
            })
            const span = UI.createElement('span');
            span.classList.add('required');
            span.textContent = '*';
            label.appendChild(span)
        }else{
            input.addEventListener('blur',e=>e.target.value?e.target.classList.add('input-good'):e.target.classList.remove('input-good'));
        }
        div.appendChild(label);
        div.appendChild(input);
        return div
    }
    validate(){
        const input = document.getElementsByName(this.name)[0];
        if(!input.value && this.required){
            UI.showMessage(`El campo ${this.label} es obligatorio`,document.querySelector('button[type="submit"]'));
            return true;
        }else if(input.type === 'email' && input.dataset.error ==='true'){
            UI.showMessage(`Introduce un email válido`,document.querySelector('button[type="submit"]'));
            return true;
        }else if(input.type === 'tel' && input.dataset.error ==='true'){
            UI.showMessage(`Introduce un teléfono válido`,document.querySelector('button[type="submit"]'));
            return true;
        }else{
            return false
        }
    }
    validateEntry(event){
        switch (this.type) {
            case 'email':
                this.validateEmail(event);
                break;
            case 'tel':
                this.validatePhone(event);
                break;
            default:
                this.validateText(event);
        }
    }
    validateEmail(e){   
        const regexMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!regexMail.test(e.target.value)){
            UI.showMessage(`Debes colocar un email válido 😅`, e.target.parentNode.nextElementSibling);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else{
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
            e.target.dataset.error='false';
        }
    }
    validatePhone(e){
        const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(!regexPhone.test(e.target.value)){
            UI.showMessage(`Debes colocar un teléfono válido 😅`, e.target.parentNode.nextElementSibling);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else{
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
            e.target.dataset.error='false';
        }
    }
    validateText(e){
        if(!e.target.value){
            UI.showMessage(`El campo ${this.label} es obligatorio 😅`, e.target.parentNode.nextElementSibling);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
        }else{
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
        }
    }
}