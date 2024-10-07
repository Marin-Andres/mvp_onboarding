﻿namespace mvp_onboarding.Server.Dtos
{
    public class CustomerResponseDto
    {
        public List<CustomerDto> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }
}
