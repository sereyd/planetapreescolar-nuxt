import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}