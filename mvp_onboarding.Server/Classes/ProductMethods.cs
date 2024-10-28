using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Mappers;
using mvp_onboarding.Server.Models;

namespace mvp_onboarding.Server.Classes
{
    public class ProductMethods : IProductMethods
    {
        public ProductMethods(TalentOnboardingContext context)
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<ProductResponseDto> GetProducts(int pageNumber,int pageSize,string sortColumn,string sortDirection)
        {
            try
            {
                var query = _context.Products.AsQueryable();
                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<Product>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<Product>(c, sortColumn));
                }

                var totalCount = await query.CountAsync();
                var products = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var productDtos = products.Select(c => ProductMapper.EntityToDto(c)).ToList();

                return new ProductResponseDto
                {
                    Items = productDtos,
                    TotalCount = totalCount,
                    PageSize = pageSize,
                    CurrentPage = pageNumber,
                };
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);

                return new ProductResponseDto
                {
                    Items = new List<ProductDto>(),
                    TotalCount = 0,
                    PageSize = pageSize,
                    CurrentPage = pageNumber,
                };
            }

        }

        public async Task<ProductDto> GetProduct(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                {
                    var product = await _context.Products.FindAsync(id);
                    if (product == null)
                    {
                        return null;
                    }
                    return ProductMapper.EntityToDto(product);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;
            }
        }

        public async Task<ProductDto> AddProduct(ProductDto productDto)
        {
            try
            {
                var product = ProductMapper.DtoToEntity(productDto);

                _context.Add(product);
                await _context.SaveChangesAsync();

                return ProductMapper.EntityToDto(product);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<ProductDto> UpdateProduct(int? id, ProductUpdateDto productDto)
        {
            try
            {
                if (!ProductExists(id))
                {
                    return null;
                }
                else
                {
                    var product = ProductMapper.DtoToEntity(productDto);
                    _context.Entry(product).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                    return ProductMapper.EntityToDto(product);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error {ex.Message}");

                return null;
            }

        }

        public async Task<ProductDto> DeleteProduct(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public bool ProductExists(int? id)
        {
            if (id == null)
            {
                return false;
            }
            else
            {
                return _context.Products.Any(e => e.Id == id);
            }
        }
    }
}
