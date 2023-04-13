using System.ComponentModel;
using System.Linq.Expressions;

namespace Core.QueryCriteria
{
    public class QuerySortSpecification<T>
    {
        public ListSortDirection Direction { get; private set; }

        public Expression<Func<T, object>> Predicate { get; private set; }

        /// <summary>
        /// Sort specification helper
        /// </summary>
        /// <param name="predicate">Sort predicate</param>
        /// <param name="direction">Sort direction</param>
        public QuerySortSpecification(Expression<Func<T, object>> predicate, ListSortDirection direction)
        {
            Predicate = predicate;
            Direction = direction;
        }

        public QuerySortSpecification(Expression<Func<T, object>> predicate, string direction)
        {
            Predicate = predicate;
            Direction = direction == "asc" ? ListSortDirection.Ascending : ListSortDirection.Descending;
        }

        public QuerySortSpecification(Expression<Func<T, object>> predicate, bool ascending = true)
        {
            Predicate = predicate;
            Direction = ascending ? ListSortDirection.Ascending : ListSortDirection.Descending;
        }

        public override string ToString()
        {
            return Predicate.ToString() + Direction.ToString();
        }
    }
}
