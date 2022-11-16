//RODAR ESSE COMANDO SEMPRE QUE MEXER NAS CLASSES RELATIVAS A BASE DE DADOS
//dotnet ef database update
//Mateus de Azevedo Chueire - 12735507

using Microsoft.EntityFrameworkCore;

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Trabalho
{
	class Medico
    {
        public int id { get; set; }
    	public string? certificadoCRM { get; set; }
		public string? nome { get; set; }
    	public string? areaDeAtuacao { get; set; }
    	public string? email { get; set; }
    	public string? telefone { get; set; }
    }
	
    class Paciente
    {
        public int id { get; set; }
    	public string? cpf { get; set; }
		public string? nome { get; set; }
    	public string? idade { get; set; }
    	public string? sexo { get; set; }
    	public string? telefone { get; set; }
    	public string? email { get; set; }
    }

    class Consulta
    {
        public int id { get; set; }
    	public string? crmMedico { get; set; }
		public string? cpfPaciente { get; set; }
    	public string? data { get; set; }
    	public string? horario { get; set; }
    	public string? tipo { get; set; }
    }
	
    // Criando o método do DB de pacientes
	class BaseClinica : DbContext
	{
		public BaseClinica(DbContextOptions<BaseClinica> options) : base(options)
		{
		}
		
		public DbSet<Medico> Medicos { get; set; } = null!;
        public DbSet<Paciente> Pacientes { get; set; } = null!;
        public DbSet<Consulta> Consultas { get; set; } = null!;

	}

	class Program
	{
		static void Main(string[] args)
		{
			// cria o construtor da webAPI mínima
            var builder = WebApplication.CreateBuilder(args);
			
            // Conecta e configura a API ao construtor da Base de médicos, caso não encontre a base, cria ela.
			var connectionStringMedicos = builder.Configuration.GetConnectionString("Clinica") ?? "Data Source=Clinica.db";
			builder.Services.AddSqlite<BaseClinica>(connectionStringMedicos);

            builder.Services.AddCors();
            // Constroi a webAPI através do construtor criado anteriormente
			var app = builder.Build();

            app.UseCors(
                        options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                       );

			//AREA DE MANIPULAÇÃO DOS DADOS DOS MÉDICOS-----------------------------------------------------------------------------------------------
            
            //Listar todos os médicos
            app.MapGet("/medicos", (BaseClinica baseClinica) => {
                return baseClinica.Medicos.ToList();
            });

            //Listar apenas o médico com ID especificado
            app.MapGet("/medicos/buscar/id/{id}", (BaseClinica baseClinica, int id) => {
                return baseClinica.Medicos.Find(id);
            });
			
			//mapeia a funcao para o path "medico/{email}", onde {email} eh o valor que sera enviado para o argumento "email" da funcao "getUsuario"
			app.MapGet("/medicos/buscar/email/{email}", (BaseClinica baseClinica, string email) => {
                var medico = baseClinica.Medicos
                    .Where(b => b.email == email)
                    .FirstOrDefault();
                
                return medico;
			});

            //Cadastrar médico
            app.MapPost("/medicos/cadastrar", (BaseClinica baseClinica, Medico medico) => {
                baseClinica.Medicos.Add(medico);
                baseClinica.SaveChanges();
                return "Médico cadastrado!";
            });

            //atualiza medico (apenas com os dados enviados no json)
			app.MapPut("/medicos/{id}", (BaseClinica baseClinica, Medico atualizado, int id) =>
			{
				var medico = baseClinica.Medicos.Find(id);
				if(medico == null)
				{
					return Results.NotFound();
				}

				if(null != atualizado.certificadoCRM)         medico.certificadoCRM         = atualizado.certificadoCRM;
				if(null != atualizado.nome)                   medico.nome                   = atualizado.nome;
				if(null != atualizado.areaDeAtuacao)          medico.areaDeAtuacao          = atualizado.areaDeAtuacao;
				if(null != atualizado.email)                  medico.email                  = atualizado.email;
				if(null != atualizado.telefone)               medico.telefone               = atualizado.telefone;

				baseClinica.SaveChanges();
				return Results.Ok();
			});

            //Atualizar todos os atributos do médico
            app.MapPost("/medicos/atualizar/{id}", (BaseClinica baseClinica, Medico medicoAtualizado, int id) => {
                var medicoTemp = baseClinica.Medicos.Find(id);
                int idDefault = medicoTemp.id;

                medicoTemp = medicoAtualizado;
                medicoTemp.id = idDefault;

                baseClinica.SaveChanges();
                return "Cadastro médico atualizado!";
            });
            
            //Atualizar apenas um atributo - médico
            app.MapPost("/medicos/{id}/atualizar/{tipo}", (BaseClinica baseClinica, Medico medicoAtualizado, int id, string tipo) => {
                var medicoTemp = baseClinica.Medicos.Find(id);
                
                switch(tipo){
                    case "certificadoCRM":
                        medicoTemp.certificadoCRM = medicoAtualizado.certificadoCRM;  
                        break;
                    case "nome":
                        medicoTemp.nome = medicoAtualizado.nome;
                        break;
                    case "email":
                        medicoTemp.email = medicoAtualizado.email;
                        break;
                    case "telefone":
                        medicoTemp.telefone = medicoAtualizado.telefone;
                        break;
                    case "areaDeAtuacao":
                        medicoTemp.areaDeAtuacao = medicoAtualizado.areaDeAtuacao;
                        break;
                }                
                baseClinica.SaveChanges();
                return "Cadastro médico atualizado!";
            });

            //Excluir médico
            app.MapDelete("/medicos/excluir/{id}", (BaseClinica baseClinica, int id) => {
                var medico = baseClinica.Medicos.Find(id);
                baseClinica.Remove(medico);
                baseClinica.SaveChanges();
                return "Médico removido!";
            });


			//AREA DE MANIPULAÇÃO DOS DADOS DOS PACIENTES-----------------------------------------------------------------------------------------------

            //Listar todos os pacientes
            app.MapGet("/pacientes", (BaseClinica baseClinica) => {
                return baseClinica.Pacientes.ToList();
            });

            //Listar apenas o paciente com ID especificado
            app.MapGet("/pacientes/buscar/id/{id}", (BaseClinica baseClinica, int id) => {
                return baseClinica.Pacientes.Find(id);
            });

			//mapeia a funcao para o path "medico/{email}", onde {email} eh o valor que sera enviado para o argumento "email" da funcao "getUsuario"
            app.MapGet("/pacientes/buscar/email/{email}", (BaseClinica baseClinica, string email) => {
                var paciente = baseClinica.Pacientes
                    .Where(b => b.email == email)
                    .FirstOrDefault();
                
                return paciente;
			});

            //Cadastrar paciente
            app.MapPost("/pacientes/cadastrar", (BaseClinica baseClinica, Paciente paciente) => {
                baseClinica.Pacientes.Add(paciente);
                baseClinica.SaveChanges();
                return "Paciente cadastrado!";
            });

            //atualiza paciente (apenas com os dados enviados no json)
			app.MapPut("/pacientes/{id}", (BaseClinica baseClinica, Paciente atualizado, int id) =>
			{
				var paciente = baseClinica.Pacientes.Find(id);
				if(paciente == null)
				{
					return Results.NotFound();
				}

				if(null != atualizado.cpf)          paciente.cpf        = atualizado.cpf;
				if(null != atualizado.nome)         paciente.nome       = atualizado.nome;
				if(null != atualizado.idade)        paciente.idade      = atualizado.idade;
				if(null != atualizado.email)        paciente.email      = atualizado.email;
				if(null != atualizado.telefone)     paciente.telefone   = atualizado.telefone;
                
				baseClinica.SaveChanges();
				return Results.Ok();
			});

            //Atualizar todos os atributos do paciente
            app.MapPost("/pacientes/atualizar/{id}", (BaseClinica baseClinica, Paciente pacienteAtualizado, int id) => {
                var pacienteTemp = baseClinica.Pacientes.Find(id);
                int idDefault = pacienteTemp.id;

                pacienteTemp = pacienteAtualizado;
                pacienteTemp.id = idDefault;

                baseClinica.SaveChanges();
                return "Cadastro de paciente atualizado!";
            });

            //Atualizar atributo específico do paciente
            app.MapPost("/pacientes/{id}/atualizar/{tipo}", (BaseClinica baseClinica, Paciente pacienteAtualizado, int id, string tipo) => {
                var pacienteTemp = baseClinica.Pacientes.Find(id);
                
                switch(tipo){
                    case "cpf":
                        pacienteTemp.cpf = pacienteAtualizado.cpf;  
                        break;
                    case "nome":
                        pacienteTemp.nome = pacienteAtualizado.nome;
                        break;
                    case "email":
                        pacienteTemp.email = pacienteAtualizado.email;
                        break;
                    case "telefone":
                        pacienteTemp.telefone = pacienteAtualizado.telefone;
                        break;
                    case "idade":
                        pacienteTemp.idade = pacienteAtualizado.idade;
                        break;
                    case "sexo":
                        pacienteTemp.sexo = pacienteAtualizado.sexo;
                        break;
                }                
                baseClinica.SaveChanges();
                return "Cadastro de paciente atualizado!";
            });

            //Excluir paciente
            app.MapDelete("/pacientes/excluir/{id}", (BaseClinica baseClinica, int id) => {
                var paciente = baseClinica.Pacientes.Find(id);
                baseClinica.Remove(paciente);
                baseClinica.SaveChanges();
                return "Paciente removido!";
            });


			//AREA DE MANIPULAÇÃO DOS DADOS DAS CONSULTAS-----------------------------------------------------------------------------------------------
            //Listar todas as consultas
            app.MapGet("/consultas", (BaseClinica baseClinica) => {
                return baseClinica.Consultas.ToList();
            });

            //Listar apenas a consulta com ID especificado
            app.MapGet("/consultas/{id}/listar", (BaseClinica baseClinica, int id) => {
                return baseClinica.Consultas.Find(id);
            });

            //Cadastrar consulta
            app.MapPost("/consultas/cadastrar", (BaseClinica baseClinica, Consulta consulta) => {
                baseClinica.Consultas.Add(consulta);
                baseClinica.SaveChanges();
                return "Consulta cadastrada!";
            });

            // Atualizar todos os atributos da consulta
            app.MapPost("/conultas/{id}/atualizar", (BaseClinica baseClinica, Consulta consultaAtualizada, int id) => {
                var consultaTemp = baseClinica.Consultas.Find(id);
                int idDefault = consultaTemp.id;

                consultaTemp = consultaAtualizada;
                consultaTemp.id = idDefault;

                baseClinica.SaveChanges();
                return "Cadastro de consulta atualizado!";
            });

            //atualiza paciente (apenas com os dados enviados no json)
			app.MapPut("/consultas/{id}", (BaseClinica baseClinica, Consulta atualizado, int id) =>
			{
				var consulta = baseClinica.Consultas.Find(id);
				if(consulta == null)
				{
					return Results.NotFound();
				}

				if(null != atualizado.crmMedico)        consulta.crmMedico          = atualizado.crmMedico;
				if(null != atualizado.cpfPaciente)      consulta.cpfPaciente        = atualizado.cpfPaciente;
				if(null != atualizado.data)             consulta.data               = atualizado.data;
				if(null != atualizado.horario)          consulta.horario            = atualizado.horario;
				if(null != atualizado.tipo)             consulta.tipo               = atualizado.tipo;
                
				baseClinica.SaveChanges();
				return Results.Ok();
			});

            //Atualizar apenas um atributo - médico
            app.MapPost("/consultas/{id}/atualizar/{tipo}", (BaseClinica baseClinica, Consulta consultaAtualizada, int id, string tipo) => {
                var consultaTemp = baseClinica.Consultas.Find(id);
                
                switch(tipo){
                    case "crmMedico":
                        consultaTemp.crmMedico = consultaAtualizada.crmMedico;  
                        break;
                    case "cpfPaciente":
                        consultaTemp.cpfPaciente = consultaAtualizada.cpfPaciente;
                        break;
                    case "data":
                        consultaTemp.data = consultaAtualizada.data;
                        break;
                    case "horario":
                        consultaTemp.horario = consultaAtualizada.horario;
                        break;
                    case "tipo":
                        consultaTemp.tipo = consultaAtualizada.tipo;
                        break;
                }                
                baseClinica.SaveChanges();
                return "Cadastro de consulta atualizado!";
            });

            //Deleta uma consulta
            app.MapDelete("/consultas/excluir/{id}", (BaseClinica baseClinica, int id) => {
                var consulta = baseClinica.Consultas.Find(id);
                baseClinica.Remove(consulta);
                baseClinica.SaveChanges();
                return "Consulta removido!";
            });
            //Executa a aplicação, após toda a construção ser realizada			
			//roda aplicacao na porta 3000 (arbitraria)
			app.Run("http://localhost:3000");
		}
	}
}