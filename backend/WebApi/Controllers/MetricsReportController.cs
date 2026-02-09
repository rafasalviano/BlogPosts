/*
using Microsoft.AspNetCore.Mvc;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/metrics-plot")]
    public class MetricsReportController : ControllerBase
    {
        private readonly IMetricsReportService _reportService;

        public MetricsReportController(IMetricsReportService reportService)
        {
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
                var (pngPath, reportPath) = await _plotService.PlotAndSaveAsync(
                    csvPath: req.CsvFile,
                    outputDir: Path.Combine(Directory.GetCurrentDirectory(), "MetricsResults"),
                    baseFileName: Path.GetFileNameWithoutExtension(req.CsvFile));

                return Ok(new { pngPath, reportPath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao gerar plot/relatório: {ex.Message}");
            }
        }
    }
}
*/