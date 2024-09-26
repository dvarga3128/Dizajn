using System.ComponentModel.DataAnnotations;

namespace Dizajn.Models
{
    public abstract class Entitet
    {
        [Key]
        public int? Sifra { get; set; }
    }
}