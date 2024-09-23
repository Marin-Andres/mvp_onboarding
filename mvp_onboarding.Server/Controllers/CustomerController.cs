using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerMethods _customerMethods;

        public CustomerController(ICustomerMethods customerMethods)
        {
            _customerMethods = customerMethods;
        }

        // GET: Customer
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

        // GET: Customer/5
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

        // POST: Customer
        [HttpPost]
        public async Task<ActionResult<CustomerDto>> AddCustomer(CustomerDto customerDto)
        {
            return await _customerMethods.AddCustomer(customerDto);
        }

        //PUT: Custmer/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer(int id, CustomerDto customerDto)
        {
            if (id != customerDto.Id)
            {
                return BadRequest();
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

        //DELETE: Customer/5
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
