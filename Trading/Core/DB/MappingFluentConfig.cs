namespace Core.DB
{
    public class MappingFluentConfig
    {
        public string MappingApp { get; private set; }
        public IList<Type> MappingTypes { get; private set; } = new List<Type>();

        public MappingFluentConfig(string mappingApp)
        {
            MappingApp = mappingApp;
        }

        public MappingFluentConfig AddMap<T>()
        {
            MappingTypes.Add(typeof(T));

            return this;
        }
    }
}
