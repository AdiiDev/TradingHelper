import Response from '../helpers/Response'

export default class DictionaryService {
  static AddAccount = async (data) => {
    return Response.Call('api', 'POST', data)
  }

  static AddConfirmation = async (data) => {
    return Response.Call('api', 'POST', data)
  }

  static AddTradingPair = async (data) => {
    return Response.Call('api', 'POST', data)
  }
}
