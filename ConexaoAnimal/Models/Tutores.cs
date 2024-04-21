using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tutores
{
    public DateTime DataCriacao { get; private set; } = DateTime.UtcNow;

    [Key]
    [Required]
    [StringLength(11, MinimumLength = 11, ErrorMessage = "O campo deve conter exatamente 11 caracteres")]
    [MinLength(11, ErrorMessage = "O campo deve conter exatamente 11 caracteres")]
    public string? Cpf { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "O campo deve conter no máximo 100 caracteres")]
    public string? Nome { get; set; }

    [Required]
    [StringLength(11, MinimumLength = 11, ErrorMessage = "O campo deve conter exatamente 11 caracteres")]
    public string? Celular { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "O formato do email é inválido")]
    public string? Email { get; set; }

    [Required]
    public int QtdPetsAdotados { get; set; }

    [ForeignKey("Endereco")]
    public int EnderecoId { get; set; }
    public Endereco? Endereco { get; set; }
}