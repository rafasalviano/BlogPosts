// Documento, formatação
// Ou seja, ele descreve como o relatório deve ser renderizado, não quando nem por quem.

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WebApiMongoDbDemo.DTOs;

namespace WebApiMongoDbDemo.Application.Reports
{
    public class MetricsReportPdf : IDocument
    {
        private readonly ReportData _data;

        public MetricsReportPdf(ReportData data)
        {
            _data = data;
        }

        public DocumentMetadata GetMetadata() =>
            DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(40);
                page.DefaultTextStyle(x => x.FontSize(12));

                page.Header().Text($"Relatório — {_data.Scenario}")
                    .FontSize(20)
                    .SemiBold()
                    .AlignCenter();

                page.Content().Column(col =>
                {
                    col.Spacing(15);

                    // METADADOS
                    col.Item().Text($"Arquivo CSV: {_data.CsvPath}");
                    col.Item().Text($"Data de geração: {DateTime.Now:dd/MM/yyyy HH:mm}");

                    // IMAGEM
                    col.Item().Text("Gráfico de Potência Total")
                        .FontSize(16)
                        .SemiBold();

                    if (File.Exists(_data.PlotImagePath))
                    {
                        col.Item().Image(_data.PlotImagePath)
                            .FitWidth();
                    }
                    else
                    {
                        col.Item().Text("Imagem do gráfico não encontrada.")
                            .Italic();
                    }

                    // GRANDEZAS
                    Section(col, "Grandezas e conversões", section =>
                    {
                        section.Item().Text("• Total_mW está em miliwatts (mW).");
                        section.Item().Text("• Conversão: P(W) = P(mW) / 1000.");
                        section.Item().Text("• O tempo do eixo X está em segundos.");
                    });

                    // EQUAÇÕES
                    Section(col, "Equações", section =>
                    {
                        section.Item().Text("Energia consumida:");
                        section.Item().Text("E = ∫ P(t) dt ≈ Σ ((Pi + Pi+1)/2) · Δt");

                        section.Item().Text("Potência média:");
                        section.Item().Text("P̄ = E / ΔT");
                    });

                    // RESULTADOS
                    Section(col, "Resultados", section =>
                    {
                        section.Item().Text($"Número de amostras: {_data.SampleCount}");
                        section.Item().Text($"ΔT total: {_data.DeltaTSeconds:F4} s");
                        section.Item().Text($"Energia total: {_data.EnergyTotalJ:F4} J");
                        section.Item().Text($"Potência média total: {_data.AvgPowerTotalW:F4} W");
                    });

                    // INTERVALO HTTP
                    if (_data.HttpStartMs.HasValue && _data.HttpEndMs.HasValue)
                    {
                        var httpDuration =
                            (_data.HttpEndMs.Value - _data.HttpStartMs.Value) / 1000.0;

                        Section(col, "Intervalo HTTP", section =>
                        {
                            section.Item().Text($"Início HTTP: {_data.HttpStartMs:F4} s");
                            section.Item().Text($"Fim HTTP: {_data.HttpEndMs:F4} s");
                            section.Item().Text($"Duração HTTP: {httpDuration:F4} s");

                            if (_data.EnergyHttpJ.HasValue)
                                section.Item().Text($"Energia HTTP: {_data.EnergyHttpJ:F4} J");

                            if (_data.AvgPowerHttpW.HasValue)
                                section.Item().Text($"Potência média HTTP: {_data.AvgPowerHttpW:F4} W");
                        });
                    }
                    else
                    {
                        col.Item().Text("Observação: intervalo HTTP não disponível.")
                            .Italic();
                    }
                });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Gerado automaticamente — ");
                        x.Span(DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                    });
            });
        }

        private static void Section(
            ColumnDescriptor parent,
            string title,
            Action<ColumnDescriptor> content)
        {
            parent.Item().Text(title)
                .FontSize(16)
                .SemiBold();

            parent.Item().Column(content);
        }
    }
}