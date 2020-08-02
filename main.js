const englishInput = document.getElementById('input-eng'),
    russianInput = document.getElementById('input-rus'),
    inputs = document.querySelectorAll('input'),
    saveButton = document.getElementById('btn'),
    table = document.getElementById('table');


let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));
let addWorldToTable = index => {
    table.innerHTML += `
    <tr>
        <td>${words[index].translate}</td> 
        <td>${words[index].russian}</td>
        <td>
            <input type = "button" value = 'Delete' class='buttion'>
        </td>
    </tr>`
};

words.forEach((element, i) => {
    addWorldToTable(i);
});

const but = Array.from(document.getElementsByClassName('buttion'));
but.forEach(element => {
    element.addEventListener('click', element => {
        words.splice(element, 1);
        localStorage.setItem('words', JSON.stringify(words));
        element.target.parentElement.parentElement.remove()
    });
});

class CreateWord {
    constructor(translate, russian) {
        this.translate = translate;
        this.russian = russian;
    }
}

saveButton.addEventListener('click', () => {
    if (
        russianInput.value.length < 1 ||
        englishInput.value.length < 1 ||
        !isNaN(russianInput.value) ||
        !isNaN(englishInput.value)
    ) {
        for (let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for (let key of inputs) {
            key.classList.remove('error');
        }
    }
    words.push(new CreateWord(englishInput.value, russianInput.value));
    localStorage.setItem('words', JSON.stringify(words));
    addWorldToTable(words.length - 1)
});