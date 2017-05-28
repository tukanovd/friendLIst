/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let _reloadBtn = document.createElement('input');
let _filterError = document.createElement('div');

_filterError.id = 'filter-failed';
_filterError.style.display = 'none';
_reloadBtn.id = 'filter-reload';
_reloadBtn.style.display = 'none';
homeworkContainer.appendChild(_reloadBtn);
homeworkContainer.appendChild(_filterError);
/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return require('./index.js').loadAndSortTowns();
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let filterError = homeworkContainer.querySelector('#filter-failed');
let filterReload = homeworkContainer.querySelector('#filter-reload');
let townsPromise;

function tryToLoadTowns() {
    loadingBlock.style.display = 'block';
    filterBlock.style.display = 'none';
    filterError.style.display = 'none';
    filterReload.style.display = 'none';
    loadTowns().then((result) => {
        townsPromise = result;
    }).catch(() => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'none';
        filterError.style.display = 'block';
        filterReload.style.display = 'block';
        // throw new Error('somthing went wrong');
    })
}
tryToLoadTowns();
filterBlock.style.display = 'block';
loadingBlock.style.display = 'none';
filterInput.addEventListener('keyup', function () {
    let val = this.value.trim(),
        filtredTowns;

    filterResult.innerHTML = '';
    if (val !== '') {
        filtredTowns = townsPromise.filter((el) => {
            return isMatching(el.name, val)
        });

        filtredTowns.forEach((el) => {
            filterResult.innerHTML += `<div>${el.name}</div>`;
        })
    }
});

filterReload.addEventListener('click', tryToLoadTowns);

export {
    loadTowns,
    isMatching
};
