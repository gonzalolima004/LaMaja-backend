-- CreateTable
CREATE TABLE `cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(10) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veterinario` (
    `id_usuario` INTEGER NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animal` (
    `id_animal` INTEGER NOT NULL AUTO_INCREMENT,
    `peso` INTEGER NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `vacunado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_animal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimiento_veterinario` (
    `id_procedimiento_veterinario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `fecha` DATE NOT NULL,
    `id_animal` INTEGER NOT NULL,

    PRIMARY KEY (`id_procedimiento_veterinario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metodo_pago` (
    `id_metodo_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_metodo_pago` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_metodo_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cobro` (
    `id_cobro` INTEGER NOT NULL AUTO_INCREMENT,
    `importe_total` DECIMAL(10, 2) NOT NULL,
    `fecha` DATE NOT NULL,
    `id_metodo_pago` INTEGER NOT NULL,
    `id_factura_venta` INTEGER NOT NULL,

    PRIMARY KEY (`id_cobro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transferencia` (
    `id_cobro` INTEGER NOT NULL,
    `titular` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_cobro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarjeta` (
    `id_cobro` INTEGER NOT NULL,
    `titular` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_cobro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factura_venta` (
    `id_factura_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `importe_total` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `id_presupuesto` INTEGER NOT NULL,

    PRIMARY KEY (`id_factura_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presupuesto` (
    `id_presupuesto` INTEGER NOT NULL AUTO_INCREMENT,
    `importe_total` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id_presupuesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_presupuesto` (
    `id_detalle_presupuesto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_presupuesto` INTEGER NOT NULL,
    `id_animal` INTEGER NOT NULL,
    `precio` INTEGER NOT NULL,

    PRIMARY KEY (`id_detalle_presupuesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veterinario` ADD CONSTRAINT `veterinario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimiento_veterinario` ADD CONSTRAINT `procedimiento_veterinario_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id_animal`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobro` ADD CONSTRAINT `cobro_id_metodo_pago_fkey` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago`(`id_metodo_pago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobro` ADD CONSTRAINT `cobro_id_factura_venta_fkey` FOREIGN KEY (`id_factura_venta`) REFERENCES `factura_venta`(`id_factura_venta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transferencia` ADD CONSTRAINT `transferencia_id_cobro_fkey` FOREIGN KEY (`id_cobro`) REFERENCES `cobro`(`id_cobro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tarjeta` ADD CONSTRAINT `tarjeta_id_cobro_fkey` FOREIGN KEY (`id_cobro`) REFERENCES `cobro`(`id_cobro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factura_venta` ADD CONSTRAINT `factura_venta_id_presupuesto_fkey` FOREIGN KEY (`id_presupuesto`) REFERENCES `presupuesto`(`id_presupuesto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presupuesto` ADD CONSTRAINT `presupuesto_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_presupuesto` ADD CONSTRAINT `detalle_presupuesto_id_presupuesto_fkey` FOREIGN KEY (`id_presupuesto`) REFERENCES `presupuesto`(`id_presupuesto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_presupuesto` ADD CONSTRAINT `detalle_presupuesto_id_animal_fkey` FOREIGN KEY (`id_animal`) REFERENCES `animal`(`id_animal`) ON DELETE CASCADE ON UPDATE CASCADE;
