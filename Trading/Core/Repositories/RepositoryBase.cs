using Core.QueryCriteria;
using Core.UnitOfWork;
using NHibernate;
using NHibernate.Linq;
using System.ComponentModel;

namespace Core.Repositories
{
    /// <summary>
    /// Main abstraction for repository
    /// </summary>
    /// <typeparam name="T">Entity model</typeparam>
    /// <typeparam name="U">Valid object that inherits from IUnitOfWork <seealso cref="IUnitOfWork"/></typeparam>
    public class RepositoryBase<T, U> : IRepository<T> where T : class where U : IUnitOfWork
    {
        #region Properties
        /// <summary>
        /// Valid interface that inherits from IUnitOfWork
        /// <seealso cref="IUnitOfWork"/>
        /// </summary>
        private readonly U _uow;

        /// <summary>
        /// Session from UnitOfWork object
        /// </summary>
        protected ISession Session
        {
            get
            {
                return _uow.GetSession()!;
            }
        }
        #endregion Properties

        /// <summary>
        /// Repository constructor
        /// </summary>
        /// <param name="unitOfWork">Inject valid unitOfWork class that implement passed interface</param>
        public RepositoryBase(U unitOfWork)
        {
            _uow = unitOfWork;
        }

        #region Methods
        /// <summary>
        /// Get all rows
        /// </summary>
        /// <returns></returns>
        public virtual IQueryable<T> All()
        {
            return Session.Query<T>();
        }

        /// <summary>
        /// This method count rows in table
        /// </summary>
        /// <returns>Number of rows in table</returns>
        public virtual long Count()
        {
            return All().Count();
        }

        /// <summary>
        /// This method count rows that fulfill passed predicate
        /// </summary>
        /// <param name="predicate">Predicate</param>
        /// <returns>Nimber of rows in table that fulfill predicate</returns>
        public virtual long Count(QuerySpecification<T> predicate)
        {
            IQueryable<T> query = All();
            return ApplyCountFiltering(query, predicate);
        }

        /// <summary>
        /// This method count rows in table
        /// </summary>
        /// <returns>Number of rows in table</returns>
        public virtual Task<long> CountAsync()
        {
            return All().LongCountAsync();
        }

        /// <summary>
        /// This method count rows that fulfill passed predicate
        /// </summary>
        /// <param name="predicate">Predicate</param>
        /// <returns>Nimber of rows in table that fulfill predicate</returns>
        public virtual Task<long> CountAsync(QuerySpecification<T> predicate)
        {
            IQueryable<T> query = All();
            var task = new Task<long>(() =>
            {
                return ApplyCountFiltering(query, predicate); ;
            });
            task.Start();

            return task;
        }

