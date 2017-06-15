import axios from 'axios'


export function loginOrRegister(action, body, callback) {
  axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action=' + action, {
    params: body
  })
    .then(res => callback && callback(res))
    .catch(err => console.log('请求发生错误' + err))
}