import request from '@/utils/request'

export default {
    list(pageNum, pageSize, searchObj) {
        return request({
            url: `/core/teacher/list/${pageNum}/${pageSize}`,
            method: 'GET',
            params: searchObj
        })
    },
    queryTeacher() {
        return request({
            url: '/core/teacher/findAll',
            method: 'GET'
        })
    },
    deleteById(id) {
        return request({
            url: `/core/teacher/delete/${id}`,
            method: 'DELETE'
        })
    },
    add(addForm) {
        return request({
            url: `/core/teacher/add`,
            method: 'POST',
            data: addForm
        })
    },
    update(id, updateForm) {
        return request({
            url: `/core/teacher/update/${id}`,
            method: 'PUT',
            data: updateForm
        })
    }
}