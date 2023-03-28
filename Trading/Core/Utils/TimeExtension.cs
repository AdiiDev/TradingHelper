namespace Core.Utils
{
    public static class TimeExtension
    {

        public static string ToTimeString(this int? hour, int? minute, string defaultValue = null)
        {
            return TimeToString(hour, minute, defaultValue);
        }

        public static string ToTimeString(this double? hours, string defaultValue = null)
        {
            if (hours == null)
                return TimeToString(null, null, defaultValue);

            var time = TimeSpan.FromHours(hours.Value);

            return TimeToString(time.Hours, time.Minutes);
        }

        public static string ToTimeString(this double hours, string defaultValue = null)
        {
            if (hours == 0)
                return TimeToString(null, null, defaultValue);

            var time = TimeSpan.FromHours(hours);

            return TimeToString(time.Hours, time.Minutes);
        }

        public static string ToTimeString(this float? hours, string defaultValue = null)
        {
            if (hours == null)
                return TimeToString(null, null, defaultValue);

            var time = TimeSpan.FromHours(hours.Value);

            return TimeToString(time.Hours, time.Minutes);
        }

        public static string ToTimeString(this TimeSpan? time, string defaultValue = null)
        {
            if (time == null)
                return TimeToString(null, null, defaultValue);

            return TimeToString((int)time.Value.TotalHours, time.Value.Minutes, defaultValue);
        }

        public static string ToTimeString(this TimeSpan time, string defaultValue = null)
        {
            if (time == null)
                return TimeToString(null, null, defaultValue);

            return TimeToString((int)time.TotalHours, time.Minutes, defaultValue);
        }

        private static string TimeToString(int? hour, int? minute, string defaultValue = null)
        {
            if (hour == null || minute == null)
                return defaultValue != null ? defaultValue : "";

            string res = "";

            if (hour.Value < 10)
                res += "0";
            res += hour.Value.ToString() + ":";

            if (minute.Value < 10)
                res += "0";
            return res + minute.Value;
        }
    }
}
