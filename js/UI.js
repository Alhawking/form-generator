export default class UI{
    createElement(element,attributes,classes){
        const newElement = document.createElement(element);
        if(attributes!==undefined){
            for (const [key,value] of Object.entries(attributes)) {
                newElement.setAttribute(key,value);
            }
        }
        if(classes!==undefined){
            for(const styleClass of classes){
                newElement.classList.add(styleClass);
            }
        }
        return newElement
    }
    spinner(insertInto) {
        const spinner = document.createElement('div');
        spinner.id = 'spinner';
        spinner.innerHTML = `
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        `
        spinner.style.display = 'flex';
        insertInto.appendChild(spinner);
    }
    showMessage(message, fieldName){
        const div = document.querySelector(`#alert-${fieldName}`);
        div.style.animation = 'message 1s';
        div.classList.remove('d-none');
        div.querySelector('div').textContent = message;
        setTimeout(() =>div.classList.add('d-none'),5000);
    }
}