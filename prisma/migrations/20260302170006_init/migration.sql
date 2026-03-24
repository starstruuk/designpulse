-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('FREE', 'FREEMIUM', 'PAID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleDiscipline" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "ArticleDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "excerpt" TEXT,
    "publishedAt" TIMESTAMP(3),
    "source" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "pricing" "Pricing" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT,
    "resourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDiscipline" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "UserDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_name_key" ON "Discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_slug_key" ON "Discipline"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleDiscipline_articleId_disciplineId_key" ON "ArticleDiscipline"("articleId", "disciplineId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_articleId_resourceId_key" ON "Bookmark"("userId", "articleId", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDiscipline_userId_disciplineId_key" ON "UserDiscipline"("userId", "disciplineId");

-- AddForeignKey
ALTER TABLE "ArticleDiscipline" ADD CONSTRAINT "ArticleDiscipline_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleDiscipline" ADD CONSTRAINT "ArticleDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiscipline" ADD CONSTRAINT "UserDiscipline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiscipline" ADD CONSTRAINT "UserDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
