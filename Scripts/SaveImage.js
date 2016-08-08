// 리스트에 등록된 유저만 보여지게 하는 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-07-26s
// see more info : http://usagination.com

// Ctrl + S : 기본 디렉터리에 이미지 저장
// Shift + S : 기본 디렉터리 하위에 카테고리 분류 후 이미지 저장
// Ctrl + Shift + S : 다른 이름으로 저장

var path = System.applicationPath.replace(/[^(.)^(\\)]+(.)exe/, '');
function run(exe, arg)
{
    System.launchApplication(path + exe, arg, 1);
}
function SaveImage(id)
{
    var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
    run('AZSaveImage.exe', urls + " 0");
}
function SaveImageA(id)
{
    var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
    run('AZSaveImage.exe', urls + " 1");
}
function SaveImageC(id)
{
    var category = System.inputBox("이미지 카테고리 지정", "", false);
    if (category == undefined) return;
    category = category.replace(/ /g, '_');
    var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
    run('AZSaveImage.exe', urls + " 2 " + category);
}
System.addKeyBindingHandler('S'.charCodeAt(0), 2, SaveImage);
System.addKeyBindingHandler('S'.charCodeAt(0), 3, SaveImageA);
System.addKeyBindingHandler('S'.charCodeAt(0), 1, SaveImageC);
