using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Core.Utils
{
    public static class Utils
    {
        public static int GetUserId(ClaimsPrincipal user)
        {
            return int.Parse(user.Claims.First(i => i.Type == "UserId").Value);
        }

        public static int GetUserRoleId(ClaimsPrincipal user)
        {
            return int.Parse(user.Claims.First(i => i.Type == "RoleId").Value);
        }

        public static string GetUserName(ClaimsPrincipal user)
        {
            return user.Claims.First(i => i.Type == "UserName").Value;
        }

        public static string GenerateSecurityStamp()
        {
            return Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "");
        }

        /// <summary>
        /// Passed date must be in format yyyy-MM-dd
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime? StringToDateTime(string date)
        {
            if (string.IsNullOrEmpty(date))
                return null;

            var splited = date.Split('-');

            if (splited.Length != 3)
                return null;

            return new DateTime(int.Parse(splited[0]), int.Parse(splited[1]), int.Parse(splited[2]));
        }

        public static IEnumerable<IEnumerable<T>> Chunk<T>(this IEnumerable<T> source, int chunksize = 2000)
        {
            while (source.Any())
            {
                yield return source.Take(chunksize);
                source = source.Skip(chunksize);
            }
        }

        /// <summary>
        /// var query = people.DistinctBy(p => p.Id); var query = people.DistinctBy(p => new { p.Id, p.Name });
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="source"></param>
        /// <param name="keySelector"></param>
        /// <returns></returns>
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }

        public static T[] ToArray<T>(this T element)
        {
            return new T[] { element };
        }

        public static T As<T>(this object obj) => (T)obj;

        public static string ChangeLogString(string column, object beforeValue, object afterValue)
        {
            if (!CheckIfChanged(beforeValue, afterValue))
                return "";
            return $"{column}: {beforeValue.ToLogString()} => {afterValue.ToLogString()} ";
        }

        private static bool CheckIfChanged(object beforeValue, object afterValue)
        {
            switch (beforeValue != null ? beforeValue : afterValue)
            {
                case DateTime dateTime:
                    if (beforeValue != null && afterValue != null)
                        return ((DateTime)beforeValue).Ticks != ((DateTime)afterValue).Ticks;
                    return true;
                case TimeSpan timeSpan:
                    if (beforeValue != null && afterValue != null)
                        return ((TimeSpan)beforeValue).Ticks != ((TimeSpan)afterValue).Ticks;
                    return true;
                case int integer:
                    if (beforeValue != null && afterValue != null)
                        return ((int)beforeValue) != ((int)afterValue);
                    return true;
                case float floatVal:
                    if (beforeValue != null && afterValue != null)
                        return ((float)beforeValue) != ((float)afterValue);
                    return true;
                case double doubleVal:
                    if (beforeValue != null && afterValue != null)
                        return ((double)beforeValue) != ((double)afterValue);
                    return true;
                case string stringVal:
                    if (beforeValue != null && afterValue != null)
                        return ((string)beforeValue) != ((string)afterValue);
                    return true;
                case bool boolVal:
                    if (beforeValue != null && afterValue != null)
                        return ((bool)beforeValue) != ((bool)afterValue);
                    return true;
                default:
                    return beforeValue != afterValue;
            }
        }

        public static string LogString(string column, object value)
        {
            return $"{column}: {value.ToLogString()}, ";
        }

        public static TimeSpan? ConvertToTimeSpan(string time)
        {
            return TimeSpan.TryParse(time, out TimeSpan result) ? result : null;
        }

        public static decimal? ConvertToMinutes(TimeSpan? value)
        {
            if (!value.HasValue)
                return 0;

            return value.Value.Hours * 60 + value.Value.Minutes + value.Value.Seconds / 60;
        }

        public static TimeSpan? ConvertFromMinutes(decimal? value)
        {
            if (!value.HasValue || value.Value <= 0)
                return null;

            int hours = Convert.ToInt32(Math.Floor(value.Value / 60));
            int minutes = Convert.ToInt32(Math.Floor(value.Value - hours * 60));
            int seconds = Convert.ToInt32(Math.Floor((value.Value - hours * 60 - minutes) * 60));

            return new TimeSpan(hours, minutes, seconds);
        }
    }
}
