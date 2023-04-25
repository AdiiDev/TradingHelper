namespace Core.Configs
{
    public class LayoutsConfiguration
    {
        public IList<Layout> Layouts { get; set; } = new List<Layout>();
    }

    public class Layout
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public string Symbol { get; set; }
        public string Interval { get; set; }
    }
}
