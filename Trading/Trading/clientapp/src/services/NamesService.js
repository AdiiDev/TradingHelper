import Response from '../helpers/Response'

export default class NamesService {
  static AddOrUpdateNames = async (data) => {
    return Response.Call('api/names', 'POST', data)
  }

  static GetNames = async (data) => {
    return Response.Call('api/names/filtered', 'POST', data)
  }

  static DeleteName = async (nameId) => {
    return Response.Call('api/names/delete/' + nameId, 'POST', null)
  }
}
