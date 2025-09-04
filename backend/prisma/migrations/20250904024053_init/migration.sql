-- CreateEnum
CREATE TYPE "public"."Metodo_Pago_tipo" AS ENUM ('Tarjeta', 'Efectivo', 'Transferencia');

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "dni" VARCHAR(10),
    "direccion" VARCHAR(50),

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "public"."Cobro" (
    "id_cobro" SERIAL NOT NULL,
    "importe_total" INTEGER,
    "fecha" DATE,
    "id_metodo_pago" INTEGER,

    CONSTRAINT "Cobro_pkey" PRIMARY KEY ("id_cobro")
);

-- CreateTable
CREATE TABLE "public"."Detalle_Presupuesto" (
    "id_detalle_presupuesto" SERIAL NOT NULL,
    "id_animal" INTEGER,
    "precio" INTEGER,
    "id_ejemplar_animal" INTEGER,

    CONSTRAINT "Detalle_Presupuesto_pkey" PRIMARY KEY ("id_detalle_presupuesto")
);

-- CreateTable
CREATE TABLE "public"."Ejemplar_Animal" (
    "id_ejemplar_animal" SERIAL NOT NULL,
    "peso" INTEGER,
    "sexo" VARCHAR(10),
    "estado" VARCHAR(50),
    "fecha_nacimiento" DATE,
    "vacunado" BOOLEAN,

    CONSTRAINT "Ejemplar_Animal_pkey" PRIMARY KEY ("id_ejemplar_animal")
);

-- CreateTable
CREATE TABLE "public"."Factura_Venta" (
    "id_factura_venta" SERIAL NOT NULL,
    "importe_total" INTEGER,
    "fecha" DATE,
    "tipo" VARCHAR(50),
    "id_cobro" INTEGER,

    CONSTRAINT "Factura_Venta_pkey" PRIMARY KEY ("id_factura_venta")
);

-- CreateTable
CREATE TABLE "public"."Metodo_Pago" (
    "id_metodo_pago" SERIAL NOT NULL,
    "tipo" "public"."Metodo_Pago_tipo",

    CONSTRAINT "Metodo_Pago_pkey" PRIMARY KEY ("id_metodo_pago")
);

-- CreateTable
CREATE TABLE "public"."Presupuesto" (
    "id_presupuesto" SERIAL NOT NULL,
    "id_detalle_presupuesto" INTEGER,
    "importe_total" INTEGER,
    "fecha" DATE,
    "id_cliente" INTEGER,
    "id_factura_venta" INTEGER,

    CONSTRAINT "Presupuesto_pkey" PRIMARY KEY ("id_presupuesto")
);

-- CreateTable
CREATE TABLE "public"."Procedimiento_Veterinario" (
    "id_procedimiento_veterinario" SERIAL NOT NULL,
    "tipo" VARCHAR(50),
    "fecha" DATE,
    "id_ejemplar_animal" INTEGER,

    CONSTRAINT "Procedimiento_Veterinario_pkey" PRIMARY KEY ("id_procedimiento_veterinario")
);

-- CreateTable
CREATE TABLE "public"."Rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre_rol" VARCHAR(50),

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "public"."Usuario_Sistema" (
    "id_usuario" SERIAL NOT NULL,
    "id_rol" INTEGER,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "dni" VARCHAR(50),
    "email" VARCHAR(50),
    "contrasena" VARCHAR(50),

    CONSTRAINT "Usuario_Sistema_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE INDEX "idx_cobro_metodo_pago" ON "public"."Cobro"("id_metodo_pago");

-- CreateIndex
CREATE INDEX "idx_detalle_ejemplar" ON "public"."Detalle_Presupuesto"("id_ejemplar_animal");

-- CreateIndex
CREATE INDEX "idx_factura_cobro" ON "public"."Factura_Venta"("id_cobro");

-- CreateIndex
CREATE INDEX "idx_presupuesto_cliente" ON "public"."Presupuesto"("id_cliente");

-- CreateIndex
CREATE INDEX "idx_presupuesto_detalle" ON "public"."Presupuesto"("id_detalle_presupuesto");

-- CreateIndex
CREATE INDEX "idx_presupuesto_factura" ON "public"."Presupuesto"("id_factura_venta");

-- CreateIndex
CREATE INDEX "idx_procedimiento_ejemplar" ON "public"."Procedimiento_Veterinario"("id_ejemplar_animal");

-- CreateIndex
CREATE INDEX "idx_usuario_rol" ON "public"."Usuario_Sistema"("id_rol");

-- AddForeignKey
ALTER TABLE "public"."Cobro" ADD CONSTRAINT "Cobro_ibfk_1" FOREIGN KEY ("id_metodo_pago") REFERENCES "public"."Metodo_Pago"("id_metodo_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Detalle_Presupuesto" ADD CONSTRAINT "Detalle_Presupuesto_ibfk_1" FOREIGN KEY ("id_ejemplar_animal") REFERENCES "public"."Ejemplar_Animal"("id_ejemplar_animal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Factura_Venta" ADD CONSTRAINT "Factura_Venta_ibfk_1" FOREIGN KEY ("id_cobro") REFERENCES "public"."Cobro"("id_cobro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Presupuesto" ADD CONSTRAINT "Presupuesto_ibfk_1" FOREIGN KEY ("id_cliente") REFERENCES "public"."Cliente"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Presupuesto" ADD CONSTRAINT "Presupuesto_ibfk_2" FOREIGN KEY ("id_factura_venta") REFERENCES "public"."Factura_Venta"("id_factura_venta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Presupuesto" ADD CONSTRAINT "Presupuesto_ibfk_3" FOREIGN KEY ("id_detalle_presupuesto") REFERENCES "public"."Detalle_Presupuesto"("id_detalle_presupuesto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Procedimiento_Veterinario" ADD CONSTRAINT "Procedimiento_Veterinario_ibfk_1" FOREIGN KEY ("id_ejemplar_animal") REFERENCES "public"."Ejemplar_Animal"("id_ejemplar_animal") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Usuario_Sistema" ADD CONSTRAINT "Usuario_Sistema_ibfk_1" FOREIGN KEY ("id_rol") REFERENCES "public"."Rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION;
