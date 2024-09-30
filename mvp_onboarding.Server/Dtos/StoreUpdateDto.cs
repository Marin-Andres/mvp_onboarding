using System.ComponentModel.DataAnnotations;

namespace mvp_onboarding.Server.Dtos
{
    public class StoreUpdateDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Store name is required.")]
        [StringLength(100, MinimumLength = 1)]
        public string? Name { get; set; }
        
        [Required(ErrorMessage = "Store address is required.")]
        [StringLength(500, MinimumLength = 1)]
        public string? Address { get; set; }
    }
}
