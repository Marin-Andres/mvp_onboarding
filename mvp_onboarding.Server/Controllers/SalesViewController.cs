using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesViewController : ControllerBase
    {
        private readonly ISalesViewMethods _salesViewMethods;

        public SalesViewController(ISalesViewMethods salesViewMethods)
        {
            _salesViewMethods = salesViewMethods;
        }

        // GET: api/SalesView
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesViewDto>>> GetSales()
        {
            var sales = await _salesViewMethods.GetSales();
            if (sales.Count() < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(sales);
            }
        }
    }
}
