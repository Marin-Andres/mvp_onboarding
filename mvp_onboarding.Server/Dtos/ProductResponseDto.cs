namespace mvp_onboarding.Server.Dtos
{
    public class ProductResponseDto
    {
        public List<ProductDto> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }
}
