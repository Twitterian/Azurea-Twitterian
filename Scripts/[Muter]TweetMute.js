// 특정 트윗이 TL에 나타나지 않게 합니다
// modified by @SasarinoMARi
// Last Update: 2016-02-14
// see more info : http://usagination.com

var dropTweets = [];

Array.prototype.indexOf = function(s)
{
	for (var i = 0; i < this.length; ++i ){
		if(this[i] == s) return i;
	}
	return -1;
};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(s)
{
    return dropTweets.indexOf(s.retweeted ? s.retweeted_id : s.id) != -1;
});

System.addContextMenuHandler('이 트윗 뮤트', 0, function(status)
{
	var s = TwitterService.status.get(status);
	var id = s.retweeted ? s.retweeted_id : s.id;
	if (dropTweets.indexOf(id) == -1)
	{
	    dropTweets.push(id);
	    dropTweets.sort();
	}
});

System.addEventListener('quit', function()
{
    var value = dropTweets.join('\n');
	if(value[0] == '\n') value = value.slice(1);
	FileSystem.privateStore.write('TweetMute.txt', value, 3);
});

if (FileSystem.privateStore.exists('TweetMute.txt'))
{
    var value = FileSystem.privateStore.read('TweetMute.txt');
	if(value != '')
	{
	    dropTweets = value.split('\n');
	    dropTweets.sort();
	}
}