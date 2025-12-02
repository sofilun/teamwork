const Answers={
    question1: "part",
    question2: "artist",
    question3: ["a","b","d"],
    question4: ["a","c"],
    question5: "writer",
    question6: "frontispiece",
    question7: "библиотека",
    question8: "лев николаевич толстой",
    question9: "contents",
    question10: ["a","b","d"]
};

let timerInterval;
let seconds = 0;
let minutes = 0;

/**
 * Форматирование времени в формате 00:00
 * @param {type} time
 * @returns {String}
 */
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
};

/**
 * Обновление таймера
 * @returns {undefined}
 */
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer'); 
    timerElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
};

/**
 * Запуск таймера
 * @returns {undefined}
 */
function startTimer() {
    minutes = 5;
    seconds = 0;
    updateTimerDisplay();    
    timerInterval = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                table();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }, 1000);
};

document.addEventListener('DOMContentLoaded', startTimer);

/**
 * Остановка таймера
 * @returns {undefined}
 */
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
};

/**
 * Сброс таймера в 00:00
 * @returns {undefined}
 */
function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
};

/**
 * Блокировка формы после завершения теста
 * @returns {undefined}
 */
function blockingForm () {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.disabled = true;
    });
};

/**
 * Заполняем таблицу
 * @returns {undefined}
 */
