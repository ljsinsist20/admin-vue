import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/dorm/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    }
}