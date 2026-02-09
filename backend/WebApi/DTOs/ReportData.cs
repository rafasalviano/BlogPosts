namespace WebApiMongoDbDemo.DTOs
{
    public class ReportData
    {
        public string Scenario { get; set; } = default!;
        public string CsvPath { get; set; } = default!;
        public string PlotImagePath { get; set; } = default!;
        public string OutputDir { get; set; } = default!;

        public int SampleCount { get; set; }

        public double DeltaTSeconds { get; set; }

        public double EnergyTotalJ { get; set; }
        public double AvgPowerTotalW { get; set; }

        public double? HttpStartMs { get; set; }
        public double? HttpEndMs { get; set; }

        public double? EnergyHttpJ { get; set; }
        public double? AvgPowerHttpW { get; set; }
    }
}
