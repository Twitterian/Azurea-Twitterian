// 선택된 트윗의 리트윗 및 마음 수 확인
// modified by @SasarinoMARi
// Last Update: 2016-06-23
// see more info : http://usagination.com

function info(id) {
    if (id == undefined) return;
    
    var tweet = eval( '(' +TwitterService.call('/statuses/show.json?id=' + id)+ ')' );

    if(tweet.retweeted_status != null) tweet = tweet.retweeted_status;

    var str =
        '트윗 ID : ' + tweet.id +'\n\n' +
        '[ ' + tweet.text + ' ]\n\n' +
        tweet.retweet_count + '번 리트윗됨.\n' +
        tweet.favorite_count + '명이 마음에 들어함.';

    System.alert(str);
};

System.addKeyBindingHandler('I'.charCodeAt(0), 2, info);