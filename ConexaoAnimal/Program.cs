using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Models.Data;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); var app = builder.Build();


app.MapPost("/endereco/cadastrar", ([FromBody] Endereco endereco, [FromServices] AppDataContext context) =>
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
        return Results.Created("Endereço cadastrado com sucesso!", endereco);
    }
    return Results.BadRequest($"Já existe esse endereço cadastrado no sistema, cujo id é: {enderecoBuscado.EnderecoId}");

});


app.MapGet("/endereco/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Enderecos.Any())
    {
        return Results.Ok(context.Enderecos.ToList());

    }
    return Results.NotFound("Não há nenhum endereço cadastrado!");

});

app.MapPut("/endereco/alterar/{id}", ([FromRoute] string id, [FromBody] Endereco enderecoAlterado, [FromServices] AppDataContext context) =>
{
    Endereco? endereco = context.Enderecos.Find(id);
    if (endereco is null)
    {
        return Results.NotFound("Endereço não encontrado!");
    }

    endereco.EnderecoId = enderecoAlterado.EnderecoId;
    endereco.DataCriacao = enderecoAlterado.DataCriacao;
    endereco.Cep = enderecoAlterado.Cep;
    endereco.Cidade = enderecoAlterado.Cidade;
    endereco.Logradouro = enderecoAlterado.Logradouro;
    endereco.Numero = enderecoAlterado.Numero;
    endereco.Uf = enderecoAlterado.Uf;
    endereco.AbrigoId = enderecoAlterado.AbrigoId;
    endereco.Abrigo = enderecoAlterado.Abrigo;
    
    context.Enderecos.Update(enderecoAlterado);
    context.SaveChanges();
    return Results.Ok("Endereço alterado com sucesso!");
});


app.MapDelete("/endereco/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
{
    Endereco? endereco = context.Enderecos.Find(id);
    if (endereco is null)
    {
        return Results.NotFound("Não existe nenhum endereço com esse ID");
    }
    context.Enderecos.Remove(endereco);
    context.SaveChanges();
    return Results.Ok($"Endereço excluído com sucesso! {endereco}");

});


app.MapGet("/abrigo/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Abrigos.Any())
    {
        return Results.Ok(context.Abrigos.ToList());

    }
    return Results.NotFound("Não há nenhum abrigo cadastrado!");

});


app.MapPost("/abrigo/cadastrar", ([FromBody] Abrigo abrigo, [FromServices] AppDataContext context) =>
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
        return Results.Created("Endereço cadastrado com sucesso!", abrigo);
    }
    return Results.BadRequest($"Já existe um abrigo cadastrado no sistema com este nome, cujo id é: {abrigoBuscado.AbrigoId}");

});

app.MapDelete("/abrigo/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
{
    Abrigo? abrigo = context.Abrigos.Find(id);
    if (abrigo is null)
    {
        return Results.NotFound("Não existe nenhum abrigo com esse ID");
    }
    context.Abrigos.Remove(abrigo);
    context.SaveChanges();
    return Results.Ok($"Abrigo excluído com sucesso! {abrigo}");

});

app.MapPut("/abrigo/alterar/{id}", ([FromRoute] string id, [FromBody] Abrigo abrigoAlterado, [FromServices] AppDataContext context) =>
{
    Abrigo? abrigo = context.Abrigos.Find(id);
    if (abrigo is null)
    {
        return Results.NotFound("Abrigo não encontrado!");
    }

    abrigo.AbrigoId = abrigoAlterado.AbrigoId;
    abrigo.DataCriacao = abrigoAlterado.DataCriacao;
    abrigo.Nome = abrigoAlterado.Nome;
    abrigo.QtdPets = abrigoAlterado.QtdPets;
    abrigo.EnderecoId = abrigoAlterado.EnderecoId;
    abrigo.Endereco = abrigoAlterado.Endereco;
    abrigo.Pets = abrigoAlterado.Pets;
    abrigo.Adocoes = abrigoAlterado.Adocoes;
    
    context.Abrigos.Update(abrigoAlterado);
    context.SaveChanges();
    return Results.Ok("Abrigo alterado com sucesso!");
});



app.Run();
