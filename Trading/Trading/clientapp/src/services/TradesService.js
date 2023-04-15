import Response from '../helpers/Response'

export default class TradesService {
  static AddTrades = async (data) => {
    return Response.Call('api/trade', 'POST', data)
  }

  static GetTrades = async (data) => {
    return Response.Call('api/trade/filtered', 'POST', data)
  }

  static DeleteTrades = async (id) => {
    return Response.Call(`api/trade/${id}`, 'DELETE', {})
  }
}
