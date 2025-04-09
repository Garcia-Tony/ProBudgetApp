set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"         serial,
  "username"       text not null,
  "hashedPassword" text not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."expenses" (
  "expenseId"      serial,
  "userId"         integer        not null,
  "amount"         numeric(10, 2) not null,
  "category"       text           not null,
  "description"    text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  "updatedAt"      timestamptz(6) not null default now(),
  primary key ("expenseId"),
  foreign key ("userId") references "public"."users" ("userId") on delete cascade
);
