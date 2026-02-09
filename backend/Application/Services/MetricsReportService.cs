using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WebApiMongoDbDemo.Domain.Interfaces;
using WebApiMongoDbDemo.DTOs;
using WebApiMongoDbDemo.Application.Reports;

namespace WebApiMongoDbDemo.Application
{
    public class MetricsReportService : IMetricsReportService
    {
        public MetricsReportService()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        public async Task<string> GenerateReportAsync(ReportData data)
        {
            Directory.CreateDirectory(data.OutputDir);

            var pdfPath = Path.Combine(
                data.OutputDir,
                $"{data.Scenario}_relatorio.pdf"
            );

            var document = new MetricsReportPdf(data);
            document.GeneratePdf(pdfPath);

            await Task.CompletedTask;
            return pdfPath;
        }
    }
}