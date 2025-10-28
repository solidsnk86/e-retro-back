// TASKS
const GET_ALL_TASKS = "SELECT * FROM tasks WHERE user_id = $1;";
const GET_TASK_BY_ID = "SELECT * FROM tasks WHERE task_id = $1;";
const GET_TASK_BY_TITLE = "SELECT * FROM tasks WHERE title = $1 AND user_id = $2;"
const CREATE_TASK =
  "INSERT INTO tasks(title, description, user_id) VALUES($1, $2, $3) RETURNING *;";
const UPDATE_TASK =
  "UPDATE tasks SET title = $2, description = $3, task_updated = $4, updated_at = $5 WHERE task_id = $1 RETURNING *;";
const DELETE_TASK = "DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING title;";
const SET_TASK_DONE = "UPDATE tasks SET task_done = $2 WHERE task_id = $3 AND user_id = $1 RETURNING task_done;"
// USER
const GET_ALL_USERS = "SELECT * FROM pern_user;";
const CREATE_USER =
  "INSERT INTO pern_user (user_name, user_email, user_password, user_avatar, ip, city, country) VALUES($1, $2, $3, $4) RETURNING *;";
const GET_USER_BY_EMAIL =
  "SELECT * FROM pern_user WHERE user_email = $1;";
const GET_USER_BY_ID = "SELECT * FROM pern_user WHERE user_id = $1;";
const UPDATE_USER =
  "UPDATE pern_user SET user_name = $2, user_email = $3, user_password = $4, user_update = $5, updated_at = $6, user_avatar = $7 WHERE user_id = $1 RETURNING *;";
const UPDATE_USER_PASSWORD = "UPDATE pern_user SET user_password = $2, user_update = $3 WHERE user_id = $1;";
const DELETE_USER = "DELETE FROM pern_user WHERE user_id = $1 RETURNING *;";
// COMMENTS
const GET_ALL_COMMETS = "SELECT * FROM comments;"
const CREATE_COMMENT = "INSERT INTO comments(title, message) VALUES($1, $2) RETURNING *;"

export {
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  GET_TASK_BY_TITLE,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_ALL_USERS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  DELETE_USER,
  GET_ALL_COMMETS,
  CREATE_COMMENT,
  SET_TASK_DONE
};
