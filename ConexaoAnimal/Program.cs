using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Models;
using API.Models.Data;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); var app = builder.Build();


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
        return Results.Created("Endereço cadastrado com sucesso!", endereco);
    }
    return Results.BadRequest($"Já existe esse endereço cadastrado no sistema, cujo id é: {enderecoBuscado.EnderecoId}");

});


app.MapGet("/enderecos/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Enderecos.Any())
    {
        return Results.Ok(context.Enderecos.ToList());

    }
    return Results.NotFound("Não há nenhum endereço cadastrado!");

});

app.MapPut("/enderecos/alterar/{id}", ([FromRoute] string id, [FromBody] Endereco enderecoAlterado, [FromServices] AppDataContext context) =>
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


app.MapDelete("/enderecos/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
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


app.MapGet("/abrigos/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Abrigos.Any())
    {
        return Results.Ok(context.Abrigos.ToList());

    }
    return Results.NotFound("Não há nenhum abrigo cadastrado!");

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
        return Results.Created("Endereço cadastrado com sucesso!", abrigo);
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
    return Results.Ok($"Abrigo excluído com sucesso! {abrigo}");

});

app.MapPut("/abrigos/alterar/{id}", ([FromRoute] string id, [FromBody] Abrigo abrigoAlterado, [FromServices] AppDataContext context) =>
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

#region pet CRUD
app.MapPost("/pets/cadastrar", (Pet pet, [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(pet, new ValidationContext(pet), erros, true))
    {
        return Results.BadRequest(erros);
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
        return Results.Ok(context.Pets.ToList());

    }
    return Results.NotFound("Não há nenhum pet cadastrado!");
});


app.MapPut("/pets/alterar/{id}", ([FromRoute] string id, [FromBody] Pet petAlterado, [FromServices] AppDataContext context) =>
{
    Pet? pet = context.Pets.Find(id);
    if (pet is null)
    {
        return Results.NotFound("Endereço não encontrado!");
    }

    pet.PetId = petAlterado.PetId;
    pet.Nome = petAlterado.Nome;
    pet.Idade = petAlterado.Idade;
    pet.UnidadeTempo = petAlterado.UnidadeTempo;
    pet.Porte = petAlterado.Porte;
    pet.Descricao = petAlterado.Descricao;
    pet.CriadoEm = petAlterado.CriadoEm;


    context.Pets.Update(petAlterado);
    context.SaveChanges();
    return Results.Ok("Pet alterado com sucesso!");
});

app.MapDelete("/pets/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext context) =>
{
    Pet? pet = context.Pets.Find(id);
    if (pet is null)
    {
        return Results.NotFound("Não existe nenhum endereço com esse ID");
    }
    context.Pets.Remove(pet);
    context.SaveChanges();
    return Results.Ok($"Pet excluído com sucesso! {pet}");

});

#endregion

app.MapGet("/pets/buscar-por-abrigo/{nome}/{id?}", ([FromRoute] string nome, [FromRoute] int? id, [FromServices] AppDataContext context) =>
{
    List<Pet?> pets = context.Pets.ToList();

    if (!string.IsNullOrEmpty(nome))
    {
        List<Pet?> listaPets = pets.Where(p => p.Abrigo.Nome.ToUpper().Contains(nome.ToUpper().Trim())).ToList();
        if (listaPets.Count > 0)
        {
            return Results.Ok(listaPets);
        }
        return Results.NotFound("Nenhum pet foi encontrado com esse nome");


    }

    if (id.HasValue)
    {
        Pet? pet = pets.FirstOrDefault(p => p.PetId == id);
        if (pet is null)
        {
            return Results.NotFound("O pet solicitado não foi encontrado.");
        }
        return Results.Ok(pet);
    }

    return Results.NotFound("Nenhum pet encontrado com os critérios de busca fornecidos.");

});

app.MapGet("/pets/buscar-por-cidade/{cidade}", ([FromRoute] string cidade, [FromServices] AppDataContext context) =>
{
    List<Pet?> listaPets = context.Pets.Where(p => p.Abrigo.Endereco.Cidade.ToUpper() == cidade).ToList();
    if (listaPets.Count > 0)
    {
        return Results.Ok(listaPets);
    }
    return Results.NotFound("Nenhum pet foi encontrado nessa cidade");

});






app.Run();
