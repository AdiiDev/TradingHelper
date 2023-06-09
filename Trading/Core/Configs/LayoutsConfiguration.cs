﻿namespace Core.Configs
{
    public class LayoutsConfiguration
    {
        public IList<Layout> Layouts { get; set; } = new List<Layout>();
    }

    public class Layout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public int Height { get; set; }
        public IList<GridLayout> Grid { get; set; } = new List<GridLayout>();
    }

    public class GridLayout
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public string Symbol { get; set; }
        public string Interval { get; set; }
    }
}
