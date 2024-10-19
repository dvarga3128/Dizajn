using Dizajn.Data;
using Dizajn.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dizajn.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DizajnerController : ControllerBase
    {
    
        private readonly DizajnContext _context;

      
        public DizajnerController(DizajnContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Dizajneri);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Dizajneri.Find(sifra));
        }



        [HttpPost]
        public IActionResult Post(Dizajner dizajner)
        {
            _context.Dizajneri.Add(dizajner);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, dizajner);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Dizajner dizajner)
        {
            var dizajnerBaza = _context.Dizajneri.Find(sifra);

            dizajnerBaza.Ime = dizajner.Ime;
            dizajnerBaza.Prezime = dizajner.Prezime;
            dizajnerBaza.Email = dizajner.Email;
           

            _context.Dizajneri.Update(dizajnerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var dizajnerBaza = _context.Dizajneri.Find(sifra);

            _context.Dizajneri.Remove(dizajnerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
}
