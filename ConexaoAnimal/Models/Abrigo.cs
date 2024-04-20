using System.ComponentModel.DataAnnotations;

public class Abrigo {

  [Required]
  public int AbrigoId {  get; set; }

  [Required]
  [StringLength(30, ErrorMessage = "O número máxino deve ser 30 caracteres")]
  [MinLength(3, ErrorMessage = "O número mínimo deve ser de 3 caracteres")]
  public string? Nome {  get; set; }

  [Required]
  [Range(0, 1000, ErrorMessage = "O abrigo deve conter de 0 ou até 1000 Pets")]
  public int QtdPets {  get; set; }
  
  public int EnderecoId {  get; set; }
  public Endereco Endereco { get;  set; }
  

}