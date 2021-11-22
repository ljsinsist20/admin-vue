import request from '@/utils/request'

export default {
  list(pageNum, pageSize) {
    return request({
      url: `/core/log/list/${pageNum}/${pageSize}`,
      method: 'GET',
    })
  },
}