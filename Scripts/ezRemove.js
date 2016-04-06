/////
/// remove tweet with shortcut
///
/// Creator : 우사긔
///// 
function removeTweet(id) {
    if (id == undefined) return;
    //var st = TwitterService.status.get(id);
    //var verfied = eval('(' + TwitterService.call('account/verify_credentials.json').replace("HTTP/(.*)directmessages", "") + ')');
    //if (st.user.id == verfied.id) {
        TwitterService.status.destroy(id);
    //}
};

System.addKeyBindingHandler('D'.charCodeAt(0), 1, removeTweet);
