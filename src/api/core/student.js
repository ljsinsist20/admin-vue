import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/student/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    },
    deleteById(id) { 
        return request({
            url: `/core/student/delete/${id}`,
            method: 'DELETE'
        })
    }
}