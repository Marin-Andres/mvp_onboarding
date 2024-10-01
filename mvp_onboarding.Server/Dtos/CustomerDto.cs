using System.ComponentModel.DataAnnotations;

namespace mvp_onboarding.Server.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Customer name is required.")]
        [StringLength(100, MinimumLength = 1)]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Customer address is required.")]
        [StringLength(500, MinimumLength = 1)]
        public string? Address { get; set; }
    }
}
