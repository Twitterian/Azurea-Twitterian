// 해당 유저의 트윗을 일정 시간동안 타임라인에 나타나지 않게 합니다.
// modified by @SasarinoMARi
// Last Update: 2016-02-14
// see more info : http://usagination.com

var dropUsers = [];
var dropUsers_hash = {};

Array.prototype.indexOfID = function (id) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i].id == id) return i;
    }
    return -1;
};

function Print()
{
    var str = "Droped Users : \n";
    for (var i = 0; i < dropUsers.length; i++) {
        str += dropUsers[i].id + ' ' + dropUsers[i].target + '\n';
    }
    str = str.slice(0, str.length - 1);
    System.alert(str);
}

TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s) {
    var index = dropUsers.indexOfID(s.retweeted ? s.retweeted_id : s.user.id)
    if (index != -1) {
        if (dropUsers[index].target <= new Date().getTime()) {
            if (dropUsers.length == 1) {
                dropUsers = [];
                dropUsers_hash = {};
            }
            else {
                dropUsers = dropUsers.splice(index, 1);
                dropUsers_hash[dropUsers[index]] = undefined;
            }
            return false;
        }
        else {
            return true;
        }
    }
    return false;
});

function Drop(userID, hour) {
    if (dropUsers_hash[userID] == undefined) {
        var date = new Date().getTime();
        var variation = hour * 60 * 60 * 1000;
        variation = 30000;
        var _target = date + variation;

        dropUsers_hash[userID] = 1;
        dropUsers.push({ id: userID, target: _target });
    }
}

System.addContextMenuHandler("이 유저를 1시간동안 뮤트", 0, function (status) {
    var s = TwitterService.status.get(status);
    var t = s.user.id;
    Drop(t, 1);
});
System.addContextMenuHandler("이 유저를 12시간동안 뮤트", 0, function (status) {
    var s = TwitterService.status.get(status);
    var t = s.user.id;
    Drop(t, 12);
});
System.addContextMenuHandler("이 유저를 24시간동안 뮤트", 0, function (status) {
    var s = TwitterService.status.get(status);
    var t = s.user.id;
    Drop(t, 24);
});

System.addEventListener('quit', function () {
    var str = "";
    for (var i = 0; i < dropUsers.length; i++) {
        str += dropUsers[i].id + ' ' + dropUsers[i].target + '\n';
    }
    str = str.slice(0, str.length - 1);
    FileSystem.privateStore.write('DropUsers.txt', str, 3);
});

if (FileSystem.privateStore.exists('DropUsers.txt')) {
    var value = FileSystem.privateStore.read('DropUsers.txt');
    if (value != '') {
        var strings = value.split('\n');
        for (var i = 0; i < strings.length; i++) {
            var splited = strings[i].split(' ');
            dropUsers.push({ id: splited[0], target: splited[1] });
            dropUsers_hash[dropUsers[i]] = 1;
        }
    }
    //for (var i = 0; i < dropUsers.length; i++) {
    //    System.alert(dropUsers[i].target + '\n' + new Date().getTime())
    //    if (dropUsers[i].target <= new Date().getTime()) {
    //        System.alert("drop");
    //        dropUsers = dropUsers.splice(i, 1);
    //        dropUsers_hash[dropUsers[i]] = 0;
    //    }
    //}
    //System.alert(dropUsers.length);
}