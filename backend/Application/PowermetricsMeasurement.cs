using System;
using System.Diagnostics;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Application
{
    public class PowermetricsMeasurement : IPowermetricsMeasurement
    {
        private readonly IPowermetricsProcessor _powermetricsService;

        public PowermetricsMeasurement(IPowermetricsProcessor powermetricsService)
        {
            _powermetricsService = powermetricsService;
        }
        public async Task<(string, string, string)> RunPowermetrics(string scenario)
        {
            var resultsDir = Path.Combine(Directory.GetCurrentDirectory(), "MetricsResults");
            Directory.CreateDirectory(resultsDir);
            var txtPath = Path.Combine(resultsDir, $"{scenario}.txt");

            // URL do backend para puxar os posts conforme cenário
            var baseUrl = "http://localhost:5027/api/post";
            string url = baseUrl;
            var client = new HttpClient();

            // escolhe o tipo de requisição
            if (scenario == "paginacao")
                url = $"{baseUrl}/paginated?page=1&take=25";
            else if (scenario == "sempaginacao")
                url = baseUrl;
            else if (scenario == "comprimido")
                client.DefaultRequestHeaders.Add("Accept-Encoding", "br");
            else if (scenario == "semcompressao")
                client.DefaultRequestHeaders.Add("Accept-Encoding", "identity");

            // inicia powermetrics - intervalo 10ms, 20 amostras, observa-se que em 100ms GET /posts é realizado
            var powermetricsCmd = $"sudo powermetrics --samplers cpu_power,gpu_power -i 10 -n 8000 > {txtPath}";
            var psi = new ProcessStartInfo
            {
                FileName = "/bin/bash",
                Arguments = $"-c \"{powermetricsCmd}\"",
                RedirectStandardOutput = false,
                UseShellExecute = true
            };
            
            var proc = Process.Start(psi)!; // start powermetrics
            var sw = Stopwatch.StartNew();
            var inicioMs = 0L; // measurement start at sw start

            await Task.Delay(1500);

            // 🔴 INÍCIO DO BURST HTTP
            var inicioHttpMs = sw.ElapsedMilliseconds;

            var tasks = Enumerable.Range(0, 100).Select(async _ =>
            {
                using var resp = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);
                await resp.Content.ReadAsByteArrayAsync(); // força leitura completa
            }).ToArray();

            await Task.WhenAll(tasks);

            // 🔴 FIM DO BURST HTTP
            var fimHttpMs = sw.ElapsedMilliseconds;

            await proc.WaitForExitAsync();
            var csvFile = await _powermetricsService.CreateCsv(txtPath, inicioHttpMs, fimHttpMs);

            return (inicioHttpMs.ToString(), fimHttpMs.ToString(), csvFile);
        
    }
}
}


