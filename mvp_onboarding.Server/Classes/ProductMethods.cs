using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Mappers;

namespace mvp_onboarding.Server.Classes
{
    public class ProductMethods : IProductMethods
    {
        public ProductMethods(TalentOnboardingContext context)
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            var _products = await _context.Products.Select(c => ProductMapper.EntityToDto(c)).ToListAsync();

            return (_products);
        }

        public async Task<ProductDto> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            return ProductMapper.EntityToDto(product);
        }
        public async Task<ProductDto> AddProduct(ProductDto productDto)
        {
            var product = ProductMapper.DtoToEntity(productDto);

            _context.Add(product);
            await _context.SaveChangesAsync();

            return ProductMapper.EntityToDto(product);
        }
        public async Task<ProductDto> UpdateProduct(int id, ProductUpdateDto productDto)
        {

            var product = ProductMapper.DtoToEntity(productDto);

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return ProductMapper.EntityToDto(product);

        }
        public async Task<ProductDto> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return ProductMapper.EntityToDto(product);
        }
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
