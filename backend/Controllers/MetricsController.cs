using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using System.Net.Http;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetricsController : ControllerBase
    {
        // DTO de entrada
        public record TestConfig(string Scenario);

        [HttpPost("measure")]
        public async Task<IActionResult> RunMeasurement([FromBody] TestConfig config)
        {
            if (config == null || string.IsNullOrWhiteSpace(config.Scenario))
                return BadRequest("Nome do cenário obrigatório.");

            // cria pasta MetricsResults se não existir
            var resultsDir = Path.Combine(Directory.GetCurrentDirectory(), "MetricsResults");
            Directory.CreateDirectory(resultsDir);

            var fileName = Path.Combine(resultsDir, $"{config.Scenario}.txt");
            var csvFile = Path.ChangeExtension(fileName, ".csv");

            try
            {
                // 👉 marca o horário inicial da medição
                var inicio = DateTime.Now;

                // URL do backend para puxar os posts conforme cenário
                var baseUrl = "http://localhost:5027/api/post";
                string url = baseUrl;
                var client = new HttpClient();

                // escolhe o tipo de requisição
                if (config.Scenario == "paginacao")
                    url = $"{baseUrl}?page=1&pageSize=25";
                else if (config.Scenario == "sempaginacao")
                    url = baseUrl;
                else if (config.Scenario == "comprimido")
                    client.DefaultRequestHeaders.Add("Accept-Encoding", "br");
                else if (config.Scenario == "semcompressao")
                    client.DefaultRequestHeaders.Add("Accept-Encoding", "identity");

                // inicia powermetrics - intervalo 10ms, 20 amostras, observa-se que em 100ms GET /posts é realizado
                var powermetricsCmd = $"sudo powermetrics --samplers cpu_power,gpu_power -i 10 -n 20 > {fileName}";
                var psi = new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = $"-c \"{powermetricsCmd}\"",
                    RedirectStandardOutput = false,
                    UseShellExecute = true
                };

                // roda powermetrics em paralelo à chamada http
                var proc = Process.Start(psi)!;

                await Task.Delay(1500); // espera 1500 ms para powermetrics estabilizar

                // 👉 marca horário de início da requisição
                var inicioHttp = DateTime.Now;
                await client.GetAsync(url);
                // 👉 marca horário de término da requisição
                var fimHttp = DateTime.Now;

                proc.WaitForExit();

                // 👉 marca o horário final da medição
                var fim = DateTime.Now;

                // Rodar gawk para extrair dados CPU/GPU + horário
                // Adicionamos "Time" como primeira coluna.
                // Usamos "date" no shell para gerar o timestamp em HH:MM:SS.mmm
                var gawkCmd =
                    $"echo 'Time CPU_mW GPU_mW Total_mW' > \"{csvFile}\" && " +
                    $"gawk '/CPU Power:/ {{cmd=\"gdate +%H:%M:%S.%3N\"; cmd | getline t; close(cmd); match($0, /([0-9.]+) mW/, a); cpu=a[1];}} " +
                    $"/GPU Power:/ {{match($0, /([0-9.]+) mW/, b); gpu=b[1];}} " +
                    $"/Combined Power/ {{match($0, /([0-9.]+) mW/, c); total=c[1]; print t, cpu, gpu, total;}}' \"{fileName}\" >> \"{csvFile}\"";

                var psi2 = new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = "-c \"" + gawkCmd.Replace("\"", "\\\"") + "\"",
                    RedirectStandardOutput = false,
                    UseShellExecute = true
                };

                using (var proc2 = Process.Start(psi2))
                {
                    proc2!.WaitForExit();
                }
                // 👉 Acrescenta os horários HTTP no final do CSV
                await System.IO.File.AppendAllTextAsync(csvFile,
                    $"\nHTTP_START {inicioHttp:HH:mm:ss.fff}\nHTTP_END {fimHttp:HH:mm:ss.fff}");


                if (!System.IO.File.Exists(csvFile))
                    return StatusCode(500, $"Erro: o arquivo {csvFile} não foi criado.");

                var fullPath = Path.GetFullPath(csvFile);
                return Ok(new
                {
                    csvFile = fullPath,
                    inicio = inicio.ToString("HH:mm:ss.fff"),
                    inicioHttp = inicioHttp.ToString("HH:mm:ss.fff"),
                    fimHttp = fimHttp.ToString("HH:mm:ss.fff"),
                    fim = fim.ToString("HH:mm:ss.fff")
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro na medição: {ex.Message}");
            }
        }
    }
}