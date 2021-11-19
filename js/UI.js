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
    showMessage(message, insertBefore, isError = true){
        const p = document.createElement('p');
        p.textContent = message;
        const div = document.createElement('div');
        div.appendChild(p);
        if (isError) {
            div.classList.add('error');
        } else {
            div.classList.add('message');
        }
        document.querySelector('form').insertBefore(div, insertBefore);
        setTimeout(() => div.remove(), 5000)
    }
}