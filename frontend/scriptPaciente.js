var url = 'http://localhost:3000/'

//FALTA AS VALIDAÇÕES
function cadastrarPaciente()
{
    let body = 
    {
        'nome': document.getElementById('nome-paciente').value,
        'cpf': document.getElementById('cpfp').value,
        'idade': document.getElementById('idadep').value,
        'sexo': document.getElementById('sexop').value,
        'email': document.getElementById('validaEmailP').value,
        'telefone': document.getElementById('validaTelefoneP').value
    };

    //configuracao e realizacao do POST no endpoint "pacientes"
	fetch(url + "pacientes/cadastrar",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})

    //checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})

	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
    
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function validaNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		//divNome.style.border = 0
		divNome.classList.remove('erro-input')
		return true
	}
	else
	{
		//divNome.style.border = 'solid 1px red'
		if(!divNome.classList.contains('erro-input'))
		{
			divNome.classList.add('erro-input')
		}
		return false
	}
}

function validaCPF(id)
{
	let divCPF = document.getElementById(id)
	{
		if(divCPF.value.length <= 11)
		{
			divCPF.classList.remove('erro-input')
			return true
		}

		else
		{
			if(!divCPF.classList.contains('erro-input'))
			{
				divCPF.classList.add('erro-input')
			}
		}
	}
}

function validaIdade(id)
{
	let divIdade = document.getElementById(id)
	{
		if(divIdade.value.length <= 3)
		{
			divIdade.classList.remove('erro-input')
			return true
		}

		else
		{
			if(!divIdade.classList.contains('erro-input'))
			{
				divIdade.classList.add('erro-input')
			}
		}
	}
}

// function validaEmailP()
// {
// 	let divEmailP = document.getElementById(id)
// 	{
// 		var a = divEmailP.value.split(' ')

// 		for(element in a)
// 		{
// 			if(element === '@')
// 			{
// 				console.log(a)
// 				var c = c + 1
// 			}
// 		}
// 		console.log(c)
// 		if(c === 1)
// 		{
// 			divEmailP.classList.remove('erro-input')
// 			return true
// 		}
// 		else
// 		{
// 			if(!divIdade.classList.contains('erro-input'))
// 			{
// 				divIdade.classList.add('erro-input')
// 			}
// 		}
// 	}
// }

function listar()
{
	//da um GET no endpoint "pacientes"
	fetch(url + 'pacientes')
	.then(response => response.json())
	.then((pacientes) =>
	{
		//pega div que vai conter a lista de pacientes
		let listaPacientes = document.getElementById('lista-pacientes')

		//limpa div
		while(listaPacientes.firstChild)
		{
			listaPacientes.removeChild(listaPacientes.firstChild)
		}

		//preenche div com pacientes recebidos do GET
		for(let paciente of pacientes)
		{
			//cria div para as informacoes de um paciente
			let divPaciente = document.createElement('div')
			divPaciente.setAttribute('class', 'form')

			//pega o nome do paciente
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = paciente.nome
			divPaciente.appendChild(divNome)

			//pega o CPF do paciente
			let divCPF = document.createElement('input')
			divCPF.placeholder = 'CPF'
			divCPF.value = paciente.cpf
			divPaciente.appendChild(divCPF)

			//pega a idade do paciente
			let divIdade = document.createElement('input')
			divIdade.placeholder = 'Área de atuação'
			divIdade.value = paciente.idade
			divPaciente.appendChild(divIdade)

			//pega o email do paciente
			let divEmail = document.createElement('input')
			divEmail.placeholder = 'Email'
			divEmail.value = paciente.email
			divPaciente.appendChild(divEmail)

			//pega o telefone do paciente
			let divTelefone = document.createElement('input')
			divTelefone.placeholder = 'Telefone'
			divTelefone.value = paciente.telefone
			divPaciente.appendChild(divTelefone)

			//cria o botao para remover o paciente
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(paciente.id)
			btnRemover.style.marginRight = '5px'

			//cria o botao para atualizar o medico
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(paciente.id, divNome, divCPF, divIdade, divEmail, divTelefone)
			btnAtualizar.style.marginLeft = '5px'

			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divPaciente.appendChild(divBotoes)

			//insere a div do usuario na div com a lista de consultas
			listaPacientes.appendChild(divPaciente)
		}

	})
}

function atualizar(id, divNome, divCPF, divIdade, divEmail, divTelefone)
{
	let body =
	{
		'Nome': divNome.value,
		'CPF': divCPF.value,
		'Idade': divIdade.value,
		'Email': divEmail.value,
		'Telefone': divTelefone.value
	}
	
	fetch(url + "pacientes/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then(async (response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			const text = await response.text()
			throw new Error(text)
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Paciente Cadastrado')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o Paciente')
	})
}

function remover(id)
{
	fetch(url + 'pacientes/excluir/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then(async (response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			const text = await response.text()
			throw new Error(text)
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Paciente Removido com Sucesso')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o Paciente')
	})
}


