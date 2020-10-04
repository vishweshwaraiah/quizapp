export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers['Access-Control-Allow-Headers'] = '*'
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.Authorization = 'Basic ' + btoa('manju-id:password') // bWFuanUtaWQ6cGFzc3dvcmQ=
    config.headers['Access-Control-Allow-Methods'] =
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  })
}
