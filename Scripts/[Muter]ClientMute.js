// 特定の人をドロップする
// from UserBlock on Azurea Wiki
// modified by @Song_SH
// Last Update: 2015-07-11 01:34

var dropClients = [];
var dropClients_hash = {};

Array.prototype.indexOf = function(s)
{
	for (var i = 0; i < this.length; ++i ){
		if(this[i] == s) return i;
	}
	return -1;
};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(s)
{
	return dropClients.indexOf(s.source) != -1;
});

// ステータス前処理イベントをフック。
// 予測変換リストを更新する
System.addContextMenuHandler('이 클라이언트 뮤트', 0, function(status)
{
	var s = TwitterService.status.get(status);
	var t = s.source;
	if(dropClients_hash[t] == undefined)
	{
		dropClients_hash[t] = 1;
		dropClients.push(t);
		dropClients.sort();
	}
});

// hook the quit event
// save the list
System.addEventListener('quit', function()
{
	var value = dropClients.join('\n');
	if(value[0] == '\n') value = value.slice(1);
	FileSystem.privateStore.write('ClientMute.txt', value, 3);
});

// load the list
if(FileSystem.privateStore.exists('ClientMute.txt'))
{
	var value = FileSystem.privateStore.read('ClientMute.txt');
	if(value != '')
	{
		dropClients = value.split('\n');
		dropClients.sort();
		for(var i = 0; i < dropClients.length; ++i) dropClients_hash[dropClients[i]] = 1;
	}
}