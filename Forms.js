import ui from 'http://127.0.0.1:5500/Atenci%C3%B3n%20preuniversitaria/src/js/UI.js';
const UI = new ui();

export default class Form {
    constructor(action,fields){
        this.action = action
        this.fields = fields
    }
    build(insertInto){
        const divForm = document.createElement('div');
        divForm.classList = 'section';
        const form = UI.createElement('form',{
            action: this.action,
            method: 'POST'
        });
        form.classList.add('form');
        this.fields.forEach(field =>form.appendChild(field.build()));
        const button = UI.createElement('button');
        button.classList.add('btn');
        button.type = 'submit';
        button.textContent = 'Enviar';
        divForm.appendChild(form);
        form.appendChild(button);
        this.validate(form);
        insertInto.appendChild(divForm);
    }
    validate(form){
        form.addEventListener('submit',e=>{
            e.preventDefault();
            const errors = [];
            this.fields.forEach(field=>errors.push(field.validate()));
            if(!errors.some(isError=>isError)){  
                this.fields.forEach(field=>{
                    if(field.type === undefined){
                        field.fillField();
                    }
                });
                UI.spinner(document.querySelector('form'));
                form.submit();
            }
        })
    }
}