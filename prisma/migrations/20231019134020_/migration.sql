-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "area_atuacao" TEXT[],
    "regime_contratacao" TEXT NOT NULL,
    "gestor" BOOLEAN NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "senha" TEXT NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "prazo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tecnologias" TEXT[],
    "project_manager_id" INTEGER NOT NULL,
    "backend_collaborator_id" INTEGER NOT NULL,
    "frontend_collaborator_id" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollaboratorToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_email_key" ON "Collaborator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CollaboratorToProject_AB_unique" ON "_CollaboratorToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CollaboratorToProject_B_index" ON "_CollaboratorToProject"("B");

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_project_manager_id_fkey" FOREIGN KEY ("project_manager_id") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_backend_collaborator_id_fkey" FOREIGN KEY ("backend_collaborator_id") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_frontend_collaborator_id_fkey" FOREIGN KEY ("frontend_collaborator_id") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToProject" ADD CONSTRAINT "_CollaboratorToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToProject" ADD CONSTRAINT "_CollaboratorToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
