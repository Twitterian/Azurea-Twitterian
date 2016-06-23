// 리스트에 등록된 유저만 보여지게 하는 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-01-29
// see more info : http://usagination.com

var users = [];
var listid = 226244466;
var scriptOn = false;

Array.prototype.indexOf = function (s) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i].screen_name == s) return i;
    }
    return -1;
};
function getListMembers() {
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
TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s) {
    // 이 메서드는 false를 반환할 때 트윗을 표시합니다

    if(!scriptOn) return false;

    // if(System.views.currentView.viewKind != 0)
    //{
    //    // 메인 뷰가 열려있을 때만 해당 스크립트가 동작하도록 합니다.
    //    // 스트림 단위에서 차단해야지 뷰만으론 버그가
    //    return false;
    //}

    if(users.indexOf(s.user.screen_name) == -1)
     {
        // 트윗한 유저가 리스트에 없으면 표시안함
         return true;
     }
     if(s.retweeted_by && users.indexOf(s.retweeted_by) == -1)
     {
        // 리트윗한 유저가 리스트에 없으면 표시안함
        return true;
     }
    return false;
});

System.addKeyBindingHandler('L'.charCodeAt(0), 1, function ()
{
    scriptOn =! scriptOn;
    if(users.length == 0) getListMembers();
    if(scriptOn)
    {
        System.alert("ShowOnlyListedUsers 스크립트 활성화됨.\n\n" + listid + "리스트에서 " + users.length + "명의 유저 읽어옴");
    }
    else
    {
        System.alert("ShowOnlyListedUsers 스크립트 바활성화됨.");
    }
});