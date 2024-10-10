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
            try
            {
                var query = _context.Customers.AsQueryable();
                if (sortDirection.ToLower() == "asc")
                {
                    query = query.OrderBy(c => EF.Property<Customer>(c, sortColumn));
                }
                else
                {
                    query = query.OrderByDescending(c => EF.Property<Customer>(c, sortColumn));
                }

                var totalCount = await query.CountAsync();
                var customers = await query
                    .Skip((pageNumber - 1) * pageSize)
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
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
                
                return new CustomerResponseDto
                {
                    Items = new List<CustomerDto>(),
                    TotalCount = 0,
                    PageSize = pageSize,
                    CurrentPage = pageNumber
                };
            }

            
        }

        public async Task<CustomerDto> GetCustomer(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
                {
                    var customer = await _context.Customers.FindAsync(id);
                    if (customer == null)
                    {
                        return null;
                    }
                    return CustomerMapper.EntityToDto(customer);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;

            }
        }
        public async Task<CustomerDto> AddCustomer(CustomerDto customerDto)
        {
            try
            {
                var customer = CustomerMapper.DtoToEntity(customerDto);

                _context.Add(customer);
                await _context.SaveChangesAsync();

                return CustomerMapper.EntityToDto(customer);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public async Task<CustomerDto> UpdateCustomer(int? id, CustomerUpdateDto customerDto)
        {

            try
            {
                if (!CustomerExists(id))
                {
                    return null;
                }
                else
                {
                    var customer = CustomerMapper.DtoToEntity(customerDto);

                    _context.Entry(customer).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return CustomerMapper.EntityToDto(customer);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return null;
            }



        }

        public async Task<CustomerDto> DeleteCustomer(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                else
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public bool CustomerExists(int? id)
        {
            if (id == null)
            {
                return false;
            }
            else
            {
                return _context.Customers.Any(e => e.Id == id);
            }
        }

    }
}
