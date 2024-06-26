# Registro de Testes de Software

| | | | | | | | |
|-|-|-|-|-|-|-|-|
|Caso de Teste|Requisito Associado|Objetivo do Teste|Passos|Critérios de Êxito|Resultado Obtido|Cenários de testes|Imagem de Registro
|CT-01 - Verificar aparecimento da tela de carregamento.| - | Vericar se App esta fazendo o carregamento corretamente da tela Inicial| Instalar APP e Abrir| Visualizar Tela Welcome | Sucesso | Intalar e Abrir APP |  ![likert](/docs/img/Welcome.jpeg) |
|CT-02 - Verificar se página de login está aparecendo conforme esperado.| - | Vericar se App esta carregando tela de Login|Instalar APP e Abrir, depois clicar no botão Acessar da tela Welcome|  Visualizar tela de login  | Sucesso | Instalar APP e Abrir, depois clicar no botão Acessar da tela Welcome |  ![likert](/docs/img/loginteste.jpeg) |
|CT-03 - Verificar se ação de login esta funcionando corretamente .| - | Vericar se App fazendo login corretamente identificando o perfil do usuário| Preencher os campos de Login e senha| Visualizar Home Internal | Sucesso | Acessar com perfis, ADM Escola, responsáveis e Professores | ![likert](/docs/img/homeinternalteste.jpeg)|
|CT-04 - Verificar se permissões concedidas aos usuários estão corretas| - | Vericar se App concede as permissões de acordo com perfil logado| Preencher os campos de Login e senha e acessar APP| Visualizar Ações que correspondam ao perfil do Usuário | Concluindo Desenvolvimento | Acessar com perfis, ADM Escola, responsáveis e Professores  | - |
|CT-05 - Verificar se as mensagens estão sendo enviadas corretamente. | RF-001 | Vericar se App esta relaizando a troca de mensagem de forma correta| Acessar App e disparar mensagem| Disparar uma mensagem e chegar para o destinatário de forma correta |  Concluindo Desenvolvimento | Disparar mensagens com os perfis ADM Escola, responsáveis e Professores | - |
|CT-06 - Verificar se calendário exibe os eventos escolares corretamente | RF-002 | Analisar se o calendário esta direcionando os enventos do calendário de forma correta| Acessar App e criar um evento| Visualizar os registros do Calendário | Concluindo Desenvolvimento | Os enventos serão disparados pelo Adm Escola ou Professores, acessar como Responsável e verificar o calendário | - |
|CT-07 - Verificar se calendário permite a navegação entre os eventos e mêses | RF-002 | Analisar se o calendário esta com direcinamentos corretos| Acessar App e navegar nos mêses e eventos criados|Navegar entre os mêses do calendário | Concluindo Desenvolvimento| Acessar como Responsável e verificar a navegação | - |
|CT-08 - Verificar funcionalidade de adicionar, editar e excluir evento (cenário da escola) | RF-002 | Verificar se o crud do calendário esta funcionando de forma correta| Acessar App e e realizar cadastro, edições e remoções dos dados| Realizar o cadastro, alteração e exclusão de Usuários | Sucesso | Acessar como Adm, ir para Opção Cadastrar usuário e realizar o registro, depois Editar ou Tentar fazer uma exclusão | - |
|CT-09 - Verificar se mural está aparecendo apenas para os professores e responsáveis | RF-003 | Verificar se mural esta sendo exibido corretamente| Acessar App e acessar mural| - | Concluindo Desenvolvimento | Acessar como Professor e Responsável para testar as funcionalidades do mural | - |
|CT-10- Verificar se mural permite navegação entre os alunos da turma (cenário da escola) |  RF-003 | Verificar se mural permite aos professores a localização e registros no mural| Acessar App como professor e acessar mural| - | Concluindo Desenvolvimento | Acessar como professor e abrir mural | - |
|CT-11- Verificar funcionalidade de adicionar, editar e excluir informações do mural (cenário da escola) | RF-003 | Verificar se o crud do Mural esta funcionando de forma correta| Acessar App abrir mural| - | Concluindo Desenvolvimento | Professor poder realizar Adição, remoção e edição dos registros do mural | - |
|CT-12- Verificar se notificação está sendo exibida para os usuários | RF-004 | Verificar se mensagens estão sendo enviadas corretamente| Acessar App disparar mensagens e verificar resultado| - | Concluindo Desenvolvimento | Disparar mensagem para um usuário específico e verificar resultado, todos os perfis podem enviar mensagens | - |
|CT-13- Verificar tempo que demora para a notificaão aparecer | RF-004 | Verificar tempo que demora para a notificaão aparecer| - | - | Concluindo Desenvolvimento| Enviar notificação | - |
|CT-14- Verificar se relatório de progesso está sendo gerado corretamente | RF-005 |Acompanhar relatório de progresso| - | - | Concluindo Desenvolvimento | - | - |
|CT-15- Verificar rapidez do sistema  | RF-003 |Verificar agilidade, rapidez e entrega do APP| - | - | Concluindo Desenvolvimento | Analisar desempenho do App, navegação, troca de tela, tempo de resposta | - |

## Avaliação

Com os testes de software, conseguimos identificar quais casos de teste foram atendidos e quais ainda precisavam de melhorias.O grupo abordou de maneira rápida e eficiente os casos de teste que não tinham sido atendidos.Como resultado, desenvolvemos um software de fácil usabilidade e navegação.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
