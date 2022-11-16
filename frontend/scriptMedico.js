var url = 'http://localhost:3000/'

//FALTA AS VALIDAÇÕES
function cadastrar()
{
    let body = 
    {
        'nome': document.getElementById('nome-completo').value,
        'certificadoCRM': document.getElementById('crm').value,
        'areaDeAtuacao': document.getElementById('areaAtuacao').value,
        'email': document.getElementById('emailM').value,
        'telefone': document.getElementById('telefoneM').value
    };

    //configuracao e realizacao do POST no endpoint "medicos"
	fetch(url + "medicos/cadastrar",
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
		alert('Não foi possível efetuar o Cadastro! :(')
	})
}

function listar()
{
	fetch(url + 'medicos')
	.then(response => response.json())
	.then((medicos) =>
	{
		console.log('teste de medicos', medicos)
		//pega div que vai conter a lista de medicos
		let listaMedicos = document.getElementById('lista-medicos')

		//limpa div
		while(listaMedicos.firstChild)
		{
			listaMedicos.removeChild(listaMedicos.firstChild)
		}

		//preenche div com medicos recebidos do GET
		for(let medico of medicos)
		{
			//cria div para as informacoes de um medico
			let divMedico = document.createElement('div')
			divMedico.setAttribute('class', 'form')

			//pega o nome do medico
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = medico.nome
			divMedico.appendChild(divNome)

			//pega o CRM do medico
			let divCRM = document.createElement('input')
			divCRM.placeholder = 'CRM'
			divCRM.value = medico.certificadoCRM
			divMedico.appendChild(divCRM)

			//pega a área de atuação do medico
			let divAtuacao = document.createElement('input')
			divAtuacao.placeholder = 'Área de atuação'
			divAtuacao.value = medico.areaDeAtuacao
			divMedico.appendChild(divAtuacao)

			//pega o email do medico
			let divEmail = document.createElement('input')
			divEmail.placeholder = 'Email'
			divEmail.value = medico.email
			divMedico.appendChild(divEmail)

			//pega o telefone do medico
			let divTelefone = document.createElement('input')
			divTelefone.placeholder = 'Telefone'
			divTelefone.value = medico.telefone
			divMedico.appendChild(divTelefone)

			//cria o botao para remover o medico
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(medico.id)
			btnRemover.style.marginRight = '5px'

			//cria o botao para atualizar o medico
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(medico.id, divNome, divCRM, divAtuacao, divEmail, divTelefone)
			btnAtualizar.style.marginLeft = '5px'

			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divMedico.appendChild(divBotoes)

			//insere a div do usuario na div com a lista de usuarios
			listaMedicos.appendChild(divMedico)
		}
	})
}

//atualiza um medico
function atualizar(id, divNome, divCRM, divAtuacao, divEmail, divTelefone)
{
	let body =
	{
		'nome': divNome.value,
		'certificadoCRM': divCRM.value,
		'areaDeAtuacao': divAtuacao.value,
		'email': divEmail.value,
		'telefone': divTelefone.value
	}

	console.log(body)
	
	fetch(url + "medicos/" + id,
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
			//throw new Error(text)
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Médico Atualizado')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o Médico')
	})
}

//remove um medico
function remover(id)
{
	fetch(url + 'medicos/excluir/' + id,
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
		alert('Médico Removido com Sucesso')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o Médico')
	})
}