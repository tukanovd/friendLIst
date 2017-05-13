/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {

    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var nArr = new Array();

    for (var i = 0; i < array.length; i++) {
        nArr.push(fn(array[i], i, array));
    }

    return nArr;

}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var prev = initial;

    for (var i = 0; i < array.length; i++) {

        if (i == 0 && prev == undefined) {
            prev = array[i];
            continue;
        }

        prev = fn(prev, array[i], i, array);
    }

    return prev;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj[prop] ? true : false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var arrayOfProps = [];

    for (var key in obj) {
        arrayOfProps.push(key);
    }

    return arrayOfProps;

}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var arrayOfProps = [];

    for (var key in obj) {
        arrayOfProps.push(key.toUpperCase());
    }

    return arrayOfProps;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
    var newArray = [];

    if (to == undefined) {
        to = array.length;
    }
    else if (to < 0) {
        to += array.length;
    }
    else if (to > array.length) {
        to = array.length;
    }

    if (from < 0) {
        from += array.length;
    }
    if (from < 0) {
        from = 0;
    }

    for (var i = from; i < to; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    return new Proxy(obj, {
        set(target, prop, value) {
            return target[prop] = value * value;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