function table () {
    resetTimer();
    blockingForm();
   
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.backgroundColor = '#DDA0DD';
   
    const headers = ['№', 'Вопрос', 'Ваш ответ', 'Правильный ответ', 'Балл'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.style.padding = '10px';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
    });
    
    tableHead.appendChild(headerRow);
    const table = document.getElementById('table');
    table.insertBefore(tableHead, table.firstChild);
    const userAnswers = {
        question1: document.querySelector('input[name="question1"]:checked')?.value || 'нет ответа',
        question2: document.querySelector('input[name="question2"]:checked')?.value || 'нет ответа',
        question3: Array.from(document.querySelectorAll('input[name="question3"]:checked')).map(el => el.value) || ['нет ответа'],
        question4: Array.from(document.querySelectorAll('input[name="question4"]:checked')).map(el => el.value) || ['нет ответа'],
        question5: document.getElementById('role-1').value || 'нет ответа',
        question6: document.getElementById('role-2').value || 'нет ответа',
        question7: document.getElementById('question-1').value.toLowerCase() || 'нет ответа',
        question8: document.getElementById('question-2').value.toLowerCase() || 'нет ответа',
        question9: document.querySelector('input[name="question9"]:checked')?.value || 'нет ответа',
        question10: Array.from(document.querySelectorAll('input[name="question10"]:checked')).map(el => el.value) || ['нет ответа']
    };   
    const questions = [
        {
            text: "Что такое обложка книги?",
            correct: "Твёрдая или мягкая внешняя часть книги",
            user: userAnswers.question1 === 'part' ? "Твёрдая или мягкая внешняя часть книги" : 
                userAnswers.question1 === 'sheet' ? "Лист с названием книги" : 
                userAnswers.question1 === 'pictures' ? "Картинки внутри книги" :
                userAnswers.question1 === 'нет ответа' ? "нет ответа" : userAnswers.question1,
            isCorrect: userAnswers.question1 === Answers.question1
        },
        {
            text: "Кто рисует картинки в книгах?",
            correct: "Художник-иллюстратор",
          user: userAnswers.question2 === 'artist' ? "Художник-иллюстратор" :
                  userAnswers.question2 === 'writer' ? "Писатель" :
                  userAnswers.question2 === 'librarian' ? "Библиотекарь" : 
                  userAnswers.question2 === 'нет ответа' ? "нет ответа" : userAnswers.question2,
            isCorrect: userAnswers.question2 === Answers.question2
        },
        {
            text: "Какие бывают виды книг?",
            correct: "Сказки, Энциклопедии, Стихи",
            user: userAnswers.question3[0] === 'нет ответа' ? "нет ответа" : 
                userAnswers.question3.map(a => 
                a === 'a' ? "Сказки" :
                a === 'b' ? "Энциклопедии" :
                a === 'c' ? "Воздушные шары" :
                a === 'd' ? "Стихи" : a
            ).join(', ') || 'нет ответа',
            isCorrect: arraysEqual(userAnswers.question3, Answers.question3)
        },
        {
            text: "Из чего делают книги?",
            correct: "Бумага, Картон",
            user: userAnswers.question4[0] === 'нет ответа' ? "нет ответа" : 
                userAnswers.question4.map(a => 
                a === 'a' ? "Бумага" :
                a === 'b' ? "Стекло" :
                a === 'c' ? "Картон" :
                a === 'd' ? "Металл" : a
            ).join(', ') || 'нет ответа',
            isCorrect: arraysEqual(userAnswers.question4, Answers.question4)
        },
        {
            text: "Как называется человек, который пишет книги?",
            correct: "Писатель",
            user: userAnswers.question5 === 'writer' ? "Писатель" :
                  userAnswers.question5 === 'teacher' ? "Учитель" :
                  userAnswers.question5 === 'doctor' ? "Врач" :
                  userAnswers.question5 === 'cook' ? "Повар" :
                  userAnswers.question5 === 'нет ответа' ? "нет ответа" : userAnswers.question5,
            isCorrect: userAnswers.question5 === Answers.question5
        },
        {
            text: "Как называется картинка перед началом книги?",
            correct: "Фронтиспис",
            user: userAnswers.question6 === 'frontispiece' ? "Фронтиспис" :
                  userAnswers.question6 === 'table-of-contents' ? "Оглавление" :
                  userAnswers.question6 === 'title-page' ? "Титульный лист" :
                  userAnswers.question6 === 'page' ? "Страница" :
                  userAnswers.question6 === 'нет ответа' ? "нет ответа" : userAnswers.question6,
            isCorrect: userAnswers.question6 === Answers.question6
        },
        {
            text: "Как называется место, где хранят много книг?",
            correct: "Библиотека",
            user: userAnswers.question7 === 'нет ответа' ? "нет ответа" : userAnswers.question7,
            isCorrect: userAnswers.question7.includes('библиотека')
        },
        {
            text: "Кто написал 'Войну и мир'?",
            correct: "Лев Николаевич Толстой",
            user: userAnswers.question8 === 'нет ответа' ? "нет ответа" : userAnswers.question8,
            isCorrect: userAnswers.question8.includes('лев николаевич толстой')
        },
        {
            text: "Что находится в самом конце книги и помогает найти нужную страницу?",
            correct: "Содержание",
            user: userAnswers.question9 === 'contents' ? "Содержание" :
                  userAnswers.question9 === 'alphabet' ? "Алфавит" :
                  userAnswers.question9 === 'page' ? "Страница" :
                  userAnswers.question9 === 'нет ответа' ? "нет ответа" : userAnswers.question9,
            isCorrect: userAnswers.question9 === Answers.question9
        },
        {
            text: "Какие из этих элементов помогают сделать книгу красивой и интересной?",
            correct: "Красочная обложка с рисунком, Красивый шрифт букв, Узорные рамки вокруг текста",
            user: userAnswers.question10[0] === 'нет ответа' ? "нет ответа" : 
                userAnswers.question10.map(a => 
                a === 'a' ? "Красочная обложка с рисунком" :
                a === 'b' ? "Красивый шрифт букв" :
                a === 'c' ? "Номера страниц в углу" :
                a === 'd' ? "Узорные рамки вокруг текста" : a
            ).join(', ') || 'нет ответа',
            isCorrect: arraysEqual(userAnswers.question10.sort(), Answers.question10.sort())
        }
    ];
    const tableBody = document.getElementById('tablebody');
    let totalScore = 0;    
    questions.forEach((q, index) => {
        const row = document.createElement('tr');
        row.style.backgroundColor = q.isCorrect ? "#98FB98" : "#F08080";
        // Номер вопроса
        const numCell = document.createElement('td');
        numCell.textContent = index + 1;
        row.appendChild(numCell);
        // Текст вопроса
        const questionCell = document.createElement('td');
        questionCell.textContent = q.text;
        row.appendChild(questionCell);        
        // Ответ пользователя
        const userAnswerCell = document.createElement('td');
        userAnswerCell.textContent = q.user;     
        row.appendChild(userAnswerCell);        
        // Правильный ответ
        const correctAnswerCell = document.createElement('td');
        correctAnswerCell.textContent = q.correct;
      row.appendChild(correctAnswerCell);        
        // Баллы
        const scoreCell = document.createElement('td');
        const score = q.isCorrect ? 1 : 0;
        totalScore += score;
        scoreCell.textContent = score;
        row.appendChild(scoreCell);
        
        tableBody.appendChild(row);
    });   
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4" style="text-align: right; font-weight: bold;">Итого:</td>
        <td style="font-weight: bold;">${totalScore} из ${questions.length}</td>
    `;
    tableBody.appendChild(totalRow);
    document.getElementById('table').style.display = 'table';
};

document.getElementById('bt').addEventListener('click', function() {
    this.disabled = true;
    this.textContent = 'Тест завершен';

    table();
});

/**
 * Сравнение длины массивов для 3 и 4 вопроса
 * @param {type} arr1
 * @param {type} arr2
 * @returns {Boolean}
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};
