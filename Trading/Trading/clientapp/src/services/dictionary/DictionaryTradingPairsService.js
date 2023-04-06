import Response from '../../helpers/Response'

export default class DictionaryTradingPairsService {
  static AddTradingPair = async (data) => {
    return Response.Call('api/tradingPairs', 'POST', data)
  }

  static GetTradingPairs = async (data) => {
    return Response.Call('api/tradingPairs', 'GET', data)
  }

  static DeleteTradingPair = async (id) => {
    return Response.Call(`api/tradingPairs/${id}`, 'DELETE', {})
  }
}
