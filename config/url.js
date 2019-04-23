import env from './env'
//修改DEV_URL为当前前端网址地址
const DEV_URL = 'http://127.0.0.1:8080/'
const PRO_URL = 'https://produce.com'

export default env === 'development' ? DEV_URL : PRO_URL
