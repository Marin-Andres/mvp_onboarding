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
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var customers = await _customerMethods.GetCustomers();
            if (customers.Count() < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(customers);
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
            return await _customerMethods.AddCustomer(customerDto);
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
