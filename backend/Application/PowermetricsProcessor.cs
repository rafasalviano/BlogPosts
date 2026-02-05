using System;
using System.Diagnostics;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Application
{
    public class PowermetricsProcessor : IPowermetricsProcessor
    {
        public async Task<string> CreateCsv(string txtPath, long httpInicio, long httpFim)
        {
            var csvPath = Path.ChangeExtension(txtPath, ".csv");
            var sampleIntervalMs = 10;

            var gawkCmd =
                $"echo 'Time CPU_mW GPU_mW Total_mW' > \"{csvPath}\" && " +
                $"gawk 'BEGIN{{i=0; cpu=\"\"; gpu=\"\"; total=\"\";}} " +
                $"/CPU Power:/ {{match($0, /([0-9.]+) mW/, a); cpu=a[1];}} " +
                $"/GPU Power:/ {{match($0, /([0-9.]+) mW/, b); gpu=b[1];}} " +
                $"/Combined Power/ {{match($0, /([0-9.]+) mW/, c); total=c[1]; " +
                $"print (i*{sampleIntervalMs}), cpu, gpu, total; i++;}}' \"{txtPath}\" >> \"{csvPath}\"";

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
            await System.IO.File.AppendAllTextAsync(csvPath,
                $"\nHTTP_START {httpInicio}\nHTTP_END {httpFim}\n");

            var fullPath = Path.GetFullPath(csvPath);
            return fullPath;
        }
    }
}


