namespace Core.BaseModels
{
    public class BaseFilterRequest
    {
        public string? Sort { get; init; }
        public int? Page { get; init; }
        public int? PageSize { get; init; }
    }
}
