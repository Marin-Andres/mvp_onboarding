using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Mappers;

namespace mvp_onboarding.Server.Classes
{
    public class SaleMethods : ISaleMethods
    {
        public SaleMethods(TalentOnboardingContext context)
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<IEnumerable<SaleDto>> GetSales()
        {
            try
            {
                var _sales = await _context.Sales.Select(c => SaleMapper.EntityToDto(c)).ToListAsync();

                return (_sales);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Enumerable.Empty<SaleDto>();
            }
        }

        public async Task<SaleDto> GetSale(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                { 
                    var sale = await _context.Sales.FindAsync(id);
                    if (sale == null)
                    {
                        return null;
                    }
                    return SaleMapper.EntityToDto(sale);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public async Task<SaleDto> AddSale(SaleDto saleDto)
        {
            try
            {
                var sale = SaleMapper.DtoToEntity(saleDto);

                _context.Add(sale);
                await _context.SaveChangesAsync();

                return SaleMapper.EntityToDto(sale);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public async Task<SaleDto> UpdateSale(int? id, SaleUpdateDto saleDto)
        {
            try
            {
                if (!SaleExists(id))
                {
                    return null;
                }
                else
                {
                    var sale = SaleMapper.DtoToEntity(saleDto);

                    _context.Entry(sale).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return SaleMapper.EntityToDto(sale);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public async Task<SaleDto> DeleteSale(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                {
                    var sale = await _context.Sales.FindAsync(id);
                    if (sale == null)
                    {
                        return null;
                    }

                    _context.Sales.Remove(sale);
                    await _context.SaveChangesAsync();

                    return SaleMapper.EntityToDto(sale);
                }
            }
            catch (Exception e)
            { 
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public bool SaleExists(int? id)
        {
            if (id == null)
            {
                return false;
            }
            else
            {
                return _context.Sales.Any(e => e.Id == id);
            }
        }
    }
}
