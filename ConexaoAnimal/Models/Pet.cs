using System.ComponentModel.DataAnnotations;
using API.Models.Enums;

namespace API.Models;

public class Pet
{
    [Required]
    public int PetId { get; set; }
    [Required(ErrorMessage = "Campo Nome deve ser preenchido")]
    [StringLength(100, ErrorMessage = "Nome não deve exceder 100 caracteres")]
    public string? Nome { get; set; }
    [Required]
    [Range(1, 100, ErrorMessage = "Pet deve ter no mínimo 1 mês ou ano e no máximo 100 anos.")]
    public int Idade { get; set; }
    [Required]
    [RegularExpression(@"^\d+\s+(meses|anos)$", ErrorMessage = "Por favor, insira um valor válido. Ex: 'meses' ou 'anos'.")]
    public UnidadeTempo UnidadeTempo { get; set; }
    [Required]
    public Porte Porte { get; set; }
    [Required]
    [StringLength(20, ErrorMessage = "Pet deve ter uma descrição simples de até 20 caracteres.")]
    public string? Descricao { get; set; }
    public int AbrigoId { get; set; }
    public Abrigo Abrigo { get; set; } = null!;




}
