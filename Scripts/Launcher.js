// 아즈레아 응용 프로그램 런처
// modified by @SasarinoMARi
// Last Update: 2016-02-08
// see more info : http://usagination.com

FileSystem.privateStore.write('location.dat', System.applicationPath.replace(/[^(.)^(\\)]+(.)exe/, ''), 3);
function run(exe, arg) {
    var path = FileSystem.privateStore.read('location.dat') + exe;
    System.launchApplication(path, arg, 1);
}
System.addContextMenuHandler('Decchi 실행', 0, function (id) {
    run('Decchi/Decchi.exe', '');
});
System.addContextMenuHandler('Tix 실행', 0, function (id)
{
    run('TiX/TiX.exe', '');
});
System.addContextMenuHandler("─────", 0, function (status) { });
System.addContextMenuHandler('아즈레아 폴더 열기', 0, function (id)
{
    run('Eclipser.exe', '\"-s&' + FileSystem.privateStore.read('location.dat')+'\"');
});
System.addContextMenuHandler('아즈레아 재시작', 0, function (id)
{
    System.launchApplication("Eclipser.exe", "-k", 1);
    run('Eclipser.exe', '\"-r&' + FileSystem.privateStore.read('location.dat') + 'Azurea.exe\"');
});
System.addContextMenuHandler("─────", 0, function (status) { });
System.addKeyBindingHandler('C'.charCodeAt(0), 3, function (id) {
    run('TiX/TiX.exe', 'Stasis');
});
System.addKeyBindingHandler('V'.charCodeAt(0), 3, function (id)
{
    if (id == undefined) return;
    var username = TwitterService.status.get(id).user.screen_name;
    run('TiX/TiX.exe', 'Stasis ' + username + ' ' + id);
});
//System.addKeyBindingHandler('Q'.charCodeAt(0), 3, function (id)
//{
//    run('Decchi/Decchi.exe', '-q');
//});
