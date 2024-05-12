using API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Abrigo {
  [Key]
  [Required]
  public int AbrigoId { get; set; } 

  [Required(ErrorMessage = "Campo Nome deve ser preenchido")]
  [StringLength(30, ErrorMessage = "O número máxino deve ser 30 caracteres")]
  [MinLength(3, ErrorMessage = "O número mínimo deve ser de 3 caracteres")]
  public string? Nome { get; set; }

  [Required(ErrorMessage = "Campo QtdPets deve ser preenchido")]
  [Range(0, 1000, ErrorMessage = "O abrigo deve conter de 0 ou até 1000 Pets")]
  public int QtdPets { get; set; }
  public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
  public int EnderecoId { get; set; }
  public Endereco Endereco { get; set; } = null!;
  public ICollection<Pet> Pets { get; set; } = new List<Pet>();
  public ICollection<Adocao>? Adocoes { get; set; }
}