        /// <summary>
        /// This method execute function in db
        /// </summary>
        /// <param name="command">SQL command</param>
        /// <returns>Query result</returns>
        public virtual async Task<object> ExecuteCommandAsync(string command)
        {
            var query = Session.CreateSQLQuery(command);

            await query.ExecuteUpdateAsync();

            return query.SetMaxResults(1).UniqueResultAsync();
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual T Find(int entityId)
        {
            return Session.Get<T>(entityId);
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual T Find(string entityId)
        {
            return Session.Get<T>(entityId);
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual T Find(long entityId)
        {
            return Session.Get<T>(entityId);
        }

        /// <summary>
        /// Return entities that satisfy predicate
        /// </summary>
        /// <param name="predicate">Predicate to satisfy</param>
        /// <returns>List of entities</returns>
        public virtual IQueryable<T> Find(QuerySpecification<T> predicate)
        {
            IQueryable<T> query = All();
            query = ApplyFiltering(query, predicate);

            return query;
        }

        /// <summary>
        /// Return entities that satisfy predicate with pagging
        /// </summary>
        /// <param name="predicate">Predicate to satisfy</param>
        /// <param name="pageNumber">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>List of entities</returns>
        public virtual IQueryable<T> Find(QuerySpecification<T> predicate, int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 && pageSize <= 0)
                return Find(predicate);

            IQueryable<T> query = All();

            query = ApplyFiltering(query, predicate);
            query = ApplyPaging(query, pageNumber, pageSize);
            return query;
        }

        /// <summary>
        /// Return entities that satisfy predicate with sorting
        /// </summary>
        /// <param name="predicate">Predicate to satisfy</param>
        /// <param name="sorting">Sorting</param>
        /// <returns>List of entities</returns>
        public virtual IQueryable<T> Find(QuerySpecification<T> predicate, params QuerySortSpecification<T>[] sortSpecifications)
        {
            IQueryable<T> query = All();

            query = ApplyFiltering(query, predicate);
            if (sortSpecifications != null)
                query = ApplySorting(query, sortSpecifications);

            return query;
        }

        protected virtual IQueryable<T> ApplySorting(IQueryable<T> query, params QuerySortSpecification<T>[] sortSpecifications)
        {
            IOrderedQueryable<T>? queryOrdered = null;

            if (sortSpecifications != null)
            {
                if (sortSpecifications.Length == 0)
                    return query;

                for (int i = 0; i < sortSpecifications.Length; i++)
                {
                    if (sortSpecifications[i].Predicate != null && sortSpecifications[i] != null)
                    {
                        if (i == 0)
                        {
                            switch (sortSpecifications[i].Direction)
                            {
                                case ListSortDirection.Ascending:
                                    queryOrdered = query.OrderBy(sortSpecifications[i].Predicate);
                                    break;
                                case ListSortDirection.Descending:
                                    queryOrdered = query.OrderByDescending(sortSpecifications[i].Predicate);
                                    break;
                            }
                        }
                        else
                        {
                            switch (sortSpecifications[i].Direction)
                            {
                                case ListSortDirection.Ascending:
                                    queryOrdered = queryOrdered!.ThenBy(sortSpecifications[i].Predicate);
                                    break;
                                case ListSortDirection.Descending:
                                    queryOrdered = queryOrdered!.ThenByDescending(sortSpecifications[i].Predicate);
                                    break;
                            }
                        }
                    }
                }

                return queryOrdered!;
            }
            else
                return query;
        }

        /// <summary>
        /// Return entities that satisfy predicate with sorting and pagging
        /// </summary>
        /// <param name="predicate">Predicate to satisfy</param>
        /// <param name="pageNumber">Page numbery</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="sorting">Sorting</param>
        /// <returns>List of entities</returns>
        public virtual IQueryable<T> Find(QuerySpecification<T> predicate, int pageNumber, int pageSize, params QuerySortSpecification<T>[] sortSpecifications)
        {
            IQueryable<T> query = All();

            query = ApplyFiltering(query, predicate);
            query = ApplySorting(query, sortSpecifications);
            query = ApplyPaging(query, pageNumber, pageSize);

            return query;
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual Task<T> FindAsync(int entityId)
        {
            return Session.GetAsync<T>(entityId);
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual Task<T> FindAsync(string entityId)
        {
            return Session.GetAsync<T>(entityId);
        }

        /// <summary>
        /// This method search record with passed id in table
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Entity with passed id. Can be null.</returns>
        public virtual Task<T> FindAsync(long entityId)
        {
            return Session.GetAsync<T>(entityId);
        }

        private IQueryable<T> ApplyPaging(IQueryable<T> query, int startRow, int size)
        {
            return query.Skip((startRow) * size).Take(size);
        }

        private IQueryable<T> ApplyFiltering(IQueryable<T> query, QuerySpecification<T> filterSpecification)
        {
            return filterSpecification != null && filterSpecification.GetPredicate() != null
                ? query.Where(filterSpecification.GetPredicate())
                : query;
        }

        private int ApplyCountFiltering(IQueryable<T> query, QuerySpecification<T> filterSpecification)
        {
            return filterSpecification != null && filterSpecification.GetPredicate() != null
                ? query.Count(filterSpecification.GetPredicate())
                : query.Count();
        }

        /// <summary>
        /// Flush method.
        /// </summary>
        public virtual void Flush()
        {
            Session.Flush();
        }

        /// <summary>
        /// Flush method.
        /// </summary>
        public virtual Task FlushAsync()
        {
            return Session.FlushAsync();
        }

        /// <summary>
        /// This method remove entity from table
        /// </summary>
        /// <param name="entity">Entity to delete</param>
        public virtual void Remove(T entity)
        {
            Session.Delete(entity);
        }

        /// <summary>
        /// This method remove entities from table
        /// </summary>
        /// <param name="entities">Entities to delete</param>
        public virtual void Remove(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
                Remove(entity);
        }

        /// <summary>
        /// This method remove entity from table
        /// </summary>
        /// <param name="entity">Entity to delete</param>
        public virtual Task RemoveAsync(T entity)
        {
            return Session.DeleteAsync(entity);
        }

        /// <summary>
        /// This method remove entities from table
        /// </summary>
        /// <param name="entities">Entities to delete</param>
        public virtual Task RemoveAsync(IEnumerable<T> entities)
        {
            var task = new Task(() =>
            {
                foreach (var entity in entities)
                {
                    Remove(entity);
                }
            });
            task.Start();

            return task;
        }

        /// <summary>
        /// This method add or update entity in table
        /// </summary>
        /// <param name="entity">Entities to add or update</param>
        public virtual void Save(T entity)
        {
            Session.SaveOrUpdate(entity);
        }

        /// <summary>
        /// This method add or update entity in table
        /// </summary>
        /// <param name="entities">Entities to add or update</param>
        public virtual void Save(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
                Session.SaveOrUpdate(entity);
        }

        /// <summary>
        /// This method add or update entity in table
        /// </summary>
        /// <param name="entity">Entities to add or update</param>
        public virtual Task SaveAsync(T entity)
        {
            return Session.SaveOrUpdateAsync(entity);
        }

        /// <summary>
        /// This method add or update entity in table
        /// </summary>
        /// <param name="entities">Entities to add or update</param>
        public virtual Task SaveAsync(IEnumerable<T> entities)
        {
            var task = new Task(() =>
            {
                foreach (var entity in entities)
                {
                    Save(entity);
                }
            });
            task.Start();

            return task;
        }

        public virtual void Remove(QuerySpecification<T> predicate)
        {
            Session.Query<T>().Where(predicate.GetPredicate()).Delete();
        }

        public virtual Task RemoveAsync(QuerySpecification<T> predicate)
        {
            return Session.Query<T>().Where(predicate.GetPredicate()).DeleteAsync();
        }

        void IWriteRepository<T>.SaveBulk(IList<T> entities)
        {
            using (IStatelessSession session = _uow.GetSessionFactory().OpenStatelessSession())
                using (ITransaction transaction = session.BeginTransaction())
                {
                    for (int i = 0; i < entities.Count; i++)
                        session.Insert(entities[i]);
                    transaction.Commit();
                }
        }

        void IWriteRepository<T>.SaveBulk(T[] entities)
        {
            using (IStatelessSession session = _uow.GetSessionFactory().OpenStatelessSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                for (int i = 0; i < entities.Length; i++)
                    session.Insert(entities[i]);
                transaction.Commit();
            }
        }

        #endregion Methods
    }
}
