// Отримуємо елементи HTML-сторінки за допомогою ідентифікаторів
const table = document.getElementById('table');
const select = document.getElementById('select');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time-display');

// Створюємо змінні для зберігання даних
let size = parseInt(select.value);
let startTime;
let elapsedTime = 0;
let timerInterval;
let nextNumber = 1;
let isSuccess = true;

// Функція для генерації випадкових чисел у межах від 1 до size^2
function generateNumbers() {
  const numbers = [];
  for (let i = 1; i <= size * size; i++) {
    numbers.push(i);
  }
  numbers.sort(() => Math.random() - 0.5);
  return numbers;
}

// Функція для створення таблиці
function createTable(isTrue) {
  if(isTrue == true){
    const numbers = generateNumbers();
    table.innerHTML = '';
    for (let i = 0; i < size; i++) {
    const row = table.insertRow();
    for (let j = 0; j < size; j++) {
      const cell = row.insertCell();
      cell.textContent = numbers[i * size + j];
      cell.addEventListener('click', onCellClick);
    }
  }
  }
  
}

// Обробник події для кнопки "Почати"
startButton.addEventListener('click', () => {
  nextNumber = 1;
  select.style.display = "none";
  startButton.disabled = true;
  createTable(true);
  
  startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = `Час: ${elapsedTime / 1000} сек.`;
  }, 100);
});

function onCellClick(event) {
  const cell = event.target;
  if (cell.textContent === nextNumber.toString()) { // якщо клітинка містить наступне за порядком число
    nextNumber++;
    cell.style.backgroundColor = 'green'; // зміна фону клітинки на зелений
    cell.style.color = 'white'; // зміна кольору тексту на білий
  
  }else {
    select.style.display = "inline-block";
    isSuccess = false;
    clearInterval(timerInterval); // зупинка таймера
    timeDisplay.textContent = `Результат: Провал`; // відображення часу
    cell.style.backgroundColor = 'red'; // зміна фону клітинки на червоний
    cell.style.color = 'white'; // зміна кольору тексту на білий
    startButton.disabled = false;
    nextNumber = 1;
  }

  if (nextNumber === table.rows.length ** 2 + 1 && isSuccess) { // якщо натиснуто на останнє число
    select.style.display = "inline-block";
    clearInterval(timerInterval); // зупинка таймера
    timeDisplay.textContent = `Результат: ${elapsedTime / 1000} сек.`; // відображення часу
    nextNumber = 1; // скидання змінної наступного числа
    startButton.disabled = false;
    setTimeout("alert(`Ви пройшли таблицю за ${elapsedTime / 1000} секунд.`);", 200)
    nextNumber = 1;
  }
}

// Обробник події для випадаючого меню
select.addEventListener('change', () => {
  size = parseInt(select.value);
  createTable(false);
});
