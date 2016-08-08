// 아즈레아 응용 프로그램 런처
// modified by @SasarinoMARi
// Last Update: 2016-02-08
// see more info : http://usagination.com

var path = System.applicationPath.replace(/[^(.)^(\\)]+(.)exe/, '');
function run(exe, arg)
{
    System.launchApplication(path + exe, arg, 1);
}

System.addKeyBindingHandler('C'.charCodeAt(0), 3, function (id) {
    run('TiX.exe', 'Stasis');
});
System.addKeyBindingHandler('V'.charCodeAt(0), 3, function (id)
{
    if (id == undefined) return;
    var username = TwitterService.status.get(id).user.screen_name;
    //System.alert('Stasis ' + username + ' ' + id);
    run('TiX.exe', 'Stasis @' + username + ' ' + id);
});
System.addContextMenuHandler('Tix 실행', 0, function (id)
{
    run('TiX.exe', '');
});
System.addContextMenuHandler("─────", 0, function (status) { });
System.addContextMenuHandler('아즈레아 폴더 열기', 0, function (id)
{
    run('Eclipser.exe', '\"-s&' + path + '\"');
});
System.addContextMenuHandler('아즈레아 재시작', 0, function (id)
{
    System.launchApplication("Eclipser.exe", "-k", 1);
    run('Eclipser.exe', '\"-r&' + path + 'Azurea.exe\"');
});
System.addContextMenuHandler("─────", 0, function (status) { });
