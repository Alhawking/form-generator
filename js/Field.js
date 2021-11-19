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
        const errorMsg = UI.createElement('div',{role:'alert',id:`alert-${this.name}`},['alert','alert-warning','d-flex','align-items-center','fs-4','mt-3','d-none']);
        errorMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill me-4" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
            <div>
            </div>`;
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
            input.addEventListener('blur',e=>this.validateEntry(e));
        }
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(errorMsg);
        return div
    }
    validate(){
        const input = document.getElementsByName(this.name)[0];
        if(!input.value && this.required){
            UI.showMessageAt(`El campo ${this.label} es obligatorio`,this.name);
            return true;
        }else if(input.type === 'email' && input.dataset.error ==='true'){
            UI.showMessageAt(`El campo ${this.label} es obligatorio`,this.name);
            return true;
        }else if(input.type === 'tel' && input.dataset.error ==='true'){
            UI.showMessageAt(`El campo ${this.label} es obligatorio`,this.name);
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
        if(!regexMail.test(e.target.value) && this.required){
            UI.showMessage(`Debes colocar un email válido 😅`, this.name);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else if(!regexMail.test(e.target.value) && !this.required && e.target.value){
            UI.showMessage(`Debes colocar un email válido 😅`, this.name);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else if(!this.required && e.target.value){
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
            e.target.dataset.error='false';
        }
    }
    validatePhone(e){
        const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(!regexPhone.test(e.target.value) && this.required){
            UI.showMessage(`Debes colocar un teléfono válido 😅`, this.name);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else if(!regexPhone.test(e.target.value) && !this.required && e.target.value){
            UI.showMessage(`Debes colocar un teléfono válido 😅`, this.name);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
            e.target.dataset.error='true';
        }else if(!this.required && e.target.value){
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
            e.target.dataset.error='false';
        }
    }
    validateText(e){
        if(!e.target.value && this.required){
            UI.showMessage(`El campo ${this.label} es obligatorio 😅`,this.name);
            e.target.classList.add('input-error');
            e.target.classList.remove('input-good');
        }else if(!this.required && e.target.value){
            e.target.classList.remove('input-error');
            e.target.classList.add('input-good');
        }
    }
}