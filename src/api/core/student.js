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
    },
    add(addForm) {
        return request({
            url: '/core/student/add',
            method: 'POST',
            data: addForm
        })
    },
    update(id, updateForm) {
        return request({
            url: `/core/student/update/${id}`,
            method: 'PUT',
            data: updateForm
        })
    },
    down(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/student/down/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj,
            responseType: 'blob'
        })
    },

    addExcel(formData) {
        return request({
            url: `/core/student/addExcel`,
            method: 'POST',
            data: formData
        })
    }
}