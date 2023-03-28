using System.Linq.Expressions;

namespace Core.QueryCriteria
{
    public class QuerySpecification<T>
    {
        private Expression<Func<T, bool>> Predicate { get; }

        public QuerySpecification(Expression<Func<T, bool>> predicate)
        {
            Predicate = predicate;
        }

        public Expression<Func<T, bool>> GetPredicate()
        {
            return Predicate;
        }

        public override string ToString()
        {
            return Predicate.ToString();
        }

        public static QuerySpecification<T> operator &(QuerySpecification<T> spec1, QuerySpecification<T> spec2)
        {
            if (spec1 == null)
                throw new ArgumentException("Spec1 cannot be null");
            if (spec2 == null)
                throw new ArgumentException("Spec2 cannot be null");

            var left = spec1.GetPredicate();
            var right = spec2.GetPredicate();
            Expression<Func<T, bool>> result;

            if (ReferenceEquals(left.Parameters[0], right.Parameters[0]))
                result = Expression.Lambda<Func<T, bool>>(Expression.AndAlso(left.Body, right.Body), left.Parameters[0]);
            else
                result = Expression.Lambda<Func<T, bool>>(Expression.AndAlso(left.Body, Expression.Invoke(right, left.Parameters[0])), left.Parameters[0]);
            return new QuerySpecification<T>(result);
        }

        public static QuerySpecification<T> operator |(QuerySpecification<T> spec1, QuerySpecification<T> spec2)
        {
            if (spec1 == null)
                throw new ArgumentException("Spec1 cannot be null");
            if (spec2 == null)
                throw new ArgumentException("Spec2 cannot be null");

            var left = spec1.GetPredicate();
            var right = spec2.GetPredicate();
            Expression<Func<T, bool>> result;

            if (ReferenceEquals(left.Parameters[0], right.Parameters[0]))
                result = Expression.Lambda<Func<T, bool>>(Expression.OrElse(left.Body, right.Body), left.Parameters[0]);
            else
                result = Expression.Lambda<Func<T, bool>>(Expression.OrElse(left.Body, Expression.Invoke(right, left.Parameters[0])), left.Parameters[0]);

            return new QuerySpecification<T>(result);
        }

        public static QuerySpecification<T> operator !(QuerySpecification<T> spec1)
        {
            return new QuerySpecification<T>(Expression.Lambda<Func<T, bool>>(Expression.Not(spec1.GetPredicate().Body), spec1.GetPredicate().Parameters));
        }

        public QuerySpecification<T> And(QuerySpecification<T> spec1)
        {
            var thisObject = this;

            return thisObject &= spec1;
        }

        public QuerySpecification<T> Or(QuerySpecification<T> spec1)
        {
            var thisObject = this;

            return thisObject |= spec1;
        }
    }
}
