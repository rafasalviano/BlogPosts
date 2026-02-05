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



                // var sampleIntervalMs = 10;

                // var gawkCmd =
                //     $"echo 'Time CPU_mW GPU_mW Total_mW' > \"{csvFile}\" && " +
                //     $"gawk 'BEGIN{{i=0; cpu=\"\"; gpu=\"\"; total=\"\";}} " +
                //     $"/CPU Power:/ {{match($0, /([0-9.]+) mW/, a); cpu=a[1];}} " +
                //     $"/GPU Power:/ {{match($0, /([0-9.]+) mW/, b); gpu=b[1];}} " +
                //     $"/Combined Power/ {{match($0, /([0-9.]+) mW/, c); total=c[1]; " +
                //     $"print (i*{sampleIntervalMs}), cpu, gpu, total; i++;}}' \"{fileName}\" >> \"{csvFile}\"";

                // var psi2 = new ProcessStartInfo
                // {
                //     FileName = "/bin/bash",
                //     Arguments = "-c \"" + gawkCmd.Replace("\"", "\\\"") + "\"",
                //     RedirectStandardOutput = false,
                //     UseShellExecute = true
                // };

                // using (var proc2 = Process.Start(psi2))
                // {
                //     proc2!.WaitForExit();
                // }
                // // 👉 Acrescenta os horários HTTP no final do CSV
                // await System.IO.File.AppendAllTextAsync(csvFile,
                //     $"\nHTTP_START {inicioHttpMs}\nHTTP_END {fimHttpMs}\n");



                // if (!System.IO.File.Exists(csvFile))
                //     return StatusCode(500, $"Erro: o arquivo {csvFile} não foi criado.");

                // var fullPath = Path.GetFullPath(csvFile);