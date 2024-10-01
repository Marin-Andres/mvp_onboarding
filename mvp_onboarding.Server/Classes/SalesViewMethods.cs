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

        public async Task<IEnumerable<SalesViewDto>> GetSales() 
        {
            var _salesView = await _context.SalesViews.Select( c => SalesViewMapper.EntityToDto(c)).ToListAsync();

            return (_salesView);
        }
    }
}
