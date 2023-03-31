using Core.DB;
using Microsoft.Extensions.DependencyInjection;
using Trades.Application.Interfaces;
using Trades.Application.Services;
using Trades.Repository.Interfaces;
using Trades.Repository.Maps;
using Trades.Repository.Repositories;

namespace Trading.Application
{
    public static class TradesModule
    {
        public static IServiceCollection AddTradesModule(this IServiceCollection services)
        {
            services.AddScoped<IBrokerAccountModelRepository, BrokerAccountModelRepository>();
            services.AddScoped<IConfirmationModelRepository, ConfirmationModelRepository>();
            services.AddScoped<ITradeConfirmationModelRepository, TradeConfirmationModelRepository>();
            services.AddScoped<ITradeModelRepository, TradeModelRepository>();
            services.AddScoped<ITradingPairModelRepository, TradingPairModelRepository>();

            services.AddScoped<IBrokerAccountService, BrokerAccountService>();
            services.AddScoped<IConfirmationService, ConfirmationService>();
            services.AddScoped<ITradeConfirmationService, TradeConfirmationService>();
            services.AddScoped<ITradeService, TradeService>();
            services.AddScoped<ITradingPairService, TradingPairService>();

            return services;
        }

        // AK: I'm not sure if this is the best place for something like this. Shouldn't this be in Repository?
        public static MappingFluentConfig AddTradingModuleMapping(this MappingFluentConfig map)
        {
            return map.AddMap<BrokerAccountModelMap>()
                .AddMap<ConfirmationModelMap>()
                .AddMap<TradeConfirmationModelMap>()
                .AddMap<TradeModelMap>()
                .AddMap<TradingPairModelMap>();
        }
    }
}
