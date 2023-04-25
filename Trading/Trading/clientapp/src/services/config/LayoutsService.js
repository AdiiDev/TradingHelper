import Response from '../../helpers/Response'

export default class LayoutsService {
  static Get = async () => {
    return Response.Call('api/layouts', 'GET')
  }

  static AddOrUpdate = async (data) => {
    return Response.Call('api/layouts', 'POST', data)
  }
}
