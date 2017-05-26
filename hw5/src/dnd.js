/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.style.position = 'absolute';
homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100%';

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {

    function getRandomColor() {
        let letters = '0123456789ABCDEF',
            color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function getRandomPosition(element) {
        let x = document.body.offsetHeight - element.clientHeight,
            y = document.body.offsetWidth - element.clientWidth,
            randomX = Math.floor(Math.random() * x),
            randomY = Math.floor(Math.random() * y);

        return [randomX, randomY];
    }

    let el = document.createElement('div'),
        _rndWidth = Math.ceil(Math.random() * 300) + 'px',
        _rndHeight = Math.ceil(Math.random() * 300) + 'px',
        _rndPosition = getRandomPosition(el);

    el.style.backgroundColor = getRandomColor();
    el.style.width = _rndWidth;
    el.style.height = _rndHeight;
    el.style.position = 'absolute';
    el.style.top = _rndPosition[0] + 'px';
    el.style.left = _rndPosition[1] + 'px';
    el.style.zIndex = 0;
    el.classList = 'draggable-div';

    return el;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.onmousedown = () => {

        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
        }

        homeworkContainer.onmousemove = (e) => {
            moveAt(e);
        }
        target.onmouseup = () => {
            homeworkContainer.onmousemove = null;
            target.onmouseup = null;
        }
    }

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);

    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
