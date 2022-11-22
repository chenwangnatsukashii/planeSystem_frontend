import ax from '../http.js'

export const addPlane = params => ax.post('/plane/addPlane', params)
export const getAllPlanes = params => ax.get('/plane/getAllPlanes', params)
export const updatePlane = params => ax.put('/plane/updatePlane', params)

// 保存歼11,11b
export const addResume = params => ax.post_list('/plane/addResume', params)
// 删除歼11,11b
export const deleteResume = url => ax.del(url)
// 保存歼11发动机，左右机匣也随之更新
export const addResumeEngine = params => ax.post_list('/plane/addResumeEngine', params)
// 保存歼11b发动机，左右机匣也随之更新
export const addResumeEngineB = params => ax.post_list('/plane/addResumeEngineB', params)

// 保存歼9
export const addResumeNine = params => ax.post_list('/plane/addResumeNine', params)
// 删除歼9
export const deleteResumeNine = id => ax.del('/plane/deleteResumeNine/' + id)

// 保存教8
export const addResumeEight = params => ax.post_list('/plane/addResumeEight', params)
// 删除教8
export const deleteResumeEight = id => ax.del('/plane/deleteResumeEight/' + id)

// 首页删除飞机
export const deleteAnyPlane = id => ax.del('/plane/deleteAnyPlane/' + id)
