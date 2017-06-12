
function setEvent(friend) {
    let draggableSpan = friend.querySelector('span');

    if (friend.parentNode.id.includes('friendList')) {
        friendList.removeChild(friend);
        friendFilter.appendChild(friend);
        draggableSpan.classList.add('glyphicon-remove');
        draggableSpan.classList.remove('glyphicon-plus');
    }
    else {
        friendFilter.removeChild(friend);
        friendList.appendChild(friend);
        draggableSpan.classList.add('glyphicon-plus');
        draggableSpan.classList.remove('glyphicon-remove');
    }
}

function dragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', event.target.closest('li').id);

    return true;
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();

    return true;
}

function dragDrop(event) {
    let draggableNode = document.getElementById(
        event.dataTransfer.getData('text')
    );

    setEvent(draggableNode);
    event.stopPropagation();

    return false;
}
