using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface IProductMethods
    {
        Task<ProductDto> AddProduct(ProductDto productDto);
        Task<ProductDto> UpdateProduct(int id, ProductUpdateDto productDto);
        Task<ProductDto> DeleteProduct(int id);
        Task<ProductDto> GetProduct(int id);
        Task<IEnumerable<ProductDto>> GetProducts();
        public bool ProductExists(int id);
    }
}
