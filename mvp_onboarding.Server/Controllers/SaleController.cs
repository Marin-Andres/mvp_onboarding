using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleMethods _saleMethods;

        public SaleController(ISaleMethods saleMethods)
        {
            _saleMethods = saleMethods;
        }

        // GET: api/Sale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
            var sales = await _saleMethods.GetSales();
            if (sales.Count() < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(sales);
            }
        }

        // GET: api/Sale/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            var saleDto = await _saleMethods.GetSale(id);

            if (saleDto == null)
            {
                return NotFound();
            }

            return Ok(saleDto);
        }

        // POST: api/Sale
        [HttpPost]
        public async Task<ActionResult<SaleDto>> AddSale([FromBody] SaleDto saleDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }
            return await _saleMethods.AddSale(saleDto);
        }

        //PUT: api/Sale/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSale([FromRoute] int id, [FromBody] SaleUpdateDto saleDto)
        {
            if (id != saleDto.Id)
            {
                return BadRequest("Sale Id mismatches payload");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }

            var sale = await _saleMethods.UpdateSale(id, saleDto);

            if (sale == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(sale);
            }
        }

        //DELETE: api/Sale/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var saleDto = await _saleMethods.DeleteSale(id);
            if (saleDto == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(saleDto);
            }
        }
    }
}
