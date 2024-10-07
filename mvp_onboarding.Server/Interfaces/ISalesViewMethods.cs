using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface ISalesViewMethods
    {
        Task<SalesViewResponseDto> GetSales(int pageNumber, int pageSize, string sortColumn, string sortDirection);
    }
}
