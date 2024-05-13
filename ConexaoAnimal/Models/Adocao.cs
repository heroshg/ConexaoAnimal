using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Adocao
{
    public int Id { get; set; }
    public int AbrigoId { get; set; }
    public int PetId { get; set; }
    public Abrigo? Abrigo { get; set; }
    public Pet? Pet { get; set; }
    public DateTime? RealizadaEm { get; set; } = DateTime.Now;

    [Required]
    [RegularExpression(@"^\d{3}.\d{3}.\d{3}-\d{2}$", ErrorMessage = "O CPF deve ser colocado formatado com pontos e traço 000.000.000-00")]
    public string? cpfTutor { get; set; }

}
