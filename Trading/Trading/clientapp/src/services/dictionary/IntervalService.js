import Response from '../../helpers/Response'

export default class IntervalService {
  static AddOrUpdate = async (data) => {
    return Response.Call('api/intervals', 'POST', data)
  }

  static Get = async () => {
    return Response.Call('api/intervals', 'GET')
  }

  static Delete = async (id) => {
    return Response.Call(`api/intervals/${id}`, 'DELETE', {})
  }
}