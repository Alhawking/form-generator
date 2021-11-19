import classes from './js/Imports.js';
const { Form, Field, Select, Checkbox, CustomSelect } = classes;
const input = new Field('text', 'Nombre', true, 'firstName', 'Nombre', ['col-6']);
const input2 = new Field('text', 'Apellido Paterno', true, 'lastName', 'Apellido Paterno',['col-6']);
const input3 = new Field('text', 'Apellido Materno', false, 'lastName2', 'Apellido Materno');
const input4 = new Field('email', 'Correo Electrónico', true, 'email', 'correo@example.com',['col-6']);
const input5 = new Field('tel', 'Celular', true, 'mobileNumber', '',['col-6']);
const input6 = new Field('tel', 'Teléfono', false, 'phone', '',['col-6']);
const input7 = new Field('date', 'Fecha de nacimiento', true, 'birthDate', '');
const input8 = new Select('Año de interés', false, 'yearOfInterest', [{
        text: '2021',
        value: '2021',
    },
    {
        text: '2022',
        value: '2022',
    },
    {
        text: '2023',
        value: '2023',
    }
],['col-6']);
const input19 = new Select('Período de interés', false, 'periodOfInterest', [{
        text: 'Primavera',
        value: 'Primavera',
    },
    {
        text: 'Otoño',
        value: 'Otoño',
    }
],['col-6']);
const input9 = new Select('Grado', true, 'studyLevel', [{
        text: '1-(1° DE PREPA, 1 Ó 2 SEMESTRE 4°)',
        value: '1-(1° DE PREPA, 1 Ó 2 SEMESTRE 4°)'
    },
    {
        text: '2-(2° DE PREPA, 3 Ó 4 SEMESTRE 5°)',
        value: '2-(2° DE PREPA, 3 Ó 4 SEMESTRE 5°)'
    },
    {
        text: '3-(3° DE PREPA, 5 Ó 6 SEMESTRE 6°)',
        value: '3-(3° DE PREPA, 5 Ó 6 SEMESTRE 6°)'
    },
    {
        text: '4-(ABIERTA)',
        value: '4-(ABIERTA)'
    },
    {
        text: '5-(TERMINADA)',
        value: '5-(TERMINADA)'
    }
],['col-6']);
const input18 = new Select('Campus de interés', true, 'campus', [{
        text: 'Ciudad de México',
        value: 'Ciudad de México'
    },
    {
        text: 'Tijuana',
        value: 'Tijuana'
    }
],['col-6']);
const input10 = new Checkbox('¿Deseas recibir Información General?', false, 'generalInformation');
const input11 = new Checkbox('¿Deseas recibir información sobre Orientación Vocacional?', false, 'vocationalOrientation');
const input12 = new Checkbox('¿Deseas platicar con un académico de tu carrera de interés?', false, 'talkToAcademic');
const input13 = new Checkbox('¿Deseas iniciar con tu proceso de admisión?', false, 'beginAdmissionProcess');
const input14 = new Checkbox('Acepto aviso de privacidad', true, 'Privacy', true, );
const input15 = new CustomSelect('Colegio', true, 'college', 'https://raw.githubusercontent.com/Alhawking/Resources/master/colegios.json')
const input16 = new CustomSelect('Licenciatura de interés', true, 'degreeOfInterest', 'https://raw.githubusercontent.com/Alhawking/Resources/master/oferta-academica.json')
const input17 = new CustomSelect('Licenciatura de interés 2', false, 'degreeOfInterest', 'https://raw.githubusercontent.com/Alhawking/Resources/master/oferta-academica.json')
const form = new Form("", [
    input, input2, input4, input5, input6, input8, input19, input9, input18, input10, input11, input12, input13, input14, input15, input16, input17
]);
form.build(document.body);