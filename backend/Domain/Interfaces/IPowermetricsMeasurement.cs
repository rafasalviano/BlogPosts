// pega resultado powermetrics e gera csv

using System;

namespace WebApiMongoDbDemo.Domain.Interfaces
{
    public interface IPowermetricsMeasurement
    {
        Task<(string, string, string)> RunPowermetrics(string scenario);
    }
}