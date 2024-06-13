<!-- Database POSTGRES: kalebfurniture -->
<!-- DROP DATABASE IF EXISTS kalebfurniture; -->

```sql
create database kalebfurniture;

create table if not exists users ( id serial primary key, name varchar(50), username varchar(50), password varchar(255) );
alter table users owner to postgres;
```
