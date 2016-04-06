// 特定の人をドロップする
// from UserBlock on Azurea Wiki
// modified by @Song_SH
// Last Update: 2015-07-11 01:34

var dropUsers = [];
var dropUsers_hash = {};

Array.prototype.indexOf = function(s)
{
	for (var i = 0; i < this.length; ++i ){
		if(this[i] == s) return i;
	}
	return -1;
};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(s)
{
	return dropUsers.indexOf(s.user.screen_name) != -1;
});

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(s)
{
	return dropUsers.indexOf(s.retweeted_by) != -1
});

// ステータス前処理イベントをフック。
// 予測変換リストを更新する
System.addContextMenuHandler("이 유저 뮤트", 0, function(status)
{
	var s = TwitterService.status.get(status);
	var t = s.user.screen_name;
	if(dropUsers_hash[t] == undefined)
	{
		dropUsers_hash[t] = 1;
		dropUsers.push(t);
	}
});

// hook the quit event
// save the list
System.addEventListener('quit', function()
{
	var value = dropUsers.join('\n');
	if(value[0] == '\n') value = value.slice(1);
	FileSystem.privateStore.write('UserMute.txt', value, 3);
});

// load the list
if(FileSystem.privateStore.exists('UserMute.txt'))
{
	var value = FileSystem.privateStore.read('UserMute.txt');
	if(value != '')
	{
		dropUsers = value.split('\n');
		for(var i = 0; i < dropUsers.length; ++i) dropUsers_hash[dropUsers[i]] = 1;
	}
}