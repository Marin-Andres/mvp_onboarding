using mvp_onboarding.Server.Models;

namespace mvp_onboarding.Server.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Address { get; set; }
    }
}
