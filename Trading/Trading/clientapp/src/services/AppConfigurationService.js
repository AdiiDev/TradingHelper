import Response from '../helpers/Response'

export default class AppConfigurationService {
  static GetBaseConfig = async () => {
    return Response.Call('api/configuration', 'GET')
  }

  static UpdateConfig = async (data) => {
    return Response.Call('api/configuration', 'POST', data)
  }
}
