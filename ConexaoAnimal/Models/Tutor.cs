using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tutor
{
    [Key]
    [Required(ErrorMessage = "Campo CPF deve ser preenchido")]
    [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido. O formato deve ser XXX.XXX.XXX-XX")]
    [StringLength(14, ErrorMessage = "O campo deve conter exatamente 14 caracteres")]
    [MinLength(14, ErrorMessage = "O campo deve conter exatamente 14 caracteres")]
    public string? Cpf { get; set; }

    [Required(ErrorMessage = "Campo NOME deve ser preenchido")]
    [StringLength(100, ErrorMessage = "O campo deve conter no máximo 100 caracteres")]
    public string? Nome { get; set; }

    [Required(ErrorMessage = "Campo CELULAR deve ser preenchido")]
    [StringLength(14, ErrorMessage = "O campo deve conter exatamente 11 caracteres")]
    [MinLength(14, ErrorMessage = "Número muito curto o celular deve ser inserido no formato (XX) XXXXX-XXXX")]
    [RegularExpression(@"^\(\d{2}\) \d{5}-\d{4}$", ErrorMessage = "Número de telefone inválido. O formato deve ser (XX) XXXXX-XXXX")]
    public string? Celular { get; set; }

    [Required(ErrorMessage = "Campo EMAIL deve ser preenchido")]
    [EmailAddress(ErrorMessage = "O formato do email é inválido")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Campo QtdPetsAdotados deve ser preenchido")]
    public int QtdPetsAdotados { get; set; }

    public DateTime DataCriacao { get; private set; } = DateTime.UtcNow;

    public int EnderecoId { get; set; }

    public Endereco Endereco { get; set; }
}