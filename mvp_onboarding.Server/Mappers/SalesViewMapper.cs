using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace mvp_onboarding.Server.Mappers
{
    public class SalesViewMapper
    {
        public static SalesViewDto EntityToDto(SalesView salesView)
        {
            var salesViewDto = new SalesViewDto
            {
                Id = salesView.Id,
                Product = salesView.Product,
                Store = salesView.Store,
                Customer = salesView.Customer,
                DateSold = salesView.DateSold.ToString("dd MMM, yyyy")
            };

            return salesViewDto;
        }
    }
}
