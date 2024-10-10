using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Interfaces
{
    public interface ICustomerMethods
    {
        Task<CustomerDto> AddCustomer(CustomerDto customerDto);
        Task<CustomerDto> UpdateCustomer(int? id, CustomerUpdateDto customerDto);
        Task<CustomerDto> DeleteCustomer(int? id);
        Task<CustomerDto> GetCustomer(int? id);
        Task<CustomerResponseDto> GetCustomers(int pageNumber, int pageSize, string sortColumn, string sortDirection);
        public bool CustomerExists(int? id);
    }
}
