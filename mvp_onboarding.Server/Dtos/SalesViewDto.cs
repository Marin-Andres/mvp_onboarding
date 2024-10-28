namespace mvp_onboarding.Server.Dtos
{
    public class SalesViewDto
    {
        public int Id { get; set; }

        public string? Customer { get; set; }

        public string? Product { get; set; }

        public string? Store { get; set; }

        public string? DateSold { get; set; }
    }
}
