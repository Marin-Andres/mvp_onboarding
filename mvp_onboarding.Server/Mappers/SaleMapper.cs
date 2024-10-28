using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Models;

namespace mvp_onboarding.Server.Mappers
{
    public class SaleMapper
    {
        public static Sale DtoToEntity(SaleDto saleDto)
        {
            var entity = new Sale
            {
                Id = saleDto.Id,
                ProductId = saleDto.ProductId,
                StoreId = saleDto.StoreId,
                CustomerId = saleDto.CustomerId,
                DateSold = saleDto.DateSold
            };

            return entity;
        }
        public static Sale DtoToEntity(SaleUpdateDto saleDto)
        {
            var entity = new Sale
            {
                Id = saleDto.Id,
                ProductId = saleDto.ProductId,
                StoreId = saleDto.StoreId,
                CustomerId = saleDto.CustomerId,
                DateSold = saleDto.DateSold
            };

            return entity;
        }

        public static SaleDto EntityToDto(Sale sale)
        {
            var saleDto = new SaleDto
            {
                Id = sale.Id,
                ProductId = sale.ProductId,
                StoreId = sale.StoreId,
                CustomerId = sale.CustomerId,
                DateSold = sale.DateSold
            };

            return saleDto;
        }
    }
}
