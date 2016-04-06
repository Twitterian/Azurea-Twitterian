// 트윗하기 전에 특정 문자열 치환
// modified by @SasarinoMARi
// Last Update: 2016-01-21
// see more info : http://usagination.com

var keywords = [];

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

if (FileSystem.privateStore.exists('keywords.txt')) {
    var value = FileSystem.privateStore.read('keywords.txt', 3);
    if (value != '') {
        lines = value.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var obj = lines[i].trim().split(' ');
            if (obj.length == 2) {
                var src = obj[0].replace('_', ' ');
                var dest = obj[1].replace('_', ' ');
                keywords.push([src, dest]);
            }
        }
    }
}
else {
    FileSystem.privateStore.write('keywords.txt', "[키워드]", 3);
}

TwitterService.addEventListener('preSendUpdateStatus', function (s) {
    for (var i = 0; i < keywords.length; i++) {
        s.text = s.text.replaceAll(keywords[i][0], keywords[i][1]);
    }
});