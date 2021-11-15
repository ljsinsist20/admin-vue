import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/department/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    },
    queryDepartment() {
        return request({
            url: `/core/department/findAll`,
            method: 'GET'
        })
    }
}