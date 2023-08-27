import api from "../lib/api";

export const CreateUser = (data: any) => {
  return api.post("/user/create-user", data);
};

export const UserLogin = (data: any) => {
  return api.post("/user/user-login", data);
};

export const UserLogout = () => {
  return api.post("/user/user-logout");
};

export const GetUser = () => {
  return api.get("/user/get-user");
};

export const AddTask = (data: any) => {
  return api.post("/task/create-task", data);
};

export const GetTasks = (search: string) => {
  return api.get("/task/get-all-tasks-by-user-id", {
    params: { search: search.trim() },
  });
};

export const DeleteTask = (data: string) => {
  return api.delete(`/task/delete-task/${data}`);
};

export const UpdateTask = (data: string) => {
  return api.put(`/task/update-task-status/${data}`);
};
