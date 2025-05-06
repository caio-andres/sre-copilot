CREATE TABLE IF NOT EXISTS incidents (
    incident_id   VARCHAR PRIMARY KEY,
    description   TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL,
    resolved_at   TIMESTAMPTZ,
    status        VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS recommendations (
    id             SERIAL PRIMARY KEY,
    incident_id    VARCHAR NOT NULL REFERENCES incidents(incident_id),
    suggestion     TEXT NOT NULL,
    generated_at   TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS metrics (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR NOT NULL,
    value          DOUBLE PRECISION NOT NULL,
    calculated_at  TIMESTAMPTZ NOT NULL
);
