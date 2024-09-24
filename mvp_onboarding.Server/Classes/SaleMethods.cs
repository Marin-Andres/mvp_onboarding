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
            var _sales = await _context.Sales.Select(c => SaleMapper.EntityToDto(c)).ToListAsync();

            return (_sales);
        }

        public async Task<SaleDto> GetSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return null;
            }
            return SaleMapper.EntityToDto(sale);
        }
        public async Task<SaleDto> AddSale(SaleDto saleDto)
        {
            var sale = SaleMapper.DtoToEntity(saleDto);

            _context.Add(sale);
            await _context.SaveChangesAsync();

            return SaleMapper.EntityToDto(sale);
        }
        public async Task<SaleDto> UpdateSale(int id, SaleUpdateDto saleDto)
        {

            var sale = SaleMapper.DtoToEntity(saleDto);

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return SaleMapper.EntityToDto(sale);

        }
        public async Task<SaleDto> DeleteSale(int id)
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
        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
