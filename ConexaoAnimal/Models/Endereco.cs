using System.ComponentModel.DataAnnotations;

public class Endereco {
  [Required]
  public int EnderecoId { get; set; }

  [Required(ErrorMessage = "Campo Logradouro deve ser preenchido")]
  [StringLength(30, ErrorMessage = "O campo deve conter no máximo 30 caracteres")]
  [MinLength(6, ErrorMessage = "O campo deve conter no mínimo 6 caracteres")]
  public string? Logradouro { get; set; }

  [Required(ErrorMessage = "Campo Cidade deve ser preenchido")]
  [StringLength(35, ErrorMessage = "O campo deve conter no máximo 35 caracteres")]
  [MinLength(2, ErrorMessage = "O campo deve conter no mínimo 6 caracteres")]
  public string? Cidade { get; set; }

  [Required(ErrorMessage = "Campo UF deve ser preenchido")]
  [StringLength(2, ErrorMessage = "O campo deve conter no máximo 2 caracteres")]
  [MinLength(2, ErrorMessage = "O campo deve conter no mínimo 2 caracteres")]
  public string? Uf { get; set; }

  [Required(ErrorMessage = "Campo CEP deve ser preenchido")]
  [RegularExpression(@"^\d{5}-\d{3}$", ErrorMessage = "Por favor, insira um CEP válido no formato 12345-678.")]
  [StringLength(9, ErrorMessage = "O campo deve conter no máximo 9 caracteres")]
  [MinLength(9, ErrorMessage = "O campo deve conter no mínimo 9 caracteres")]
  public string? Cep { get; set; }

  [Required(ErrorMessage = "Campo Número deve ser preenchido")]
  [Range(0, 5000, ErrorMessage = "O número deve estar entre 0 e 5000")]
  public int Numero { get; set; }

  [StringLength(70, ErrorMessage = "O campo deve conter no máximo 70 caracteres")]
  [MinLength(5, ErrorMessage = "O campo deve conter no mínimo 5 caracteres")]
  public string? Complemento { get; set; }
  public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
  public Abrigo? Abrigo { get; set; }
  public Tutor? Tutor { get; set; }

}