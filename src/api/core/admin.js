import request from '@/utils/request'

export default {
    list(pageNum, pageSize) {
        return request({
            url: `/core/admin/list/${pageNum}/${pageSize}`,
            method: 'GET',
        })
    },

    add(addForm) {
        return request({
            url: '/core/admin/add',
            method: 'POST',
            data: addForm
        })
    },

    deleteById(id, role) {
        return request({
            url: `/core/admin/delete/${id}/${role}`,
            method: 'DELETE'
        })
    },

    updateState(id, userName) {
        return request({
            url: `/core/admin/update/${id}/${userName}`,
            method: 'PUT'
        })
    }
}