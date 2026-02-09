using System.Globalization;
using System.Text;
using ScottPlot;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Application
{
    public record MetricsAnalysisResult
    {
    public string CsvPath { get; init; } = default!;
    public string PlotImagePath { get; init; } = default!;
    public string MarkdownReportPath { get; init; } = default!;

    public int SampleCount { get; init; }
    public double DeltaTSeconds { get; init; }
    public double EnergyTotalJ { get; init; }
    public double AvgPowerTotalW { get; init; }

    public double? HttpStartMs { get; init; }
    public double? HttpEndMs { get; init; }
    }

    public class MetricsPlotService : IMetricsPlotService
    {
        public async Task<MetricsAnalysisResult> PlotAndSaveAsync(
            string csvPath,
            string? outputDir = null,
            string? baseFileName = null)
        {
            if (!File.Exists(csvPath))
                throw new FileNotFoundException("CSV não encontrado", csvPath);

            var lines = await File.ReadAllLinesAsync(csvPath);

            // --- 1) Parse da série (Time + CPU_mW + GPU_mW + Total_mW) ---
            var times = new List<double>();
            var cpuMw = new List<double>();
            var gpuMw = new List<double>();
            var totalMw = new List<double>();

            double? httpStart = null;
            double? httpEnd = null;

            // tenta descobrir separador a partir do header
            // seu header costuma ser: Time CPU_mW GPU_mW Total_mW

            

            for (int i = 0; i < lines.Length; i++)
            {
                var raw = lines[i]?.Trim();
                if (string.IsNullOrWhiteSpace(raw))
                    continue;

                // linhas educativas no fim:
                // HTTP_START 19:04:14.684
                // HTTP_END   19:04:14.744
                if (raw.StartsWith("HTTP_START", StringComparison.OrdinalIgnoreCase))
                {
                    httpStart = ParseNumberToken(raw);
                    continue;
                }
                if (raw.StartsWith("HTTP_END", StringComparison.OrdinalIgnoreCase))
                {
                    httpEnd = ParseNumberToken(raw);
                    continue;
                }

                

                // pula header
                if (raw.StartsWith("Time", StringComparison.OrdinalIgnoreCase))
                    continue;

                // split flexível por espaço/tab/; , (sem quebrar HH:mm:ss.fff)
                var parts = raw.Split(new[] { '\t', ' ', ';', ',' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length < 4)
                    continue;

                // Time pode ser HH:mm:ss.fff
                if (!TryParseTimeMs(parts[0], out var t))
                    continue;

                if (!TryParseDouble(parts[1], out var c)) continue;
                if (!TryParseDouble(parts[2], out var g)) continue;
                if (!TryParseDouble(parts[3], out var tot)) continue;

                times.Add(t);
                cpuMw.Add(c);
                gpuMw.Add(g);
                totalMw.Add(tot);
            }

            if (times.Count < 2)
                throw new InvalidOperationException("CSV sem pontos suficientes para plotar/integrar.");

            // --- 2) Eixo X em segundos relativos ao primeiro ponto ---
            var t0 = times[0];
            double[] xs = times.Select(dt => (dt - t0) / 1000.0).ToArray();
            double[] yTotalMw = totalMw.ToArray();

            // --- 3) Energia (área sob a curva) por trapézios ---
            // Total_mW -> W (mW/1000), e dt em segundos => Joules
            // E = Σ ((P_i + P_{i+1})/2) * Δt
            double energyJ = 0.0;
            for (int i = 0; i < xs.Length - 1; i++)
            {
                double dt = xs[i + 1] - xs[i];
                if (dt <= 0) continue;

                double p1W = yTotalMw[i] / 1000.0;
                double p2W = yTotalMw[i + 1] / 1000.0;

                energyJ += (p1W + p2W) * 0.5 * dt;
            }

            double deltaT = xs[^1] - xs[0];
            double avgPowerW = deltaT > 0 ? (energyJ / deltaT) : double.NaN; // "área / ΔT"

            // --- 4) Plot (e salva arquivo) ---
            outputDir ??= Path.GetDirectoryName(csvPath) ?? Directory.GetCurrentDirectory();
            Directory.CreateDirectory(outputDir);

            baseFileName ??= Path.GetFileNameWithoutExtension(csvPath);
            var pngPath = Path.Combine(outputDir, $"{baseFileName}_plot.png");
            var reportPath = Path.Combine(outputDir, $"{baseFileName}_plot_report.md");

            var plt = new ScottPlot.Plot();
            plt.Title($"Powermetrics Total (mW) — {baseFileName}");
            plt.XLabel("Tempo (s) relativo ao início do powermetrics");
            plt.YLabel("Potência (mW)");

            var sig = plt.Add.SignalXY(xs, yTotalMw);
            sig.LegendText = "Total_mW";
            plt.ShowLegend();

            // linhas verticais vermelhas no intervalo HTTP
            // converter httpStart/httpEnd para segundos relativos ao t0 (se existirem)
            if (httpStart.HasValue)
            {
                double xHs = httpStart.Value / 1000.0;
                var v = plt.Add.VerticalLine(xHs);
                v.Color = Colors.Red;
                v.LineWidth = 2;
                v.LegendText = "HTTP_START";
            }

            if (httpEnd.HasValue)
            {
                double xHe = httpEnd.Value / 1000.0;
                var v = plt.Add.VerticalLine(xHe);
                v.Color = Colors.Red;
                v.LineWidth = 2;
                v.LegendText = "HTTP_END";
            }

            var txt = plt.Add.Text(
                $"Energia (∫P dt) = {energyJ:F4} J\nMédia (Energia/ΔT) = {avgPowerW:F4} W",
                xs[0] + (deltaT * 0.02),
                yTotalMw.Max() * 0.95
            );

            txt.FontSize = 16;
            txt.Alignment = Alignment.UpperLeft;


            plt.SavePng(pngPath, 1400, 700);

            // --- 5) Relatório educativo com equações ---
            var sb = new StringBuilder();
            sb.AppendLine($"# Relatório — {baseFileName}");
            sb.AppendLine();
            sb.AppendLine($"**Arquivo CSV:** `{csvPath}`");
            sb.AppendLine($"**Imagem gerada:** `{pngPath}`");
            sb.AppendLine();

            sb.AppendLine("## Grandezas e conversões");
            sb.AppendLine("- `Total_mW` está em **miliwatts (mW)**.");
            sb.AppendLine("- Conversão: **P(W) = P(mW) / 1000**.");
            sb.AppendLine("- O tempo do eixo X está em **segundos**.");
            sb.AppendLine();

            sb.AppendLine("## Equações (método dos trapézios)");
            sb.AppendLine("Energia consumida (em Joules):");
            sb.AppendLine();
            sb.AppendLine("**E = ∫ P(t) dt ≈ Σ ((Pᵢ + Pᵢ₊₁)/2) · Δt**");
            sb.AppendLine();
            sb.AppendLine("onde `P` está em **Watts** e `Δt` em **segundos**.");
            sb.AppendLine();

            sb.AppendLine("Potência média no intervalo (\"área/ΔT\"):");
            sb.AppendLine();
            sb.AppendLine("**P̄ = E / ΔT**");
            sb.AppendLine();

            sb.AppendLine("## Resultados");
            sb.AppendLine($"- Número de amostras: **{xs.Length}**");
            sb.AppendLine($"- ΔT (duração total): **{deltaT:F6} s**");
            sb.AppendLine($"- Energia total estimada: **{energyJ:F6} J**");
            sb.AppendLine($"- Potência média (Energia/ΔT): **{avgPowerW:F6} W**");
            sb.AppendLine();

            if (httpStart.HasValue && httpEnd.HasValue)
            {
                var httpDt = (httpEnd.Value - httpStart.Value) / 1000.0;
                sb.AppendLine("## Intervalo HTTP (marcado em vermelho no gráfico)");
                sb.AppendLine($"- HTTP_START (ms): `{httpStart.Value}`");
                sb.AppendLine($"- HTTP_END (ms): `{httpEnd.Value}`");
                sb.AppendLine($"- Duração HTTP: **{httpDt:F6} s**");
                sb.AppendLine();
            }
            else
            {
                sb.AppendLine("> Observação: não encontrei `HTTP_START` e/ou `HTTP_END` no CSV. " +
                              "Se você os adiciona no final, mantenha o formato `HTTP_START <ms>` e `HTTP_END <ms>`.");
                sb.AppendLine();
            }

            await File.WriteAllTextAsync(reportPath, sb.ToString(), Encoding.UTF8);

            return new MetricsAnalysisResult
            {
                CsvPath = csvPath,
                PlotImagePath = pngPath,
                MarkdownReportPath = reportPath,

                SampleCount = xs.Length,
                DeltaTSeconds = deltaT,
                EnergyTotalJ = energyJ,
                AvgPowerTotalW = avgPowerW,

                HttpStartMs = httpStart,
                HttpEndMs = httpEnd
            };
;
        }

        private static double ParseNumberToken(string raw)
        {
            var parts = raw.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 2)
                throw new FormatException($"Linha HTTP inválida: {raw}");

            if (!TryParseDouble(parts[1], out var v))
                throw new FormatException($"Número inválido: {parts[1]}");

            return v;
        }
        private static bool TryParseTimeMs(string token, out double ms)
        {
            // Caso 1: token é número (ms)
            if (TryParseDouble(token, out var v))
            {
                ms = v;
                return true;
            }

            // Caso 2: token é HH:mm:ss.fff ou HH:mm:ss
            if (TimeSpan.TryParseExact(token, @"hh\:mm\:ss\.fff", CultureInfo.InvariantCulture, out var ts) ||
                TimeSpan.TryParseExact(token, @"hh\:mm\:ss", CultureInfo.InvariantCulture, out ts))
            {
                ms = ts.TotalMilliseconds;
                return true;
            }

            ms = default;
            return false;
        }

        private static bool TryParseDouble(string s, out double v)
        {
            // aceita tanto 123.45 quanto 123,45 se seu sistema escrever vírgula
            if (double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out v))
                return true;

            var pt = CultureInfo.GetCultureInfo("pt-BR");
            return double.TryParse(s, NumberStyles.Float, pt, out v);
        }
    }
}