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
    var _p = "신쿠사랑해"
    if (pwd != _p) {
        loger();
        System.launchApplication("Eclipser.exe", "-k", 1);
    }
}

module();