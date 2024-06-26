﻿using System.ComponentModel.DataAnnotations;
using API.Models.Enums;

namespace API.Models;

public class Pet
{
    [Required]
    [Key]
    public int PetId { get; set; } 

    [Required(ErrorMessage = "Campo Nome deve ser preenchido")]
    [StringLength(100, ErrorMessage = "Nome não deve exceder 100 caracteres")]
    public string? Nome { get; set; }
    [Required]
    [Range(1, 100, ErrorMessage = "Pet deve ter no mínimo 1 mês ou ano e no máximo 100 anos.")]
    public int Idade { get; set; }
    [Required]
    [RegularExpression(@"^(meses|anos)$", ErrorMessage = "Por favor, insira um valor válido. Ex: 'meses' ou 'anos'.")]
    public UnidadeTempo UnidadeTempo { get; set; }
    [Required]
    [RegularExpression("[P|M|G]", ErrorMessage = "Por favor, insira um valor válido. Ex: P ou M ou G")]
    public Porte Porte { get; set; }
    [Required]
    [StringLength(25, ErrorMessage = "Pet deve ter uma descrição simples de até 25 caracteres.")]
    public string? Descricao { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    public int AbrigoId { get; set; }
    public Abrigo Abrigo { get; set; } 

    public Adocao Adocao { get; set; } 


}
