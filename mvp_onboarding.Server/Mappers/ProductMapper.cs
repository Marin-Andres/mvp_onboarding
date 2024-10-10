using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Models;

namespace mvp_onboarding.Server.Mappers
{
    public class ProductMapper
    {
        public static Product DtoToEntity(ProductDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price
            };

            return entity;
        }
        public static Product DtoToEntity(ProductUpdateDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price
            };

            return entity;
        }

        public static ProductDto EntityToDto(Product product)
        {
            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price
            };

            return productDto;
        }
    }
}
