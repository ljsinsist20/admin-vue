import request from '@/utils/request'

export default{
    list(pageNum, pageSize) {
        return request({
            url: `/core/dorm/list/${pageNum}/${pageSize}`,
            method: 'GET',
        })
    }
}