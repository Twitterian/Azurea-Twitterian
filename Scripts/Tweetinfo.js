// 아즈레아 트윗 상세보기
// modified by @SasarinoMARi
// Last Update: 2016-05-31
// see more info : http://usagination.com

// Ctrl + I로 기능 발동

function info(id) {
    if (id == undefined) return;

    var t =  TwitterService.call('/statuses/show.json?id=' + id);
    var tweet = eval( '(' + t + ')' );

    var str =
        '원문 [ ' + tweet.text + ' ]\n\n' +
        tweet.retweet_count + '명이 이 트윗을 리트윗함\n' +
        tweet.favorite_count + '명이 마음에 들어함';

    System.alert(
        str
	);
};

System.addKeyBindingHandler('I'.charCodeAt(0), 2, info);
