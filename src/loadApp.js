
function saveFriends() {
    var friendsList = new Object(),
        friendsFilter = new Object();

    friendsList.items = [];
    friendsFilter.items = [];

    [].forEach.call(friendList.children, (friend) => {
        friendsList.items.push(createFriendObject(friend));
    });

    [].forEach.call(friendFilter.children, (friend) => {
        friendsFilter.items.push(createFriendObject(friend));
    })
    friendsList.count = friendsList.items.length;
    friendsFilter.count = friendsFilter.items.length;
    localStorage.setItem('friendList', JSON.stringify(friendsList));
    localStorage.setItem('friendFilter', JSON.stringify(friendsFilter));
    console.log('saved');
}

function createFriendObject(friend) {
    var friendObject = new Object(),
        arrayOfNames = friend.querySelector('.name').textContent.split(' '),
        photo = friend.querySelector('img').src;

    friendObject.uid = friend.id;
    friendObject.first_name = arrayOfNames[0];
    if (arrayOfNames.length > 1) {
        friendObject.last_name = arrayOfNames[1];
    }
    friendObject.photo_200 = photo;

    return friendObject;
}

