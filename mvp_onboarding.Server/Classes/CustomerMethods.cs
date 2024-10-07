using mvp_onboarding.Server.Dtos;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Mappers;

namespace mvp_onboarding.Server.Classes
{
    public class CustomerMethods : ICustomerMethods
    {
        public CustomerMethods(TalentOnboardingContext context) 
        {
            _context = context;
        }

        private readonly TalentOnboardingContext _context;

        public async Task<CustomerResponseDto> GetCustomers(int pageNumber, int pageSize, string sortColumn, string sortDirection)
        {
            var query = _context.Customers.AsQueryable();

            try
            {
                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<Customer>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<Customer>(c, sortColumn));
                }
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
            }

            var totalCount = await query.CountAsync();
            var customers = await query
                .Skip((pageNumber -1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var customerDtos = customers.Select(c => CustomerMapper.EntityToDto(c)).ToList();

            return new CustomerResponseDto
            {
                Items = customerDtos,
                TotalCount = totalCount,
                PageSize = pageSize,
                CurrentPage = pageNumber
            };
            
        }

        public async Task<CustomerDto> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return null;
            }
            return CustomerMapper.EntityToDto(customer);
        }
        public async Task<CustomerDto> AddCustomer(CustomerDto customerDto)
        {
            var customer = CustomerMapper.DtoToEntity(customerDto);

            _context.Add(customer);
            await _context.SaveChangesAsync();

            return CustomerMapper.EntityToDto(customer);
        }
        public async Task<CustomerDto> UpdateCustomer(int id, CustomerUpdateDto customerDto)
        {

            var customer = CustomerMapper.DtoToEntity(customerDto);

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return CustomerMapper.EntityToDto(customer);

        }
        public async Task<CustomerDto> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return null;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return CustomerMapper.EntityToDto(customer);
        }
        public bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
