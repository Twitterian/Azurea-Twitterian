function info(id) {
    if (id == undefined) return;
    
    var t =  TwitterService.call('/statuses/show.json?id=' + id);

    System.alert(t);
    var tweet = eval(
        '(' +
           t
        + ')'
        );

    var str =
        '리트윗 ' + tweet.favourites_count + '회\n' +
        tweet.favourites_count + '명이 마음에 들어함.';

    System.alert(
        str
	);
};

System.addKeyBindingHandler('I'.charCodeAt(0), 2, info);

//statuses/show.jsonasdf