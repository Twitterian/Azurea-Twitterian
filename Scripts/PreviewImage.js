// By - @Lolicon_sagi
// Last Update : 2015-02-18

//function PrivewImage(id) {
//    var regx = /"media_url":"http:\/\/pbs.twimg.com\/media\/[^.]+.[a-z]+"/g;
//    var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');;
//    var m = urls.match(regx);
//    if (m == null) return;
//    rootLoop:
//        for (var i = 0; i < m.length; i++) {
//            m[i] = m[i].replace('"media_url":', "").replace(/"/g, '');
//            for (var j = 0; j < i; j++) {
//                if (m[i] == m[j]) {
//                    continue rootLoop;
//                }
//            }
//            System.openPreview(0, m[i]);
//        }
//}

function ShowTweetWithBrowsesr(id) {
    System.openUrl("https://twitter.com/" + TwitterService.status.get(id).user.screen_name + "/status/" + id);
}

//System.addKeyBindingHandler('V'.charCodeAt(0), 1, PrivewImage);
System.addKeyBindingHandler('W'.charCodeAt(0), 1, ShowTweetWithBrowsesr);
