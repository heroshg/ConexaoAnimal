namespace API.Models;

public class Adocao
{
    public int Id { get; set; }
    public int AbrigoId { get; set; }
    public int PetId { get; set; }
    public Abrigo? Abrigo { get; set; }
    public Pet? Pet { get; set; }
    public DateTime? RealizadaEm { get; set; } = DateTime.Now;
}
