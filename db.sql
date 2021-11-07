-- SQL FOR CREATING THE DATABASE

CREATE DATABASE doodlecluster;

-- \c doodlecluster

-- Table for storing user information
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Table for storing information on each canvas
CREATE TABLE canvases(
  canvas_id BIGSERIAL PRIMARY KEY NOT NULL,
  img_data VARCHAR(1000000),
  current_user_username VARCHAR(20),
  last_in_use TIMESTAMP DEFAULT NOW() NOT NULL,
  canvas_token VARCHAR(400),
  FOREIGN KEY (current_user_username) REFERENCES users(username)  ON DELETE CASCADE
);

-- Table for storing drawings and information on previous drawers of each canvas.
CREATE TABLE previous_drawers(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  canvas_id BIGINT NOT NULL,
  username VARCHAR(20) NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  img_data VARCHAR(1000000) NOT NULL,
  FOREIGN KEY (canvas_id) REFERENCES canvases(canvas_id)  ON DELETE CASCADE
);

CREATE INDEX previous_drawers_canvas_id_idx ON previous_drawers (canvas_id);
CREATE INDEX canvases_canvas_id_idx ON canvases (canvas_id);
CREATE INDEX canvases_last_in_use_idx ON canvases (last_in_use);
CREATE INDEX canvases_current_user_username_idx ON canvases (current_user_username);
CREATE INDEX users_username_idx ON users (username);
CREATE INDEX users_email_idx ON users (email);

-- Create a new canvas
INSERT INTO canvases VALUES(DEFAULT);