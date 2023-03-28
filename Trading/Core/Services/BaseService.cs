using Core.BaseModels;
using Core.QueryCriteria;
using Core.Repositories;

namespace Core.Services
{
    /// <summary>
    /// Base service. Model of type T must inherit from IBaseModel. IMPORTANT: In Mapping of type T we must use Polymorphism.Explicit();
    /// </summary>
    /// <typeparam name="R">Repository interface</typeparam>
    /// <typeparam name="T">Model</typeparam>
    public abstract class BaseService<R, T> : IBaseService<T> where T : class where R : IRepository<T>
    {
        protected readonly R _repository;

        public BaseService(R repository)
        {
            _repository = repository;
        }

        public virtual Task<T> GetByIdAsync(int id)
        {
            return _repository.FindAsync(id);
        }

        public virtual T GetById(int id)
        {
            return _repository.Find(id);
        }

        public virtual async Task<string> AddOrUpdateAsync(T obj, bool log = true)
        {
            if (!(obj is IBaseModel<T>))
                throw new ArgumentException("Passed object does not implement IBaseModel");

            if (((IBaseModel<T>)obj).Id > 0)
            {
                var objInDB = await GetByIdAsync(((IBaseModel<T>)obj).Id);
                var whatChanged = GetWhatChanged(objInDB, obj, log);

                objInDB = (T)(((IBaseModel<T>)objInDB).CopyFrom(obj));

                await _repository.SaveAsync(objInDB);
                await _repository.FlushAsync();

                return whatChanged;
            }
            await _repository.SaveAsync(obj);

            return GetLogString(obj, log);
        }

        public virtual string AddOrUpdate(T obj, bool log = true)
        {
            if (!(obj is IBaseModel<T>))
                throw new ArgumentException("Passed object does not implement IBaseModel");

            if (((IBaseModel<T>)obj).Id > 0)
            {
                var objInDB = GetById(((IBaseModel<T>)obj).Id);

                var whatChanged = GetWhatChanged(objInDB, obj, log);

                objInDB = (T)(((IBaseModel<T>)objInDB).CopyFrom(obj));

                _repository.Save(objInDB);
                _repository.Flush();

                return whatChanged;
            }
            _repository.Save(obj);

            return GetLogString(obj, log);
        }

        private string GetWhatChanged(T objInDb, T newObj, bool log)
        {
            if (log)
                return ((IBaseModel<T>)objInDb).WhatChanged(newObj);
            return "";
        }

        private string GetLogString(T obj, bool log)
        {
            if (log)
                return ((IBaseModel<T>)obj).ToLogString();
            return "";
        }

        public virtual async Task<bool> DeleteAsync(int id)
        {
            var record = await _repository.FindAsync(id);

            if (record != null)
            {
                await _repository.RemoveAsync(record);
                await _repository.FlushAsync();

                return true;
            }

            return false;
        }

        public virtual async Task DeleteAsync(T obj)
        {
            await _repository.RemoveAsync(obj);
            await _repository.FlushAsync();
        }

        public virtual void Delete(T obj)
        {
            _repository.Remove(obj);
            _repository.Flush();
        }

        public virtual bool Delete(int id)
        {
            var record = _repository.Find(id);

            if (record != null)
            {
                _repository.Remove(record);
                _repository.Flush();

                return true;
            }

            return false;
        }

        public virtual long Count()
        {
            return _repository.Count();
        }

        public virtual Task<long> CountAsync()
        {
            return _repository.CountAsync();
        }

        public virtual long Count(QuerySpecification<T> specification)
        {
            return _repository.Count(specification);
        }

        public virtual Task<long> CountAsync(QuerySpecification<T> specification)
        {
            return _repository.CountAsync(specification);
        }

        public virtual IQueryable<T> Get(QuerySpecification<T> specification, int page = -1, int pageSize = -1, QuerySortSpecification<T> sortSpecification = null)
        {
            if (page >= 0 && pageSize >= 0 && sortSpecification != null)
                return _repository.Find(specification, page, pageSize, sortSpecification);
            else if (page >= 0 && pageSize >= 0)
                return _repository.Find(specification, page, pageSize);
            else if (sortSpecification != null)
                return _repository.Find(specification, sortSpecification);
            return _repository.Find(specification);
        }
    }
}
