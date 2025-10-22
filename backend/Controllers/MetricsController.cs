using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetricsController : ControllerBase
    {
        public record TestConfig(string Scenario);

        [HttpPost("measure")]
        public async Task<IActionResult> RunMeasurement([FromBody] TestConfig config)
        {
            if (config == null || string.IsNullOrWhiteSpace(config.Scenario))
                return BadRequest("Nome do cenário obrigatório.");

            var fileName = $"{config.Scenario}.txt";
            var csvFile = Path.ChangeExtension(fileName, ".csv");

            try
            {
                // Rodar powermetrics e salvar saída
                var powermetricsCmd = $"sudo powermetrics --samplers cpu_power,gpu_power -i 1000 -n 5 > {fileName}";
                var psi = new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = $"-c \"{powermetricsCmd}\"",
                    RedirectStandardOutput = false,
                    UseShellExecute = true
                };

                using (var proc = Process.Start(psi))
                {
                    proc!.WaitForExit();
                }

                // Rodar gawk para extrair dados CPU/GPU 
                var gawkCmd =
                    $"echo 'CPU_mW GPU_mW Total_mW' > {csvFile} && " +
                    $"gawk '/CPU Power:/ {{match($0, /([0-9.]+) mW/, a); cpu=a[1];}} " +
                    $"/GPU Power:/ {{match($0, /([0-9.]+) mW/, b); gpu=b[1];}} " +
                    $"/Combined Power/ {{match($0, /([0-9.]+) mW/, c); total=c[1]; print cpu, gpu, total;}}' {fileName} >> {csvFile}";

                var psi2 = new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = $"-c \"{gawkCmd}\"",
                    RedirectStandardOutput = false,
                    UseShellExecute = true
                };

                using (var proc2 = Process.Start(psi2))
                {
                    proc2!.WaitForExit();
                }

                // 3️⃣ Confirmar se gerou o CSV
                if (!System.IO.File.Exists(csvFile))
                    return StatusCode(500, $"Erro: o arquivo {csvFile} não foi criado.");

                var fullPath = Path.GetFullPath(csvFile);
                return Ok(new { csvFile = fullPath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro na medição: {ex.Message}");
            }
        }
    }
}