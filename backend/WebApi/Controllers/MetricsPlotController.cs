using Microsoft.AspNetCore.Mvc;
using WebApiMongoDbDemo.Domain.Interfaces;
using WebApiMongoDbDemo.DTOs;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/metrics-plot")]
    public class MetricsPlotController : ControllerBase
    {
        private readonly IMetricsPlotService _plotService;
        private readonly IMetricsReportService _reportService;

        public MetricsPlotController(IMetricsPlotService plotService, IMetricsReportService reportService)
        {
            _plotService = plotService;
            _reportService = reportService;
        }

        public record PlotRequest(string CsvFile);

        [HttpPost("generate")]
        public async Task<IActionResult> GeneratePlot([FromBody] PlotRequest req)
        {
            if (req is null || string.IsNullOrWhiteSpace(req.CsvFile))
                return BadRequest("CsvFile obrigatório.");

            try
            {
                var outputDir = Path.Combine(Directory.GetCurrentDirectory(), "MetricsResults");

                var analysis = await _plotService.PlotAndSaveAsync(
                    csvPath: req.CsvFile,
                    outputDir: outputDir,
                    baseFileName: Path.GetFileNameWithoutExtension(req.CsvFile));

                var reportPath = await _reportService.GenerateReportAsync(
                    new ReportData
                    {
                        Scenario = Path.GetFileNameWithoutExtension(req.CsvFile),
                        CsvPath = analysis.CsvPath,
                        PlotImagePath = analysis.PlotImagePath,
                        OutputDir = outputDir,

                        SampleCount = analysis.SampleCount,
                        DeltaTSeconds = analysis.DeltaTSeconds,
                        EnergyTotalJ = analysis.EnergyTotalJ,
                        AvgPowerTotalW = analysis.AvgPowerTotalW,

                        HttpStartMs = analysis.HttpStartMs,
                        HttpEndMs = analysis.HttpEndMs,
                        EnergyHttpJ = analysis.EnergyHttpJ,
                        AvgPowerHttpW = analysis.AvgPowerHttpW
                    });

                return Ok(new
                {
                    analysis.PlotImagePath,
                    analysis.MarkdownReportPath,
                    reportPath
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao gerar plot/relatório: {ex.Message}");
            }
        }
    }
}