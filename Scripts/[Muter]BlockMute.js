// 特定の人をドロップする
// from UserBlock on Azurea Wiki
// modified by @Song_SH
// Last Update: 2015-07-11 01:34

var blockUsers = [];
var blockUsers_hash = {};

Array.prototype.indexOf = function(s)
{
	for (var i = 0; i < this.length; ++i )
	{
		if(this[i] == s) return i;
	}
	return -1;
};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(s)
{
	return blockUsers.indexOf(s.user.id) != -1;
});

// refresh the block list
//System.addContextMenuHandler('LoadBlockList', 0, function()
//{
	var calltext = TwitterService.call('/blocks/ids.json');
	var callobj = eval('(' + calltext +')');
	if(callobj)
	{
	var block_count = callobj.ids.length;

	for(var i = 0; i < block_count; ++i)
	{
		if(blockUsers_hash[callobj.ids[i]] == undefined)
		{
			blockUsers_hash[callobj.ids[i]] = 1;
			blockUsers.push(callobj.ids[i]);
		}
	};
//});

// hook the quit event
// save the list
System.addEventListener('quit', function()
{
	var value = blockUsers.join('\n');
	if(value[0] == '\n') value = value.slice(1);
	FileSystem.privateStore.write('BlocknMute.txt', value, 3);
});

// load the list
if(FileSystem.privateStore.exists('BlocknMute.txt'))
{
	var value = FileSystem.privateStore.read('BlocknMute.txt');
	if(value != '')
	{
		blockUsers = value.split('\n');
		for(var i = 0; i < blockUsers.length; ++i) blockUsers_hash[blockUsers[i]] = 1;
	}
}
}
