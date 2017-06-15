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
System.addContextMenuHandler('블락 리스트 새로고침', 0, function()
{
	LoadBlockList('-1');
});
LoadBlockList('-1');
function LoadBlockList(cursor)
{
	var calltext = TwitterService.call('/blocks/ids.json?cursor=' + cursor);
	var callobj = eval('(' + calltext +')');
	if(callobj && callobj.ids)
	{
		var block_count = callobj.ids.length;

		for(var i = 0; i < block_count; ++i)
		{
			if(blockUsers_hash[callobj.ids[i]] == undefined)
			{
				blockUsers_hash[callobj.ids[i]] = 1;
				blockUsers.push(callobj.ids[i]);
			}
		}

        /*
	        System.alert( "다음 커서 : " + callobj.next_cursor_str + "\n" +
	                  "현재 커서의 id 수 : " + callobj.ids.length + "\n" +
	                  "전체 블락된 유저 수 : " + blockUsers.length  );
        */

		if(callobj.next_cursor_str != '0')
        {
            LoadBlockList(callobj.next_cursor_str);
        }
	}
	else
	{
	    System.alert("API 오류로 블락 리스트를 온전히 가져오지 못했습니다.\n가져온 블락된 유저 수 : " + blockUsers.length);
	}
}
