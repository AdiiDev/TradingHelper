namespace Core.Utils
{
    public static class LogStringExtension
    {
        public static string ToLogString(this int value) => value.ToString();
        public static string ToLogString(this int? value, string defaultValue = "null") => value != null ? value.Value.ToString() : defaultValue;
        public static string ToLogString(this float value) => value.ToString();
        public static string ToLogString(this float? value, string defaultValue = "null") => value != null ? value.Value.ToString() : defaultValue;
        public static string ToLogString(this double value) => value.ToString();
        public static string ToLogString(this double? value, string defaultValue = "null") => value != null ? value.Value.ToString() : defaultValue;
        public static string ToLogString(this decimal value) => value.ToString();
        public static string ToLogString(this decimal? value, string defaultValue = "null") => value != null ? value.Value.ToString() : defaultValue;
        public static string ToLogString(this bool value) => value.ToString();
        public static string ToLogString(this bool? value, string defaultValue = "null") => value != null ? value.Value.ToString() : defaultValue;
        public static string ToLogString(this string value, string defaultValue = "null") => value != null ? value : defaultValue;
        public static string ToLogString(this DateTime value, string defaultValue = "null", string format = "yyyy-MM-dd") => value != null ? value.ToString(format) : defaultValue;
        public static string ToLogString(this TimeSpan value, string defaultValue = "null") => value != null ? value.ToTimeString(defaultValue) : defaultValue;
        public static string ToLogString(this object value, string defaultValue = "null", string format = "yyyy-MM-dd")
        {
            if (value == null)
                return defaultValue;
            if (value is DateTime)
                return ((DateTime)value).ToLogString(format: format);
            return value.ToString();
        }
    }
}
