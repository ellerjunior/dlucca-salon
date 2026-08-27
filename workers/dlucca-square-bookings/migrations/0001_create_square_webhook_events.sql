CREATE TABLE IF NOT EXISTS square_webhook_events (
  event_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('processing', 'sent', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 1,
  received_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sent_at TEXT,
  last_error_code TEXT
);

CREATE INDEX IF NOT EXISTS idx_square_webhook_events_status_updated
  ON square_webhook_events (status, updated_at);
