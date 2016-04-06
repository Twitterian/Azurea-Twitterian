function followStatus(id) {
    var str = '';

    var user = eval('(' +
            TwitterService.call('/users/show/' + TwitterService.status.get(id).user.screen_name + '.json')
            .replace("HTTP/(.*)directmessages", "")
        + ')');
    if (user.id == TwitterService.currentUser.id) {
        str += '나다. ' + user.name + '.';
    }
    else {
        var following = TwitterService.call('/friends/ids.json').replace("HTTP/(.*)directmessages", "");
        var followers = TwitterService.call('/followers/ids.json').replace("HTTP/(.*)directmessages", "");


        if (followers.match(user.id)) {
            if (following.match(user.id)) {
                str += "나 ↔ 상대";
            }
            else {
                str += '나 ← 상대' ;
            }
        }
        else if (following.match(user.id)) {
                str += '나 → 상대' ;
        }
        else {
            str += '나 ─ 상대';
        }
    }

    System.alert(
        str
    );
}

function profile(id) {
    if (id == undefined) return;
    var user = eval('(' +
            TwitterService.call('/users/show/' + TwitterService.status.get(id).user.screen_name + '.json')
            .replace("HTTP/(.*)directmessages", "")
        + ')');

    var str = user.name + " (@" + user.screen_name + ") [" + user.id_str + "]\n" +
        "자기소개 [ " + user.description + " ]\n\n" +
        "위치 : " + user.location + "\n\n" +
        "웹사이트 : " + ((user.url == null) ? '' : user.url) + "\n\n" +
	    user.statuses_count + " 트윗 (" + Math.round((user.statuses_count / 100)) / 10 + "K)\n" +
	    "팔로잉 : " + user.friends_count + " / 팔로워 : " + user.followers_count + "\n" +
	    "가입일 : " + user.created_at;

    System.alert(
        str
	);
};

function headerImage(id) {
    if (id == undefined) return;
    var Regx = '(https://[^/]+/profile_banners/[0-9]+/[0-9]+/1500x500)';
    var result = TwitterService.call('/users/profile_banner.json?screen_name=' + TwitterService.status.get(id).user.screen_name)
        .replace(/\\/g, '')
        .match(Regx);
    System.openPreview(0, result[0]);
}

function profileImage(id) {
    if (id == undefined) return;
    var img = eval('(' +
            TwitterService.call('/users/show/' + TwitterService.status.get(id).user.screen_name + '.json')
            .replace("HTTP/(.*)directmessages", "")
        + ')')
        .profile_image_url_https.
        replace('_normal.', '.');
    System.openPreview(0, img);
}

System.addKeyBindingHandler('I'.charCodeAt(0), 0, profile);
System.addKeyBindingHandler('I'.charCodeAt(0), 1, followStatus);
System.addKeyBindingHandler('O'.charCodeAt(0), 1, headerImage);
System.addKeyBindingHandler('P'.charCodeAt(0), 1, profileImage);