using Microsoft.EntityFrameworkCore;

namespace API.Models.Data;

public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions options) : base(options) { }

    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Adocao> Adocoes { get; set; }
    public DbSet<Endereco> Enderecos { get; set;}
    public DbSet<Pet> Pets { get; set; }

    /*Um abrigo tem um endereço e um endereço não necessáriamente tem um abrigo mas se estiver associado ele será pra um abrigo 1:1
     Um abrigo tem varios pets  e o pet tem 1 abrigo 1: N
    Um abrigo tem varias adoções e uma adoção só tem um abrigo que a realizou 1:N 
    Um pet tem somente uma adoção e a adoção só contém um pet 1:1
    */

}
