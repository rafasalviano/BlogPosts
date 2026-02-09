using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetricsController : ControllerBase
    {
        private readonly IPowermetricsMeasurement _measurementService;

        public MetricsController(IPowermetricsMeasurement measurementService)
        {
            _measurementService = measurementService;
        }

        // DTO de entrada
        public record TestConfig(string Scenario);

        [HttpPost("measure")]
        public async Task<IActionResult> RunMeasurement([FromBody] TestConfig config)
        {
            if (config == null || string.IsNullOrWhiteSpace(config.Scenario))
                return BadRequest("Nome do cenário obrigatório.");

            try
            {
                (string inicioHttpMs, string fimHttpMs, string csvFile) = await _measurementService.RunPowermetrics(config.Scenario);
                
                return Ok(new
                {
                    csvFile,
                    inicio = "0 ms",
                    inicioHttp = inicioHttpMs,
                    fimHttp = fimHttpMs,
                    fim = "80000 ms"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro na medição: {ex.Message}");
            }
        }
    }
}