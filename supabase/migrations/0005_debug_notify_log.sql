-- Temporary diagnostic table for tracing the admin-notification email path in production.
-- Safe to drop once the email delivery issue is confirmed fixed.
create table if not exists debug_notify_log (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  report_type text,
  stage text,
  detail text
);
revoke all on debug_notify_log from anon, public;
grant insert on debug_notify_log to authenticated;
grant select on debug_notify_log to authenticated, service_role;
