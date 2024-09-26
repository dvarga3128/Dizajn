using Dizajn.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Dizajn.Data
{
    public class DizajnContext : DbContext
    {
        public DizajnContext(DbContextOptions<DizajnContext> opcije) : base(opcije)
        {
        }


        public DbSet<Smjer> Dizajneri { get; set; }


    }
}
