-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "subsection" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogDetail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "BlogDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogDetail" ADD CONSTRAINT "BlogDetail_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
