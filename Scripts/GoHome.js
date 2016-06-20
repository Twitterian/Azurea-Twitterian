// 퇴근까지 몇 시간 남았는지 알려주는 스크립트입니다.
// modified by @SasarinoMARi
// Last Update: 2016-06-20
// see more info : http://usagination.com

var goHour = 10; // 출근 시간
var goMin = 0; // 출근 분

var homeHour = 19; // 퇴근 시간
var homeMin = 0; // 퇴근 분

var homeStrings = ['퇴근', '집에', '회사']; // 대상 키워드
var homeImages = ['pic.twitter.com/WpZWZYoaqW', 'pic.twitter.com/ZSMnj0nwBa', 'pic.twitter.com/mpcC8YgmYI', 'pic.twitter.com/urvDRVz7A7', 'pic.twitter.com/3J4QD6EbTf']; // 첨부할 사진

function GetHomeString() {
    var date = new Date();
    var curHour = date.getHours();
    var curMin = date.getMinutes();

    var leftTime = homeHour - curHour;
    var leftMin = 0;

    if (homeMin > 0) {
        leftMin += homeMin;
    }
    if (curMin > 0) {
        leftMin += 60 - curMin;
        leftTime--;
    }

    if (leftTime > 0 || (leftTime == 0 && leftMin > 0)) {
        var fuckStr = "@" + TwitterService.currentUser.screen_name + " 퇴근까지 " + leftTime + '시간 ' + leftMin + '분 남았습니다. ' + homeImages[Math.floor(Math.random() * homeImages.length)];
        //System.alert(fuckStr);
        return fuckStr;
    }

    return '';
}

TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s) {
    if (s.user.id != TwitterService.currentUser.id) return; // 내가 쓴 트윗이 아니면 예외 처리
    if (s.retweeted_by) return; // 리트윗 된 트윗은 예외 처리

    for (var i = 0; i < homeStrings.length; i++) {
        if (s.text.indexOf(homeStrings[i]) != -1) {
            for (var j = 0; j < homeImages.length; j++) {
                if (s.text.indexOf(homeImages[j]) != -1) {
                    return false;
                }
            }
            var output = GetHomeString();
            if (output != '')
                TwitterService.status.update(output, s.id);
        }
    }
    return false;
});

var runedMin = -1;
function TimeFunc() {
    var date = new Date();
    if (date.getMinutes() == 0 && runedMin != date.getMinutes()) {
        if (date.getHours() >= goHour && date.getHours() <= homeHour) {
            var output = GetHomeString();
            if (output != '')
                TwitterService.status.update(output, 0);
            runedMin = date.getMinutes();
        }
    }
    System.setTimeout(TimeFunc, 1000);
}
TimeFunc();
