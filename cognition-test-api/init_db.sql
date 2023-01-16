CREATE TABLE accounts (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP
);

CREATE TABLE test_records (
	record_id serial PRIMARY KEY,
	user_id serial NOT NULL,
	errorsCount INTEGER,
	triesCount INTEGER,
	test_time_in_secs INTEGER,
	participated_on_date TIMESTAMP NOT NULL
);