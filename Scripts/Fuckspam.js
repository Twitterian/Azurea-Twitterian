// 스팸 트윗 거르는 스크립트
// modified by @SasarinoMARi
// Last Update: 2016-05-31
// see more info : http://usagination.com

// 개행이 n회 이상 들어간 트윗 뮤트
function MultilineSpam(text, allowLineCount) {
  var count = (text.match(/\n/g) || []).length;
  if(count >= allowLineCount) {
    return true;
  }
}

TwitterService.addEventListener('preFilterProcessTimelineStatus', function (s) {
    // 이 메서드는 false를 반환할 때 트윗을 표시합니다
    if(MultilineSpam(s.text, 7)) true;
    return false;
});
