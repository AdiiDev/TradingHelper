namespace Core.BaseModels
{
    public interface IBaseModel<T>
    {
        public int Id { get; set; }

        object CopyFrom(T newObject);
        string WhatChanged(T newObject);
        string ToLogString();
    }
}
