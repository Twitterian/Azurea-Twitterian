// Shift + D로 작성한 트윗과 리트윗을 바로 지울 수 있습니다.
// modified by @SasarinoMARi
// Last Update: 2016-02-14
// see more info : http://usagination.com

function removeTweet(id) {
    if (id == undefined) return;
    //var st = TwitterService.status.get(id);
    //var verfied = eval('(' + TwitterService.call('account/verify_credentials.json').replace("HTTP/(.*)directmessages", "") + ')');
    //if (st.user.id == verfied.id) {
        TwitterService.status.destroy(id);
    //}
};

System.addKeyBindingHandler('D'.charCodeAt(0), 1, removeTweet);
