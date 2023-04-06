import Response from '../../helpers/Response'

export default class DictionaryAccountService {
  static AddAccount = async (data) => {
    return Response.Call('api/brokerAccount', 'POST', data)
  }

  static GetAccounts = async (data) => {
    return Response.Call('api/brokerAccount', 'GET', data)
  }

  static DeleteAccount = async (id) => {
    return Response.Call(`api/brokerAccount/${id}`, 'DELETE', {})
  }
}
