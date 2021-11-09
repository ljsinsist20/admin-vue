import request from '@/utils/request'

export default{
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/teacher/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    }
}