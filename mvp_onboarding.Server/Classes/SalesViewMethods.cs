using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Mappers;

namespace mvp_onboarding.Server.Classes
{
    public class SalesViewMethods : ISalesViewMethods
    {
        public SalesViewMethods(TalentOnboardingContext context)
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<SalesViewResponseDto> GetSales(int pageNumber, int pageSize, string sortColumn, string sortDirection) 
        {
            try
            {
                var query = _context.SalesViews.AsQueryable();

                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<SalesView>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<SalesView>(c, sortColumn));
                }
                var totalCount = await query.CountAsync();
                var sales = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var salesDtos = sales.Select(c => SalesViewMapper.EntityToDto(c)).ToList();

                return new SalesViewResponseDto
                {
                    Items = salesDtos,
                    TotalCount = totalCount,
                    PageSize = pageSize,
                    CurrentPage = pageNumber
                };
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);

                return new SalesViewResponseDto
                {
                    Items = new List<SalesViewDto>(),
                    TotalCount = 0,
                    PageSize = pageSize,
                    CurrentPage = pageNumber
                };

            }

        }
    }
}
