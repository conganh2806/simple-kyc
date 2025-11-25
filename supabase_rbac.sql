-- 1. Create a profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- 2. Enable RLS on profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 3. Auto-create profile on signup (Trigger)
-- This ensures every new user gets a 'user' role by default
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Update KYC Records Policies for RBAC
-- First, link kyc_records to auth.users if not already linked
-- (Assuming you want to link records to the user who created them)
-- alter table public.kyc_records add column user_id uuid references auth.users default auth.uid();

-- RLS: Admins can see all, Users can only see their own
-- Note: You need to add a 'user_id' column to kyc_records for this to work fully for 'own' data.
-- For now, we'll just show the policy logic:

-- Policy: Admins can do everything
create policy "Admins can do everything on kyc_records"
  on kyc_records
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Policy: Users can insert their own data
create policy "Users can insert kyc_records"
  on kyc_records
  for insert
  to authenticated
  with check ( true ); 
  -- Ideally: with check ( user_id = auth.uid() );

