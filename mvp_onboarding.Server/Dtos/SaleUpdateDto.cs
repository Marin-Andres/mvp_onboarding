using System.ComponentModel.DataAnnotations;

namespace mvp_onboarding.Server.Dtos
{
    public class SaleUpdateDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int Id { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int? ProductId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int? CustomerId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a positive integer.")]
        public int? StoreId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly? DateSold { get; set; }
    }
}
