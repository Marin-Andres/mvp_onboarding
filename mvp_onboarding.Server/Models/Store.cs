﻿using System;
using System.Collections.Generic;

namespace mvp_onboarding.Server.Models;

public partial class Store
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
