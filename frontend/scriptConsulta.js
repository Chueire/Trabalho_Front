var url = 'http://localhost:3000/'

function cadastrarConsultas()
{
    let body = 
    {
        'crmMedico': document.getElementById('crm-medico').value,
        'cpfPaciente': document.getElementById('cpf-paciente').value,
        'data': document.getElementById('data').value,
        'horario': document.getElementById('horario').value,
        'tipo': document.getElementById('tipo').value,
    };

    //configuracao e realizacao do POST no endpoint "pacientes"
	fetch(url + "consultas/cadastrar",
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

function listar()
{
	//da um GET no endpoint "consultas"
	fetch(url + 'consultas')
	.then(response => response.json())
	.then((consultas) =>
	{
        //pega div que vai conter a lista de consultas
		let listaConsultas = document.getElementById('lista-consultas')

        //limpa div
		while(listaConsultas.firstChild)
		{
			listaConsultas.removeChild(listaConsultas.firstChild)
		}

        //preenche div com consultas recebidos do GET
		for(let consulta of consultas)
		{
            console.log(consulta)
            //cria div para as informacoes de um paciente
			let divConsulta = document.createElement('div')
			divConsulta.setAttribute('class', 'form')

            //pega o nome do medico
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo do Médico'
			divNome.value = consulta.crmMedico
			divConsulta.appendChild(divNome)

            //pega o nome do paciente
			let divNomeP = document.createElement('input')
			divNomeP.placeholder = 'Nome Completo do Paciente'
			divNomeP.value = consulta.cpfPaciente
			divConsulta.appendChild(divNomeP)

            //pega a data da consulta
            let divData = document.createElement('input')
            divData.placeholder = 'Data'
            divData.value = consulta.data
            divConsulta.appendChild(divData)

            //pega o horario da consulta
            let divHora = document.createElement('input')
            divHora.placeholder = 'Informe a horario'
            divHora.value = consulta.horario
            divConsulta.appendChild(divHora)

            //pega a especialidade do medico
            let divTipo = document.createElement('input')
            divTipo.placeholder = 'Informe a Especialidade'
            divTipo.value = consulta.tipo
            divConsulta.appendChild(divTipo)

            //cria o botao para remover uma consulta
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(consulta.id)
			btnRemover.style.marginRight = '5px'

			//cria o botao para atualizar uma consulta
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(consulta.id, divNome, divNomeP, divData, divHora, divTipo)
			btnAtualizar.style.marginLeft = '5px'

			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divConsulta.appendChild(divBotoes)

			//insere a div do usuario na div com a lista de consultas
			listaConsultas.appendChild(divConsulta)
        }

    })
}


//atualiza uma consulta
function atualizar(id, divNome, divNomeP, divData, divHora, divTipo)
{
	let body =
	{
		'crmMedico': divNome.value,
		'cpfPaciente': divNomeP.value,
		'horario': divHora.value,
        'data': divData.value,
        'tipo': divTipo.value
	}
	
	fetch(url + "consultas/" + id,
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
		alert('Consulta Atualizada')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar a Consulta')
	})
}

//remove uma consulta
function remover(id)
{
	fetch(url + 'consultas/excluir/' + id,
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
		alert('Consulta Removida com Sucesso')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a Consulta')
	})
}