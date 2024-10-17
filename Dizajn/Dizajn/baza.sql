SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aad661_dizajn SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aad661_dizajn COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aad661_dizajn SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table klijenti(
sifra int not null primary key identity(1,1),
naziv varchar(100) not null,
email varchar(100) not null
);

create table projekti(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
usluga int null,
dizajner int null,
klijent int null
);

create table usluge(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
cijena decimal (18,2) null
);

create table dizajneri(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(50) not null,
email varchar(100) not null
);

alter table projekti add foreign key (klijent) references klijenti(sifra);
alter table projekti add foreign key (usluga) references usluge(sifra);
alter table projekti add foreign key(dizajner) references dizajneri(sifra);

select * from klijenti;

insert into klijenti (naziv,email) values
('LegitFirma','legitfirma@gmail.com'),
('Pero Perke', 'pperic@gmail.com'),
('Josjednafirma','firma22@gmail.com');

select * from usluge;

insert into usluge (naziv,cijena) values
('vizualni identitet', 500.50),
('digitalni marketing', 700.99),
('logotip',370.00);

select * from dizajneri;

insert into dizajneri (ime,prezime,email) values
('ana','marek','anamarek@gmail.com'),
('ime', 'prezime', 'ime.prezime1@hotmail.com'),
('dobar','dizajner', 'dragon-rider2@gmail.com');

select * from projekti;

insert into projekti (naziv,usluga,dizajner,klijent) values
('rebranding',1,3,2),('novi logo',3,1,1),('sm marketing',2,2,3);