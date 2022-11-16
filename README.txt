.. TRABALHO 2 - DESENVOLVIMENTO DE SOFTWARE VISUAL ..

> INPUTS DO FRONT:

    > MÉDICOS:      - necessário no mínimo nome e sobrenome
                    - CRM de 6 dígitos
    
    > PACIENTES:    - necessário no mínimo nome e sobrenome
                    - CPF de 11 digitos, sem o "." e "-"
                    - idade < 3 dígitos


> BANCO DE DADOS:

    > Nos testes da aplicação todo o funcionamento de incluir, excluir, atualizar e cadastrar (CRUD) de todas
    as classes (Médicos - Pacientes - Consultas) funcionaram sem nenhum problema. 

> MUDANÇA NO BACK:

    > Foi incluido a seguinte linha de código, afim de dar permissões ao FRONT fazer as requisições ao BACK:

    app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

    > Necessário alteração caso não queira mais permitir o acesso.

> CONSIDERAÇÕES:

    > Tive algumas dificuldades no trabalho, principalmente por nunca ter tido contato com técnologias como a
    WEB API e CSS + JS.
    > Apesar de muito cru, acredito que a interface tenha ficado aceitável para quem nunca tinha trabalhado com
    designer de páginas.
    > Caso o Sr faça como no primeiro brimestre, de permitir uma devolutiva com algumas últimas correções, irei
    fazer o melhor para melhorar essas questões.
    > Acredtio que o Sr vai receber trabalhos MUITO melhores e com designer super bem feitos, mas gostaria que o 
    Sr levasse em consideração, por favor =], que eu sou um aluno de engenharia que só mexeu com python na vida 
    toda xD (e que estava f.. fazendo um TCC hahaha)
    > Obrigado pelas aulas professor, aprendi muitas coisas interessantes nesse semestre e que me fizeram dispertar
    o interesse por entrar nessa área.