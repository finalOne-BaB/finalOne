// 특정 서비스에 종속되지 않는 기능의 경우 별도 파일로 관리

// 날짜를 지정한 포맷에 맞춰 반환
const dateFormat = function (value, format) {
  // value : 문자열로 된 날짜
  // format : 출력 포맷 ( 년도는 yyyy, 월은 MM 일은 dd로 표시)

  // value가 null, undefined, 빈 문자열, 잘못된 날짜인 경우 빈 문자열 반환
  if (!value || isNaN(new Date(value).getTime())) return '';

  let date = new Date(value);

  // 4자리로 표시하는 년도
  let year = date.getFullYear();

  // 2자리로 표시하는 월
  let month = ("0" + (date.getMonth() + 1)).slice(-2);

  // 2자리로 표시하는 일
  let day = ("0" + date.getDate()).slice(-2);

  
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  // 요청한 출력 포맷 중 각 항목(년도, 월, 일)에 해당하는 값들로 대체
  let result = format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
  return result;
};

export default {
  dateFormat,
};

