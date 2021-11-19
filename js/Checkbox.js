import ui from './UI.js';
const UI = new ui();
export default class Checkbox {
    constructor(label,required,name,isPrivacyPolicy,classList) {
        this.label = label;
        this.required = required;
        this.name = name;
        this.isPrivacyPolicy = isPrivacyPolicy;
        this.classList = classList?classList:[];
    }
    build(){
        const div = UI.createElement('div',{},['campo','form-check']);
        const checkbox = UI.createElement('input',{type:'checkbox'},['form-check-input']);
        checkbox.dataset.name = this.name;
        const label = UI.createElement('label',{for: this.name},['fs-3','form-check-label']);
        label.textContent = this.label;
        if(this.required){
            const span = UI.createElement('span');
            span.classList.add('required');
            span.textContent = '*';
            label.appendChild(span)
        }
        div.append(label,checkbox);
        this.addEventListener(checkbox);
        this.checkbox = div;
        if(this.isPrivacyPolicy){
            this.hasPrivacyPolicy(div);
        }
        return div
    }
    createInput(){
        const input = UI.createElement('input',{name:this.name,id:this.name});
    }
    addEventListener(checkbox){
        checkbox.addEventListener('click',()=>{
            if (checkbox.dataset.checked === 'true') {
                checkbox.innerHTML = '';
                checkbox.dataset.checked = 'false';
            }else{
                checkbox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="48" height="48" viewBox="0 0 24 24" stroke-width="3" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l5 5l10 -10" />
            </svg>
            `;
            checkbox.dataset.checked = 'true'
            }
        })
    }
    hasPrivacyPolicy(div){
        const a = UI.createElement('a');
        a.href = 'https://ibero.mx/sites/all/themes/ibero/descargables/avisos-legales/direccion-de-comunicacion-institucional.pdf';
        a.textContent = 'Ver aquí';
        a.target = '_blank'
        a.classList.add('privacy-policy');
        div.querySelector('label').appendChild(a);
    }
    validate(){
        if(this.required){
            if(this.checkbox.querySelector('div.check-div').children.length === 0 ){
                UI.showMessage('Debes aceptar nuestro Aviso de Privcidad',document.querySelector('button[type="submit"]'));
                return true;
            }else{}
        }else{
            return false;
        }
    }
    fillField(){
        const check = document.querySelector(`div[data-name="${this.name}"]`);
        if(check.dataset.checked==='true'){
            const input = UI.createElement('input',{
                type:'checkbox',
                name:this.name,
                checked:'on'
            },['hidden'])
            document.querySelector('form').appendChild(input);
        }
    }
}