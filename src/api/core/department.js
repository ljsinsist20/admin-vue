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
    },
    deleteById(id) {
        return request({
            url: `/core/department/delete/${id}`,
            method: 'DELETE'
        })
    },
    add(addForm) {
        return request({
            url: `/core/department/add/`,
            method: 'POST',
            data: addForm
        })
    },
    update(id, updateForm) {
        return request({
            url: `/core/department/update/${id}`,
            method: 'PUT',
            data: updateForm
        })
    },
    addExcel(formData) {
        return request({
            url: `/core/department/addExcel`,
            method: 'POST',
            data: formData
        })
    }
}