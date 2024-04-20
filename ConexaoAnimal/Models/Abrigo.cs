using System.ComponentModel.DataAnnotations;

public class Abrigo {

  [Required]
  public int AbrigoId {  get; set; }

  [Required]
  public string? Nome {  get; set; }
  
  [Required]
  public int QtdPets {  get; set; }
  
  public int EnderecoId {  get; set; }
  public Endereco Endereco { get;  set; }
  

}