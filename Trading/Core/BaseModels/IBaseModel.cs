namespace Core.BaseModels
{
    public interface IBaseModel<T>
    {
        public int Id { get; set; }

        T CopyFrom(T newObject);

        string WhatChanged(T newObject)
        {
            return "";
        }

        string ToLogString()
        {
            return "";
        }
    }
}
