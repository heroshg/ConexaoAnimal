using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Models;
using API.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AcessoTotal",
            builder => builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
    }
    );
var app = builder.Build();



app.MapPost("/enderecos/cadastrar", ([FromBody] Endereco endereco, [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(endereco, new ValidationContext(endereco), erros, true))
    {
        return Results.BadRequest(erros);
    }
    Endereco? enderecoBuscado = context.Enderecos.FirstOrDefault(e => e.Logradouro.ToUpper().Trim() == endereco.Logradouro.ToUpper().Trim() && e.Numero == endereco.Numero);
    if (enderecoBuscado is null)
    {
        context.Enderecos.Add(endereco);
        context.SaveChanges();
        return Results.Created("Endereco cadastrado com sucesso!", endereco);
    }
    return Results.BadRequest($"Já existe esse endereco cadastrado no sistema, cujo id é: {enderecoBuscado.EnderecoId}");

});


app.MapGet("/abrigos/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Abrigos.Any())
    {
        return Results.Ok(context.Abrigos.Include(x => x.Endereco).Include(x => x.Pets).Include(x => x.Adocoes)
            .ToList());

    }
    return Results.NotFound("Não há nenhum abrigo cadastrado!");

});




app.MapGet("/abrigos/buscar-por-cidade/{cidade}", ([FromRoute] string cidade, [FromServices] AppDataContext context) =>
{
    List<Abrigo> abrigos = context.Abrigos.Where(a => a.Endereco.Cidade.ToUpper().Trim() == cidade.ToUpper().Trim())
    .Include(x => x.Endereco).Include(x => x.Pets).Include(x => x.Adocoes).ToList();
    if (abrigos != null)
    {
        return Results.Ok(abrigos);
    }
    return Results.NotFound("Não há nenhum abrigo nessa cidade");

});


app.MapPost("/abrigos/cadastrar", ([FromBody] Abrigo abrigo, [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(abrigo, new ValidationContext(abrigo), erros, true))
    {
        return Results.BadRequest(erros);
    }
    Abrigo? abrigoBuscado = context.Abrigos.FirstOrDefault(a => a.Nome.ToUpper().Trim() == abrigo.Nome.ToUpper().Trim());
    if (abrigoBuscado is null)
    {
        context.Abrigos.Add(abrigo);
        context.SaveChanges();
        return Results.Created("Abrigo cadastrado com sucesso!", abrigo);
    }
    return Results.BadRequest($"Já existe um abrigo cadastrado no sistema com este nome, cujo id é: {abrigoBuscado.AbrigoId}");

});


app.MapDelete("/abrigos/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
{
    Abrigo? abrigo = context.Abrigos.Find(id);
    if (abrigo is null)
    {
        return Results.NotFound("Não existe nenhum abrigo com esse ID");
    }
    context.Abrigos.Remove(abrigo);
    context.SaveChanges();
    return Results.Ok("Abrigo excluído com sucesso!");

});


#region pet CRUD
app.MapPost("/pets/cadastrar", (Pet pet, [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(pet, new ValidationContext(pet), erros, true))
    {
        return Results.BadRequest(erros);
    }
    Abrigo abrigo = context.Abrigos.FirstOrDefault(x => x.AbrigoId == pet.AbrigoId);

    if (abrigo is null)
    {
        return Results.NotFound("Não existe um abrigo com esse ID");
    } 

    Pet? petBuscado = context.Pets.FirstOrDefault(p => p.PetId == pet.PetId);
    if (petBuscado is null)
    {
        context.Pets.Add(pet);
        context.SaveChanges();
        return Results.Created("Pet cadastrado com sucesso!", pet);
    }
    return Results.BadRequest("Já existe um pet cadastrado no sistema com este id.");
});


app.MapGet("/pets/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Pets.Any())
    {
        return Results.Ok(context.Pets.Include(a => a.Abrigo).ToList()) ;

    }
    return Results.NotFound("Não há nenhum pet cadastrado!");
});


app.MapPut("/pets/alterar/{id}", ([FromRoute] int id, [FromBody] Pet petAlterado, [FromServices] AppDataContext context) =>
{
    if (id != petAlterado.PetId)
    {
        return Results.Ok("Por favor o id do pet alterado deve ser o mesmo passado por parâmetro");
    }
    Pet? pet = context.Pets.Find(id);
    if (pet is null)
    {
        return Results.NotFound("Pet não encontrado!");
    }

    pet.PetId = petAlterado.PetId;
    pet.Nome = petAlterado.Nome;
    pet.Idade = petAlterado.Idade;
    pet.UnidadeTempo = petAlterado.UnidadeTempo;
    pet.Porte = petAlterado.Porte;
    pet.Descricao = petAlterado.Descricao;
    pet.CriadoEm = petAlterado.CriadoEm;


    context.Pets.Update(pet);
    context.SaveChanges();
    return Results.Ok("Pet alterado com sucesso!");
});


app.MapDelete("/pets/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
{
    Pet? pet = context.Pets.Find(id);
    if (pet is null)
    {
        return Results.NotFound("Não existe nenhum pet com esse ID");
    }
    context.Pets.Remove(pet);
    context.SaveChanges();
    return Results.Ok("Pet excluído com sucesso!");

});

#endregion

app.MapGet("/pets/buscar-por-abrigo/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext context) =>
{
    Abrigo? abrigo = context.Abrigos.Include(x => x.Pets)
    .FirstOrDefault(a => a.Nome.ToUpper().Trim() == nome.ToUpper().Trim());
    if (abrigo is null)
    {
        return Results.NotFound("Nenhum pet encontrado com os critérios de busca fornecidos.");
    }
    return Results.Ok(abrigo);


});


app.MapPost("/adocoes/cadastrar", (Adocao adocao, [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(adocao, new ValidationContext(adocao), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Abrigo? abrigo = context.Abrigos.FirstOrDefault(x => x.AbrigoId == adocao.AbrigoId);

    if (abrigo is null)
    {
        return Results.NotFound("Não existe um abrigo com esse ID");
    }    

    Pet? pet = context.Pets.FirstOrDefault(x => x.PetId == adocao.PetId);

    if (pet is null)
    {
        return Results.NotFound("Não existe nenhum pet com esse ID");
    }

    Adocao? petAdotado = context.Adocoes.FirstOrDefault(x => x.PetId == adocao.PetId);

    if (petAdotado is not null){
      return Results.BadRequest("Esse Pet já foi adotado!");  
    }  

    Adocao? adocaoBuscada = context.Adocoes.FirstOrDefault(a => a.Id == adocao.Id);
    if (adocaoBuscada is null)
    {
        context.Adocoes.Add(adocao);
        context.SaveChanges();
        return Results.Ok("Adocao cadastrada com sucesso!");
    }
    return Results.BadRequest("Adocao já cadastrada!");
});


app.MapGet("/adocoes/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Adocoes.Any())
    {
        return Results.Ok(context.Adocoes.ToList());

    }
    return Results.NotFound("Não há nenhuma adocao cadastrada!");
});

app.UseCors("AcessoTotal");
app.Run();
