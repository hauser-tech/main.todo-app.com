"use client";
import { DeleteTask, GetTasks, UpdateTask } from "@/actions/auth";
import AddNewEntry from "@/components/AddNewEntry";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsSearch } from "react-icons/bs";
import { useDebounce } from "use-debounce";
import moment from "moment";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAppSelector } from "@/redux/store";

// let socket: any;
// const URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const user = useAppSelector((state) => state.authReducer.value.user);

  // useEffect(() => {
  //   socket = io(URL, {
  //     path: "/api/socket",
  //   });
  //   socket.emit("new-user-add", user?._id);
  // }, [user?._id]);

  // useEffect(() => {
  //   socket.on("recieve-message", (data: any) => {
  //     toast.success(`Task ${data.taskName} is completed by ${data.email}`);
  //   });
  // }, []);

  const {
    isLoading,
    data: tasksList,
    refetch: tasksListRefetch,
  } = useQuery(
    ["task-data", debouncedSearchValue],
    () => GetTasks(debouncedSearchValue),
    {
      select: (res: any) => res.data,
    }
  );

  const columns = [
    {
      name: "S No.",
      selector: (row: any) => row.title,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Due Date",
      selector: (row: any) => row.dueDate,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    {
      name: "Actions",
      selector: (row: any) => row.actions,
    },
  ];

  const { mutate: deleteEntry } = useMutation(
    (data: string) => DeleteTask(data),
    {
      onSuccess: (res: any) => {
        toast.success(res.data.message);
        tasksListRefetch();
      },
      onError: (err: any) => {
        toast.error(err.response.data.error);
      },
    }
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(id);
    }
  };

  const { mutate: updateEntry } = useMutation(
    (data: string) => UpdateTask(data),
    {
      onSuccess: (res: any) => {
        toast.success(res.data.message);
        tasksListRefetch();
        // socket.emit("send-message", {
        //   taskName: res.data.task.name,
        //   email: user?.email.split("@")[0],
        // });
      },
      onError: (err: any) => {
        toast.error(err.response.data.error);
      },
    }
  );

  const data = tasksList
    ? tasksList.map((item: any, i: number) => {
        return {
          title: i + 1,
          name: item.name,
          dueDate: moment(item.dueDate).format("DD-MM-YYYY"),
          status: (
            <div
              className={`py-1 px-2 no-underline rounded-full text-white font-sans font-semibold text-sm uppercase ${
                item.status ? "bg-green-700" : "bg-pureRed"
              }`}
            >
              {item.status ? "completed" : "pending"}
            </div>
          ),
          actions: (
            <div className="flex justify-between items-center space-x-3 cursor-pointer">
              <AiOutlineSave
                className={`text-primary ${
                  moment(item.dueDate).isBefore(moment(), "day") || item.status
                    ? "hidden"
                    : "inline-block"
                }`}
                size={28}
                onClick={() => updateEntry(item._id)}
              />
              <AiOutlineDelete
                className="text-pureRed"
                size={28}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          ),
        };
      })
    : [];

  // console.log("tasks list", tasksList);

  return (
    <>
      <Header />
      <AddNewEntry
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={tasksListRefetch}
      />
      <div>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center w-11/12 mx-auto">
          <div className="w-11/12 mx-auto md:mx-0 md:w-96">
            <Input
              value={searchValue}
              setValue={setSearchValue}
              placeholder="Search"
              type="text"
              icon={BsSearch}
            />
          </div>
          <button className="add-new-btn" onClick={() => setIsOpen(true)}>
            Add New Entry
          </button>
        </div>
        <div className="mt-4 w-11/12 mx-auto">
          <DataTable
            responsive
            pagination
            title="Todo's List"
            progressPending={isLoading}
            progressComponent={<Loader />}
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </>
  );
}
