using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerMethods _customerMethods;

        public CustomerController(ICustomerMethods customerMethods)
        {
            _customerMethods = customerMethods;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<CustomerResponseDto>> GetCustomers(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortColumn = "Name",
            [FromQuery] string sortDirection = "asc")
        {
            var customerResponse = await _customerMethods.GetCustomers(pageNumber, pageSize, sortColumn, sortDirection);
            if (customerResponse.TotalCount < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(customerResponse);
            }
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            var customerDto = await _customerMethods.GetCustomer(id);
         
            if (customerDto == null)
            {
                return NotFound();
            }

            return Ok(customerDto);
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<CustomerDto>> AddCustomer([FromBody] CustomerDto customerDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }
            if (customerDto.Id == 0)
            {
                return await _customerMethods.AddCustomer(customerDto);
            }
            else
            {
                return BadRequest("Unable to add new record with fixed Id.");
            }
        }

        //PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer([FromRoute] int id, [FromBody] CustomerUpdateDto customerDto)
        {
            if (id != customerDto.Id)
            {
                return BadRequest("Customer Id mismatches payload");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }

            var customer = await _customerMethods.UpdateCustomer(id, customerDto);

            if (customer == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(customer);
            }
        }

        //DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        { 
            var customerDto = await _customerMethods.DeleteCustomer(id);
            if (customerDto == null)
            {
                return NotFound();
            }
            else
            { 
                return Ok(customerDto);
            }
        }
    }
}
