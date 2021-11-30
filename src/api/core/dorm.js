import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/dorm/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    },
    queryDorm() {
        return request({
            url: '/core/dorm/findAll',
            method: 'GET',
        })
    },

    deleteById(id) {
        return request({
            url: `/core/dorm/delete/${id}`,
            method: 'DELETE'
        })
    },

    add(addForm) {
        return request({
            url: `/core/dorm/add/`,
            method: 'POST',
            data: addForm
        })
    },
    update(id, updateForm) {
        return request({
            url: `/core/dorm/update/${id}`,
            method: 'PUT',
            data: updateForm
        })
    },
    addExcel(formData) {
        return request({
            url: `/core/dorm/addExcel`,
            method: 'POST',
            data: formData
        })
    }
}