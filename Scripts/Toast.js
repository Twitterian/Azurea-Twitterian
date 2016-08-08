var TOAST_MESSAGE = 0x100000;
var username = '@' + TwitterService.currentUser.screen_name + '$|@' + TwitterService.currentUser.screen_name + ' ';

TwitterService.addEventListener('preProcessTimelineStatus', function (status)
{
    if (status.text.match(username))
    {
        System.showMessage(status.text, status.user.name + '(@' + status.user.screen_name + ')님의 멘션', TOAST_MESSAGE);
    }
//    if (status.retweeted)
//    {
//        if(status.user.screen_name == username)
//        {
//            var tweet = eval( '(' +TwitterService.call('/statuses/show.json?id=' + id)+ ')' );
//            if(tweet.retweeted_status != null)
//            {
//                var count = tweet.retweet_count;
//                count
//                if(count <= 10)
//                    System.showMessage(status.text, '내 트윗이 리트윗됨', TOAST_MESSAGE);
//            }
//        }
//
//    }
});

TwitterService.userStream.addEventListener('receiveDirectMessage', function (message)
{
    System.showMessage(message.text, message.sender.name + '(@' + message.sender.screen_name + ')님의 DM', TOAST_MESSAGE);
});
TwitterService.userStream.addEventListener('receiveDirectMessage', function (source, target, target_object)
{
    System.showMessage(target_object, source.name+ '(@' + source.screen_name + ')님이 내 글을 마음에 들어합니다', TOAST_MESSAGE);
});