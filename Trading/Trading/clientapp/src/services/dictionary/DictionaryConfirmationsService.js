import Response from '../../helpers/Response'

export default class DictionaryConfirmationService {
  static AddConfirmation = async (data) => {
    return Response.Call('api/confirmation', 'POST', data)
  }

  static GetConfirmations = async (data) => {
    return Response.Call('api/confirmation', 'GET', data)
  }

  static DeleteConfirmation = async (id) => {
    return Response.Call(`api/confirmation/${id}`, 'DELETE', {})
  }
}
