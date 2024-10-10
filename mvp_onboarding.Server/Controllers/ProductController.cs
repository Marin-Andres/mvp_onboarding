using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;
using System.Drawing.Printing;

namespace mvp_onboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductMethods _productMethods;

        public ProductController(IProductMethods productMethods)
        {
            _productMethods = productMethods;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<ProductResponseDto>> GetProducts(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortColumn = "Name",
            [FromQuery] string sortDirection = "asc")
        {
            var productResponse = await _productMethods.GetProducts(pageNumber, pageSize, sortColumn, sortDirection);
            if (productResponse.TotalCount < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(productResponse);
            }
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var productDto = await _productMethods.GetProduct(id);

            if (productDto == null)
            {
                return NotFound();
            }

            return Ok(productDto);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<ProductDto>> AddProduct([FromBody] ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }
            if (productDto.Id == 0)
            {
                return await _productMethods.AddProduct(productDto);
            }
            else
            {
                return BadRequest("Unable to add new record with fixed Id.");
            }
        }

        //PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductUpdateDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest("Product Id mismatches payload");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }

            var product = await _productMethods.UpdateProduct(id, productDto);

            if (product == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(product);
            }
        }

        //DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productDto = await _productMethods.DeleteProduct(id);
            if (productDto == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(productDto);
            }
        }
    }
}
