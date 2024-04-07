CREATE TABLE [usuarios] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DS_LOGIN] nvarchar(100),
  [DS_SENHA] nvarchar(255),
  [DS_NOME] nvarchar(100),
  [DS_EMAIL] nvarchar(255),
  [DS_LOGRADOURO] nvarchar(100),
  [DS_COMPLEMENTO] nvarchar(100),
  [NR_NUMERO] int,
  [DS_CEP] nvarchar(255),
  [DS_BAIRRO] nvarchar(255),
  [DS_CIDADE] nvarchar(255),
  [NR_TIPO] int,
  [NR_MATRICULA] integer
)
GO

CREATE TABLE [mensagens] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [NR_ORIGEMMENSAGEM] nvarchar(255) NOT NULL CHECK ([NR_ORIGEMMENSAGEM] IN ('1 - responsavel', '2 - professor')),
  [FK_REMETENTE] int,
  [DS_CONTEUDO] varchar(max),
  [FK_DESTINATARIO] int,
  [DH_INCLUSAO] datetime,
  [TG_ENVIARNOTIFICACAO] tinyint,
  [NR_TIPOMENSAGEM] nvarchar(255) NOT NULL CHECK ([NR_TIPOMENSAGEM] IN ('1-Mensagem direta', '2-Aviso'))
)
GO

CREATE TABLE [turmas] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DS_NOME] nvarchar(255),
  [FK_PROFESSOR] int
)
GO

CREATE TABLE [matriculas] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FK_RESPONSAVEL] int,
  [FK_ALUNO] int,
  [FK_TURMA] int,
  [DT_MATRICULA] datetime
)
GO

CREATE TABLE [atividades] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DS_NOME] nvarchar(255),
  [DH_VALIDADE] datetime,
  [DH_INCLUSAO] datetime,
  [FK_MURAL] int,
  [NR_NOTA] int,
  [NR_NOTAMAXIMA] int
)
GO

CREATE TABLE [murais] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [DS_NOME] nvarchar(255),
  [FK_TURMA] int,
  [FK_MATRICULA] int
)
GO

CREATE TABLE [calendarios] (
  [PK_ID] int NOT NULL IDENTITY(1, 1),
  [DS_TITULO] nvarchar(255),
  [DS_ASSUNTO] nvarchar(255),
  [DT_INICIO] date,
  [DT_TERMINO] date,
  [FK_TURMA] int,
  PRIMARY KEY ([PK_ID], [FK_TURMA])
)
GO

CREATE TABLE [calendario_turma] (
  [PK_ID] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FK_TURMA] int,
  [FK_CALENDARIO] int
)
GO

ALTER TABLE [mensagens] ADD FOREIGN KEY ([FK_REMETENTE]) REFERENCES [usuarios] ([PK_ID])
GO

ALTER TABLE [mensagens] ADD FOREIGN KEY ([FK_DESTINATARIO]) REFERENCES [usuarios] ([PK_ID])
GO

ALTER TABLE [usuarios] ADD FOREIGN KEY ([PK_ID]) REFERENCES [turmas] ([FK_PROFESSOR])
GO

ALTER TABLE [matriculas] ADD FOREIGN KEY ([FK_RESPONSAVEL]) REFERENCES [usuarios] ([PK_ID])
GO

ALTER TABLE [matriculas] ADD FOREIGN KEY ([FK_ALUNO]) REFERENCES [usuarios] ([PK_ID])
GO

ALTER TABLE [atividades] ADD FOREIGN KEY ([FK_MURAL]) REFERENCES [murais] ([PK_ID])
GO

ALTER TABLE [murais] ADD FOREIGN KEY ([FK_TURMA]) REFERENCES [turmas] ([PK_ID])
GO

ALTER TABLE [murais] ADD FOREIGN KEY ([FK_MATRICULA]) REFERENCES [usuarios] ([PK_ID])
GO

CREATE TABLE [turmas_calendarios] (
  [turmas_PK_ID] int,
  [calendarios_FK_TURMA] int,
  PRIMARY KEY ([turmas_PK_ID], [calendarios_FK_TURMA])
);
GO

ALTER TABLE [turmas_calendarios] ADD FOREIGN KEY ([turmas_PK_ID]) REFERENCES [turmas] ([PK_ID]);
GO

ALTER TABLE [turmas_calendarios] ADD FOREIGN KEY ([calendarios_FK_TURMA]) REFERENCES [calendarios] ([FK_TURMA]);
GO


ALTER TABLE [calendario_turma] ADD FOREIGN KEY ([FK_TURMA]) REFERENCES [turmas] ([PK_ID])
GO

ALTER TABLE [calendario_turma] ADD FOREIGN KEY ([FK_CALENDARIO]) REFERENCES [calendarios] ([PK_ID])
GO
