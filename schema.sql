create database market_b4l;

create table if not exists users (
    id serial primary key,
    user_name text not null,
  	store_name text not null,
  	email text not null unique,
  	user_password text not null
);

create table if not exists products (
	id serial primary key,
  	user_id integer not null,
  	product_name text not null,
  	stock int not null,
  	category text not null,
  	price int not null,
  	description text not null,
  	image text not null,  
  	foreign key (user_id) references users (id)
);