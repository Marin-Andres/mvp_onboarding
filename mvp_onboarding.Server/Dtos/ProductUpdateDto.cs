using System.ComponentModel.DataAnnotations;

namespace mvp_onboarding.Server.Dtos
{
    public class ProductUpdateDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(200, MinimumLength = 1)]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Product price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Product must be a positive number.")]
        public decimal Price { get; set; }
    }
}
