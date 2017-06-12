function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}
function inputKeyUpEvent(e) {
    let friends;

    if (e.id == 'inputLeft') {
        friends = document.querySelector('#friendList');
    }
    else {
        friends = document.querySelector('#friendFilter');
    }
    [].forEach.call(friends.children, (i) => {
        i.hidden = true;
        if (isMatching(i.textContent.trim(), e.value)) {
            i.hidden = false;
        }
    })

}
