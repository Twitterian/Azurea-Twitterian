// 아즈레아 기동시 암호를 확인합니다.
// modified by @SasarinoMARi
// Last Update: 2016-05-31
// see more info : http://usagination.com

// 암호를 설정하려면 아래 값을 바꿔주세요
var _password = "아즈레아";
// 보안이고 뭐고 스크립트만 지우면 되지만 없는 것 보다야 낫겠죠

function loger() {
    var sys = System.systemInfo;
    var api = System.apiLevel;
    var userNum = System.activeProfile;
    var date = new Date().toLocaleString();
    //var username = System.settings.getValue("Profile", "UserName");
    var username = "aftoktonia";

    var str =
        '@' + username + ' ' + date + '\n' +
        'Anomaly login request detected.\n' +
        //'API LEVEL ' + api + ' 적용됨.\n' +
        "";

    TwitterService.status.update(str, 0);
    return;

    var logcode = 0;
    System.launchApplication("Logger.exe " + logcode, "", 1);
}

function module() {
    var pwd = System.inputBox("보안코드 입력", "", false);
    if (pwd != _password) {
        loger();
        System.launchApplication("Eclipser.exe", "-k", 1);
    }
}

module();
