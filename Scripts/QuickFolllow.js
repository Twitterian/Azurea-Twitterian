// 단축키로 유저 교류 액션
// modified by @SasarinoMARi
// Last Update: 2016-08-08
// see more info : http://usagination.com

// Shift + B : 블락
// Shift + Q : 팔로우
// Shift + K : 블언블

var path = System.applicationPath.replace(/[^(.)^(\\)]+(.)exe/, '');
function run(arg)
{
    System.launchApplication(path + "PythonLauncher.exe", arg, 0);
}

function getUserIdFromTweetId(id)
{
    var user = eval('(' +
            TwitterService.call('/users/show/' + TwitterService.status.get(id).user.screen_name + '.json')
            .replace("HTTP/(.*)directmessages", "")
        + ')');
        return user.screen_name;
}

function getUserIdFromReTweetId(id)
{
    var user = eval('(' +
            TwitterService.call('/users/show/' + TwitterService.status.get(id).user.screen_name + '.json')
            .replace("HTTP/(.*)directmessages", "")
        + ')');
        return user.screen_name;
}

function Block(userid)
{
    var api = "blocks/create.json";
    var parameter = "\"{'screen_name':'" + userid+"'}\"";
    run("PostClient.py " + api + ' ' + parameter);
}
function Unblock(userid)
{
    var api = "blocks/destroy.json";
    var parameter = "\"{'screen_name':'" + userid+"'}\"";
    run("PostClient.py " + api + ' ' + parameter);
}
function Follow(userid)
{
    var api = "friendships/create.json";
    var parameter = "\"{'screen_name':'" + userid+"'}\"";
    run("PostClient.py " + api + ' ' + parameter);
}

function QuickBlock(id)
{
	if(System.inputBox("확인", "정말 블락하시려면 엔터를 눌러주세요", false) != undefined)
	    Block(TwitterService.status.get(id).user.screen_name);
	return true;
}
function QuickFollow(id)
{
	if(System.inputBox("확인", "정말 팔로우하시려면 엔터를 눌러주세요", false) != undefined)
	    Follow(TwitterService.status.get(id).user.screen_name);
	return true;
}
function QuickBUB(id)
{
	if(System.inputBox("확인", "정말 블언블하시려면 엔터를 눌러주세요", false) !=undefined)
	{
        var id = TwitterService.status.get(id).user.screen_name;
        Block(id);
        Unblock(id);
    }
	return true;
}
function RTBlock(id)
{
	if(System.inputBox("확인", "정말 블락하시려면 엔터를 눌러주세요", false) != undefined)
	    Block(TwitterService.status.get(id).retweeted_by);
	return true;
}

System.addKeyBindingHandler('B'.charCodeAt(0), 1, QuickBlock);
System.addKeyBindingHandler('B'.charCodeAt(0), 4, QuickBlock);
System.addKeyBindingHandler('K'.charCodeAt(0), 1, QuickBUB);
System.addKeyBindingHandler('F'.charCodeAt(0), 1, QuickFollow);
