namespace Core.Utils
{
    public static class DateTimeString
    {
        /// <summary>
        /// Date needs to be in format yyyy-MM-dd
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime FromString(string date)
        {
            return DateTime.ParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
