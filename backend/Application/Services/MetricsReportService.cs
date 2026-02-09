using WebApiMongoDbDemo.Domain.Interfaces;
using WebApiMongoDbDemo.DTOs;
using Xceed.Words.NET;

namespace WebApiMongoDbDemo.Application
{
    public class MetricsReportService : IMetricsReportService
    {
        public async Task<string> GenerateReportAsync(ReportData data)
        {
            Directory.CreateDirectory(data.OutputDir);

            var docPath = Path.Combine(
                data.OutputDir,
                $"{data.Scenario}_relatorio.docx"
            );

            using var doc = DocX.Create(docPath);

            // ===== TÍTULO =====

            var title = doc.InsertParagraph($"Relatório – {data.Scenario}");
            title.StyleId = "Title";

            // ===== METADADOS =====
            
            doc.InsertParagraph($"Arquivo CSV: {data.CsvPath}");
            doc.InsertParagraph($"Data de geração: {DateTime.Now:dd/MM/yyyy HH:mm}");

            doc.InsertParagraph().SpacingAfter(20);

            // ===== IMAGEM =====
            var hGraph = doc.InsertParagraph("Gráfico de Potência Total");
            hGraph.StyleId = "Heading2";

            if (File.Exists(data.PlotImagePath))
            {
                var img = doc.AddImage(data.PlotImagePath);
                var pic = img.CreatePicture();
                pic.Width = 600;
                doc.InsertParagraph().AppendPicture(pic);
            }
            else
            {
                doc.InsertParagraph("Imagem do gráfico não encontrada.");
            }

            // ===== GRANDEZAS =====
            var hUnits = doc.InsertParagraph("Grandezas e conversões");
            hUnits.StyleId = "Heading2";

            doc.InsertParagraph("Total_mW está em miliwatts (mW).");
            doc.InsertParagraph("Conversão: P(W) = P(mW) / 1000.");
            doc.InsertParagraph("O tempo do eixo X está em segundos.");

            // ===== EQUAÇÕES =====
            var hEq = doc.InsertParagraph("Equações");
            hEq.StyleId = "Heading2";

            doc.InsertParagraph("Energia consumida:");
            doc.InsertParagraph("E = ∫ P(t) dt ≈ Σ ((Pi + Pi+1)/2) · Δt");

            doc.InsertParagraph("Potência média:");
            doc.InsertParagraph("P̄ = E / ΔT");

            // ===== RESULTADOS =====
            var hRes = doc.InsertParagraph("Resultados");
            hRes.StyleId = "Heading2";

            doc.InsertParagraph($"Número de amostras: {data.SampleCount}");
            doc.InsertParagraph($"ΔT total: {data.DeltaTSeconds:F6} s");
            doc.InsertParagraph($"Energia total: {data.EnergyTotalJ:F6} J");
            doc.InsertParagraph($"Potência média total: {data.AvgPowerTotalW:F6} W");

            // ===== INTERVALO HTTP =====
            if (data.HttpStartMs.HasValue && data.HttpEndMs.HasValue)
            {
                var httpDuration =
                    (data.HttpEndMs.Value - data.HttpStartMs.Value) / 1000.0;

                doc.InsertParagraph().SpacingAfter(10);

                var hHttp = doc.InsertParagraph("Intervalo HTTP");
                hHttp.StyleId = "Heading2";

                doc.InsertParagraph($"HTTP_START (ms): {data.HttpStartMs.Value}");
                doc.InsertParagraph($"HTTP_END (ms): {data.HttpEndMs.Value}");
                doc.InsertParagraph($"Duração HTTP: {httpDuration:F6} s");

                if (data.EnergyHttpJ.HasValue)
                    doc.InsertParagraph($"Energia HTTP: {data.EnergyHttpJ.Value:F6} J");

                if (data.AvgPowerHttpW.HasValue)
                    doc.InsertParagraph($"Potência média HTTP: {data.AvgPowerHttpW.Value:F6} W");
            }
            else
            {
                doc.InsertParagraph("Observação: intervalo HTTP não disponível.")
                   .Italic();
            }

            doc.Save();
            await Task.CompletedTask;
            return docPath;
        }
    }
}