create table if not exists price_looks (
  id bigserial primary key,
  vehicle text not null,
  from_date date not null,
  to_date date not null,
  total integer not null,
  session text not null default '',
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
