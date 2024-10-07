using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;
using System.Drawing.Printing;

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
        public async Task<ActionResult<SalesViewResponseDto>> GetSales(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortColumn = "Name",
            [FromQuery] string sortDirection = "asc")
        {
            var saleResponse = await _salesViewMethods.GetSales(pageNumber, pageSize, sortColumn, sortDirection);
            if (saleResponse.TotalCount < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(saleResponse);
            }
        }
    }
}
