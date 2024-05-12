﻿// <auto-generated />
using System;
using API.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDataContext))]
    partial class AppDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("API.Models.Adocao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AbrigoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PetId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("RealizadaEm")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AbrigoId");

                    b.ToTable("Adocoes");
                });

            modelBuilder.Entity("API.Models.Pet", b =>
                {
                    b.Property<int>("PetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AbrigoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AdocaoId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("TEXT");

                    b.Property<int>("Idade")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int>("Porte")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UnidadeTempo")
                        .HasColumnType("INTEGER");

                    b.HasKey("PetId");

                    b.HasIndex("AbrigoId");

                    b.HasIndex("AdocaoId")
                        .IsUnique();

                    b.ToTable("Pets");
                });

            modelBuilder.Entity("Abrigo", b =>
                {
                    b.Property<int>("AbrigoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("TEXT");

                    b.Property<int>("EnderecoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");

                    b.Property<int>("QtdPets")
                        .HasColumnType("INTEGER");

                    b.HasKey("AbrigoId");

                    b.ToTable("Abrigos");
                });

            modelBuilder.Entity("Endereco", b =>
                {
                    b.Property<int>("EnderecoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AbrigoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cep")
                        .IsRequired()
                        .HasMaxLength(9)
                        .HasColumnType("TEXT");

                    b.Property<string>("Cidade")
                        .IsRequired()
                        .HasMaxLength(35)
                        .HasColumnType("TEXT");

                    b.Property<string>("Complemento")
                        .HasMaxLength(70)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Logradouro")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");

                    b.Property<int>("Numero")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Uf")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("TEXT");

                    b.HasKey("EnderecoId");

                    b.HasIndex("AbrigoId")
                        .IsUnique();

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("API.Models.Adocao", b =>
                {
                    b.HasOne("Abrigo", "Abrigo")
                        .WithMany("Adocoes")
                        .HasForeignKey("AbrigoId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Abrigo");
                });

            modelBuilder.Entity("API.Models.Pet", b =>
                {
                    b.HasOne("Abrigo", "Abrigo")
                        .WithMany("Pets")
                        .HasForeignKey("AbrigoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.Adocao", "Adocao")
                        .WithOne("Pet")
                        .HasForeignKey("API.Models.Pet", "AdocaoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Abrigo");

                    b.Navigation("Adocao");
                });

            modelBuilder.Entity("Endereco", b =>
                {
                    b.HasOne("Abrigo", "Abrigo")
                        .WithOne("Endereco")
                        .HasForeignKey("Endereco", "AbrigoId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Abrigo");
                });

            modelBuilder.Entity("API.Models.Adocao", b =>
                {
                    b.Navigation("Pet");
                });

            modelBuilder.Entity("Abrigo", b =>
                {
                    b.Navigation("Adocoes");

                    b.Navigation("Endereco")
                        .IsRequired();

                    b.Navigation("Pets");
                });
#pragma warning restore 612, 618
        }
    }
}
