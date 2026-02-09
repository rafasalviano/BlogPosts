using System;
using WebApiMongoDbDemo.DTOs;

namespace WebApiMongoDbDemo.Domain.Interfaces
{
    public interface IMetricsReportService
    {
        Task<string> GenerateReportAsync(ReportData data);
    }
}
