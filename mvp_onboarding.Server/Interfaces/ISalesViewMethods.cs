using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface ISalesViewMethods
    {
        Task<IEnumerable<SalesViewDto>> GetSales();
    }
}
