// 리스트에 등록된 유저만 보여지게 하는 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-01-29
// see more info : http://usagination.com

// Ctrl + O : 스크립트 On / Off
// Ctrl + L : 리스트 새로고침
// Ctrl + I : 대상 리스트 변경

var users = [];
var listid;
var scriptOn = '0';

Array.prototype.indexOf = function (s) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i].screen_name == s) return i;
    }
    return -1;
};
function getListMembers() {
    if (!listid) return;
    var me = eval('(' + TwitterService.call('/account/verify_credentials.json').replace("HTTP/(.*)directmessages", "") + ')');
    users.push(me);

    var cursor = -1;
    while (cursor) {
        var members = eval('(' + TwitterService.call('/lists/members.json?list_id=' + listid + "&slug=team&owner_screen_name=" + me.screen_name + "&cursor=" + cursor).replace("HTTP/(.*)directmessages", "") + ')');
        for (var i = 0; i < members.users.length; i++) {
            users.push(members.users[i]);
        }
        cursor = members.next_cursor;
    }
}
if (FileSystem.privateStore.exists('settings.ini')) {
    var value = FileSystem.privateStore.read('settings.ini');
    if (value != '') {
        var lines = value.split('\n');
        scriptOn = parseInt(lines[0]);
        listid = lines[1];
    }
    if (scriptOn) getListMembers();
}
function getListId() {
    listid = System.inputBox("리스트 ID", (listid ? listid : ""), false);
    getListMembers();
}
TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s) {
    // 이 메서드는 false를 반환할 때 트윗을 표시합니다
    return scriptOn &&
            // 트윗한 유저가 리스트에 없으면 표시안함
            (users.indexOf(s.user.screen_name) == -1) 
            // 리트윗한 유저가 리스트에 없으면 표시안함
            && (s.retweeted_by && users.indexOf(s.retweeted_by) == -1)
        
});
System.addEventListener('quit', function () {
    var value = scriptOn.toString() + '\n' + listid.toString();
    FileSystem.privateStore.write('settings.ini', value, 3);
});
//System.addKeyBindingHandler('L'.charCodeAt(0), 2, getListMembers);
//System.addKeyBindingHandler('O'.charCodeAt(0), 2, function () {
//    if (scriptOn) scriptOn = 0;
//    else scriptOn = 1;

//    if (scriptOn && !listid) getListId();
//    System.alert("리스트 스트림 " + (scriptOn ? "" : "비") + "활성화.");
//});
//System.addKeyBindingHandler('I'.charCodeAt(0), 2, function () {
//    getListId();
//});