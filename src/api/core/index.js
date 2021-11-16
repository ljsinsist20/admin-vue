import request from '@/utils/request'

export default {
  findSex() {
    return request({
      url: `/core/index/sex`,
      method: 'GET',
    })
  }
}