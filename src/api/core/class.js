import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/class/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    },
    queryClass() {
        return request({
            url: '/core/class/findAll',
            method: 'GET'
        })
    }
}