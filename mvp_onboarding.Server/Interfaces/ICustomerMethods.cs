﻿using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface ICustomerMethods
    {
        Task<CustomerDto> AddCustomer(CustomerDto customerDto);
        Task<CustomerDto> UpdateCustomer(int id, CustomerUpdateDto customerDto);
        Task<CustomerDto> DeleteCustomer(int id);
        Task<CustomerDto> GetCustomer(int id);
        Task<IEnumerable<CustomerDto>> GetCustomers();
    }
}
