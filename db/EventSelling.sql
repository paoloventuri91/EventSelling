CREATE TABLE "events" (
    "event_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "name" TEXT NOT NULL
);
CREATE TABLE "categories" (
    "event_id" INTEGER NOT NULL,
    "category_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "name" TEXT NOT NULL
);
CREATE TABLE "products" (
    "event_id" INTEGER NOT NULL,
    "product_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "Name" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
CREATE TABLE "sales" (
    "event_id" INTEGER NOT NULL,
    "sale_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "time" TEXT NOT NULL,
    "terminal" TEXT,
    "total" REAL
);
CREATE TABLE "sold_items" (
    "sale_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" REAL
);
