using System;
using System.Collections.Generic;

namespace mvp_onboarding.Server.Models;

public partial class SalesView
{
    public int Id { get; set; }

    public string? Customer { get; set; }

    public string? Product { get; set; }

    public string? Store { get; set; }

    public DateOnly DateSold { get; set; }
}
