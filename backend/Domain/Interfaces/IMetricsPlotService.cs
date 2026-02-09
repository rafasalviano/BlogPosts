using WebApiMongoDbDemo.Application;

namespace WebApiMongoDbDemo.Domain.Interfaces
{
    public interface IMetricsPlotService
    {
        Task<MetricsAnalysisResult> PlotAndSaveAsync(
            string csvPath,
            string? outputDir = null,
            string? baseFileName = null);
    }
}