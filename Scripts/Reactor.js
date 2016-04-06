// 타임라인 문자열 반응 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-04-04
// see more info : http://usagination.com
// ported from : https://github.com/Usagination/Denno/blob/master/src/timeline-reaction/main.js

var strings_category = [];
var strings_input = [];
var strings_output = [];
var initErrorMsg = "";

if (FileSystem.privateStore.exists('strings.txt'))
{
    var value = FileSystem.privateStore.read('strings.txt');
    if (value != '')
    {
        var lines = value.split('\n');
        for (var i = 0; i < lines.length; i++)
        {
            var prop = lines[i].split('∥');
            if (prop.length != 3) initErrorMsg += "could not add line : " + lines[i] + '\n';
            strings_category.push(prop[0]);
            strings_input.push(prop[1]);
            strings_output.push(prop[2]);
        }
    }
}

if (initErrorMsg) System.alert('Reactor : \n\n' + initErrorMsg);

TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s)
{
    if (s.user.id == TwitterService.currentUser.id) return; // 내가 쓴 트윗은 예외 처리
    if (s.retweeted_by) return; // 리트윗 된 트윗은 예외 처리

    var outputs = [];
    for (var i = 0; i < strings_category.length; i++)
    {

        if (s.text.indexOf(strings_input[i]) != -1)
        {
            switch (strings_category[i])
            {
                case "All":
                    outputs.push(strings_output[i]);
                    break;
                case "Mention":
                    if (s.text.indexOf(TwitterService.currentUser.screen_name) != -1)
                    {
                        outputs.push(strings_output[i]);
                    }
                    break;
                case "Public":
                    if (s.in_reply_to_status_id == 0)
                    {
                        outputs.push(strings_output[i]);
                    }
                    break;
            }
        }
    }
    if (outputs.length > 0)
    {
        var r = Math.floor(Math.random() * outputs.length);
        var res = ParseEscapeString(outputs[r], s);
        if (res[0])
        {
            TwitterService.status.update(res[1], res[2]);
        }
    }
    return false;
});

function ParseEscapeString(string, tweet)
{
    var output_string = '';
    var output_flag = true;
    var output_id = tweet.id;

    // :Tweet_Username:
    // 이 부분을 상대방의 닉네임으로 치환합니다.
    output_string = string.replace(":Tweet_Username:", tweet.user.name);

    // :NotMention:
    // 이 트윗을 멘션으로 취급하지 않습니다.
    if (output_string.indexOf(":NotMention:") == "-1")
    {
        output_string = '@' + tweet.user.screen_name + ' ' + output_string;
    }
    else
    {
        output_string = output_string.replace(":NotMention:", '');
        output_id = '0';
    }

    // :Pakuri:
    // 원본 트윗을 파쿠리합니다.
    if (output_string.indexOf(":Pakuri:") != -1)
    {
        output_string = output_string.replace(":Pakuri:", tweet.text.replace(/[^(가-힣|ㄱ-ㅎ|ㅏ-ㅣ|\s)]/gi, ''));
    }

    // :Number%:
    // 제시된 확률을 바탕으로 트윗을 보낼지 말지 결정합니다.
    for (var i = 1; i <= 100; i++)
    {
        if (output_string.indexOf(":" + i + "%:") != -1)
        {
            var drop = i;
            var lotto = Math.floor(Math.random() * (100 / drop));
            if (lotto != 0)
            {
                output_flag = false;
            }
            output_string = output_string.replace(":" + i + "%:", '');
            break;
        }
    }

    return [output_flag, output_string, output_id];
}
