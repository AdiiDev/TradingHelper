using Core.DB;
using Microsoft.Extensions.DependencyInjection;

namespace Trading.Application
{
    public static class TradesModule
    {
        public static IServiceCollection AddTradesModule(this IServiceCollection services)
        {
            return services;
        }

        // AK: I'm not sure if this is the best place for something like this. Shouldn't this be in Repository?
        public static MappingFluentConfig AddTradingModuleMapping(this MappingFluentConfig map)
        {
            return map;/*.AddMap<ClientModelMap>()
                .AddMap<LetterModelMap>()
                .AddMap<NameModelMap>()
                .AddMap<PortraitModelMap>();*/
        }
    }
}
