// pega resultado powermetrics e gera csv

using System;

namespace WebApiMongoDbDemo.Domain.Interfaces
{
    public interface IPowermetricsProcessor
    {
        Task<string> CreateCsv(string txtPath, long httpInicio, long httpFim);
    }
}