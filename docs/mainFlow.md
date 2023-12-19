Usuários
- comum
- administradores
- desenvolvedores

Autenticação
- via OAuth Discord

Casos de Uso resumido:
- criação de polls
- edição de polls
- remoção de polls
- adição, edição ou remoção de options de um poll específico
- qualquer usuário pode criar adicionar um único vote para cada option dentro de uma poll.

Entidades e Conceitos:
1 Enquete (Poll):
- descrição: representa uma pergunta ou um tema específico com várias opções de respota.
- atributos: título, descrição, lista de opções (options), data de criação, data de expiração e criador.

2 Opção (Option):
- descrição: uma possível resposta dentro de uma enquete
- atributos: texto de opção, contagem de votos

3 Usuário (User):
- descrição: membro do servidor discord TARDIS, que interage com a enquete.
- atributos: ID do discord, nome do usuário, role (common, admin ou developer0)

4. Voto (vote):
- descrição: registro de escolha de um usuário em uma opção específica de uma enquete.
- atributos: ID do usuário, ID da opção escolhida.
