using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface ISaleMethods
    {
        Task<SaleDto> AddSale(SaleDto saleDto);
        Task<SaleDto> UpdateSale(int id, SaleUpdateDto saleDto);
        Task<SaleDto> DeleteSale(int id);
        Task<SaleDto> GetSale(int id);
        Task<IEnumerable<SaleDto>> GetSales();
    }
}
