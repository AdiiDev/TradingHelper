import Response from '../helpers/Response'

export default class WindowsNotificationService {
  static Notify = async (title, message) => {
    return Response.Call(
      'api/WindowsNotification',
      'POST',
      JSON.stringify({ Title: title, Message: message })
    )
  }
}
