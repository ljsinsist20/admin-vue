import request from '@/utils/request'

export default{
    list(pageNum, pageSize) {
        return request({
            url: `/core/admin/list/${pageNum}/${pageSize}`,
            method: 'GET',
        })
    }
}