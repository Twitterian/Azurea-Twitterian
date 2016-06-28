// 단축키로 이미지 빠르게 저장하는 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-01-27
// see more info : http://usagination.com

// Ctrl + S : 기본 디렉터리에 이미지 저장
// Shift + S : 기본 디렉터리 하위에 카테고리 분류 후 이미지 저장
// Ctrl + Shift + S : 다른 이름으로 저장

FileSystem.privateStore.write('location.dat', System.applicationPath.replace(/[^(.)^(\\)]+(.)exe/, ''), 3);
function SaveImage(id) {
    if (FileSystem.privateStore.exists('location.dat')) {
        var path = FileSystem.privateStore.read('location.dat') + 'Scripts/SaveImage.js.Private/AZSaveImage.exe';
        var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
        System.launchApplication(path, urls + " 0", 1);
    }
}
function SaveImageA(id) {
    if (FileSystem.privateStore.exists('location.dat')) {
        var path = FileSystem.privateStore.read('location.dat') + 'Scripts/SaveImage.js.Private/AZSaveImage.exe';
        var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
        System.launchApplication(path, urls + " 1", 1);
    }
}
function SaveImageC(id) {
    if (FileSystem.privateStore.exists('location.dat')) {
        var path = FileSystem.privateStore.read('location.dat') + 'Scripts/SaveImage.js.Private/AZSaveImage.exe';
        var urls = TwitterService.call('statuses/lookup.json?id=20,' + id).replace(/\\/g, '');
        var category = System.inputBox("이미지 카테고리 지정", "", false).replace(/ /g, '_');
        if(category == undefined) return;
        System.launchApplication(path, urls + " 2 " + category, 1);
    }
}
System.addKeyBindingHandler('S'.charCodeAt(0), 2, SaveImage);
System.addKeyBindingHandler('S'.charCodeAt(0), 3, SaveImageA);
System.addKeyBindingHandler('S'.charCodeAt(0), 1, SaveImageC);
