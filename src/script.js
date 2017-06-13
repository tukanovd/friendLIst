/*  обработчик заполнения списков друзей
    сначала проверяем есть ли списки в localstorage
    и если нет, то подгружаем из vk.com
 * */
function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.64';
    }

    return new Promise((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 6060286
        });

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

var template = `
{{#each items}}
    <li id="{{uid}}" class="friend" draggable="true" ondragstart="dragStart(event)">
        <img src="{{photo_200}}">
        <p class="name">{{first_name}} {{last_name}}</p>
        <span id="addFriend" 
            class="glyphicon glyphicon-plus friend-ico" 
            onclick="setEvent(this.parentNode)">
        </span>    
    </li>
{{/each}}
`;
var templateFn = Handlebars.compile(template);

function checkLocalStorage() {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('friendList') || localStorage.getItem('friendFilter')) {
            friendList.innerHTML = templateFn(
                JSON.parse(localStorage.getItem('friendList'))
            );
            friendFilter.innerHTML = templateFn(
                JSON.parse(localStorage.getItem('friendFilter'))
            );

            return reject;
        }

        return resolve;
    })
}

new Promise(resolve => window.onload = resolve)
    .then(() => checkLocalStorage())
    .then(() => vkInit())
    .then(() => vkApi('friends.get', { fields: 'photo_200' }))
    .then((response) => {
        response
            .items
            .forEach((obj, i) => {
                obj.uid = i
            });
        friendList.innerHTML = templateFn(response)
    })
    .catch(e => alert('Ошибка: ' + e.message));

