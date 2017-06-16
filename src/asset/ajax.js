import axios from 'axios'

// 注册登录接口
export function loginOrRegister(action, body, callback) {
  axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action=' + action, {
    params: body
  })
    .then(res => callback && callback(res))
    .catch(err => console.log('请求发生错误' + err))
}


// news-block接口
export function getNews(body, callback) {
  axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&', {
    params: body
  })
    .then(res => callback && callback(res))
    .catch(err => console.log('请求发生错误' + err))
}


// 获取写好的html接口
export function getNewsHtml(body, callback) {
  axios.get('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&', {
    params: { uniquekey: body }
  })
    .then(res => callback && callback(res))
    .catch(err => console.log('请求发生错误' + err))

}