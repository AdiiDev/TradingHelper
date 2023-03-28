import API from '../services/API'

export default class APIResponse {
  constructor(result, isError) {
    this.result = result
    this.isError = isError
  }

  static CallResponse(apiCallResult) {
    if (apiCallResult.status === 200) {
      return new APIResponse(apiCallResult.data, false)
    }
    return new APIResponse(apiCallResult.data, true)
  }

  static Call = async (endpoint, action, data) => {
    try {
      if (action.toUpperCase() === 'GET') {
        const res = await API().get(endpoint)
        return this.CallResponse(res)
      }
      if (action.toUpperCase() === 'POST') {
        const res = await API().post(endpoint, data)
        return this.CallResponse(res)
      }
    } catch (err) {
      console.error(err)
      return new APIResponse(null, true)
    }
  }
}
