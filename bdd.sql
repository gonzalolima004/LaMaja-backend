create table Cliente(
	id_cliente int auto_increment primary key,
    nombre varchar(50),
    apellido varchar(50),
    dni varchar(10),
    direccion varchar(50)
);

create table Rol(
	id_rol int auto_increment primary key,
    nombre_rol varchar(50)
);

INSERT INTO Rol (nombre_rol)
VALUES ('Encargado'), ('Veterinario');


create table Usuario_Sistema(
	id_usuario int auto_increment primary key,
    id_rol int,
    nombre varchar(50),
    apellido varchar(50),
    dni varchar(50),
    email varchar(50),
    contrasena varchar(50),
    foreign key (id_rol) references Rol(id_rol)
);

create table Ejemplar_Animal(
	id_ejemplar_animal int auto_increment primary key,
    peso int,
    sexo varchar(10),
    estado varchar(50),
    fecha_nacimiento date,
    vacunado boolean
);

create table Procedimiento_Veterinario(
	id_procedimiento_veterinario int auto_increment primary key,
	tipo varchar(50),
    fecha date, 
	id_ejemplar_animal int,
    foreign key (id_ejemplar_animal) references Ejemplar_Animal(id_ejemplar_animal)
);

create table Detalle_Presupuesto(
	id_detalle_presupuesto int auto_increment primary key,
    id_animal int,
    precio int,
    id_ejemplar_animal int,
    foreign key (id_ejemplar_animal) references Ejemplar_Animal(id_ejemplar_animal)
);

create table Metodo_Pago(
	id_metodo_pago int auto_increment primary key,
    tipo enum('Tarjeta', 'Efectivo', 'Transferencia')
);

create table Cobro(
	id_cobro int auto_increment primary key,
    importe_total int,
    fecha date,
    id_metodo_pago int,
    foreign key (id_metodo_pago) references Metodo_Pago(id_metodo_pago)
);

create table Factura_Venta(
	id_factura_venta int auto_increment primary key,
    importe_total int,
    fecha date,
    tipo varchar(50),
    id_cobro int,
    foreign key (id_cobro) references Cobro(id_cobro)
);


create table Presupuesto(
	id_presupuesto int auto_increment primary key,
    id_detalle_presupuesto int,
    importe_total int,
    fecha date,
    id_cliente int,
    id_factura_venta int,
    foreign key (id_cliente) references Cliente(id_cliente),
    foreign key (id_factura_venta) references Factura_Venta(id_factura_venta),
    foreign key (id_detalle_presupuesto) references Detalle_Presupuesto(id_detalle_presupuesto)
);