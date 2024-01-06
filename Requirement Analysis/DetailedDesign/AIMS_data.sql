CREATE TABLE "PRODUCT" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "image" VARCHAR(100) NOT NULL,
  "idOfCategory" VARCHAR(20) NOT NULL,
  "productDescription" VARCHAR(200) NOT NULL,
  "productDetails" VARCHAR(200) NOT NULL,
  "price" DOUBLE NOT NULL,
  "countInStock" INT NOT NULL,
  "isBestSeller" BOOLEAN NOT NULL,
  "catename" VARCHAR(45) NOT NULL,
  "isDeleted" BOOLEAN DEFAULT false
);

CREATE TABLE "CATEGORY" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "catename" VARCHAR(45) NOT NULL,
  "image" VARCHAR(100) NOT NULL,
  "isDeleted" BOOLEAN DEFAULT false
);

CREATE TABLE "ORDER" (
  "id" VARHCAR(45) PRIMARY KEY NOT NULL,
  "idOfUser" VARCHAR(45) NOT NULL,
  "shippingAddress" VARCHAR(200) NOT NULL,
  "paymentMethod" VARCHAR(100) NOT NULL,
  "shippingPrice" DOUBLE NOT NULL,
  "totalPrice" DOUBLE NOT NULL,
  "isAccepted" BOOLEAN DEFAULT true
);

CREATE TABLE "PRODUCTINORDER" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "idOfProduct" VARCHAR(45) NOT NULL,
  "quantity" INT NOT NULL,
  "idOfOrder" VARCHAR(45) NOT NULL,
  "isAccepted" BOOLEAN DEFAULT true
);

CREATE TABLE "CART" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "idOfUser" VARCHAR(45) NOT NULL
);

CREATE TABLE "PRODUCTINCART" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "idOfProduct" VARCHAR(45) NOT NULL,
  "quantity" INT NOT NULL,
  "idOfCart" VARCHAR(45) NOT NULL
);

CREATE TABLE "User" (
  "id" VARCHAR(45) PRIMARY KEY NOT NULL,
  "userName" VARCHAR(45) NOT NULL,
  "password" VARCHAR(45) NOT NULL,
  "phoneNumber" VARCHAR(20) NOT NULL,
  "gender" VARCHAR(10) NOT NULL,
  "fullName" VARCHAR(45) NOT NULL
);

ALTER TABLE "CART" ADD FOREIGN KEY ("idOfUser") REFERENCES "User" ("id");

ALTER TABLE "PRODUCT" ADD FOREIGN KEY ("idOfCategory") REFERENCES "CATEGORY" ("id");

CREATE TABLE "PRODUCTINCART_PRODUCT" (
  "PRODUCTINCART_idOfProduct" VARCHAR(45),
  "PRODUCT_id" VARCHAR(45),
  PRIMARY KEY ("PRODUCTINCART_idOfProduct", "PRODUCT_id")
);

ALTER TABLE "PRODUCTINCART_PRODUCT" ADD FOREIGN KEY ("PRODUCTINCART_idOfProduct") REFERENCES "PRODUCTINCART" ("idOfProduct");

ALTER TABLE "PRODUCTINCART_PRODUCT" ADD FOREIGN KEY ("PRODUCT_id") REFERENCES "PRODUCT" ("id");


ALTER TABLE "ORDER" ADD FOREIGN KEY ("idOfUser") REFERENCES "User" ("id");

ALTER TABLE "PRODUCTINORDER" ADD FOREIGN KEY ("idOfOrder") REFERENCES "ORDER" ("id");

ALTER TABLE "PRODUCTINCART" ADD FOREIGN KEY ("idOfCart") REFERENCES "CART" ("id");

CREATE TABLE "PRODUCTINORDER_PRODUCT" (
  "PRODUCTINORDER_idOfProduct" VARCHAR(45),
  "PRODUCT_id" VARCHAR(45),
  PRIMARY KEY ("PRODUCTINORDER_idOfProduct", "PRODUCT_id")
);

ALTER TABLE "PRODUCTINORDER_PRODUCT" ADD FOREIGN KEY ("PRODUCTINORDER_idOfProduct") REFERENCES "PRODUCTINORDER" ("idOfProduct");

ALTER TABLE "PRODUCTINORDER_PRODUCT" ADD FOREIGN KEY ("PRODUCT_id") REFERENCES "PRODUCT" ("id");

