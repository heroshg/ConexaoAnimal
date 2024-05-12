using Microsoft.EntityFrameworkCore;

namespace API.Models.Data;

public class AppDataContext : DbContext
{
    

    public DbSet<Abrigo> Abrigos { get; set; }
    public DbSet<Adocao> Adocoes { get; set; }
    public DbSet<Endereco> Enderecos { get; set;}
    public DbSet<Pet> Pets { get; set; }

    /*Um abrigo tem um endereço e um endereço não necessáriamente tem um abrigo mas se estiver associado ele será pra um abrigo 1:1
     Um abrigo tem varios pets  e o pet tem 1 abrigo 1: N
    Um abrigo tem varias adoções e uma adoção só tem um abrigo que a realizou 1:N 
    Um pet pode ter somente uma adoção e a adoção só contém um pet 1:1
    */

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Abrigo>()
             .HasOne(a => a.Endereco)
             .WithOne(e => e.Abrigo)
             .HasForeignKey<Endereco>(e => e.AbrigoId)
             .IsRequired()
             .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Abrigo>()
            .HasMany(a => a.Pets)
            .WithOne(p => p.Abrigo)
            .HasForeignKey(p => p.AbrigoId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Abrigo>()
            .HasMany(a => a.Adocoes)
            .WithOne(a => a.Abrigo)
            .HasForeignKey(a => a.AbrigoId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Pet>()
            .HasOne(p => p.Adocao)
            .WithOne(a => a.Pet)
            .HasForeignKey<Pet>(p => p.AdocaoId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=ConexaoAnimal.db");
    }

}
