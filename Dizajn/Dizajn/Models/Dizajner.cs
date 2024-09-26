using Dizajn.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dizajn.Models
{
    public class Dizajner : Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Email { get; set; }
   
    }
}