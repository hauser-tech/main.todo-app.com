import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "./Input";
import { AddTask } from "@/actions/auth";

const AddNewEntry = (props: any) => {
  const { isOpen, setIsOpen, refetch } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      dueDate: null,
    },
  });

  const { mutate, isLoading } = useMutation((data) => AddTask(data), {
    onSuccess: (res: any) => {
      setIsOpen(false);
      toast.success(res.data.message);
      reset();
      refetch();
    },
    onError: (err: any) => {
      toast.error(err.response.data.error);
    },
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  <h3>Add Task</h3>
                  <MdClose
                    className="cursor-pointer"
                    size={28}
                    onClick={() => {
                      setIsOpen(false);
                      reset();
                    }}
                  />
                </Dialog.Title>
                <hr className="my-2" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Task Name is Required." }}
                      render={({ field }) => (
                        <Input
                          field={{ ...field }}
                          label="Task Name"
                          placeholder="Enter Task Name"
                          errors={errors.name}
                          type="text"
                          required={true}
                        />
                      )}
                    />

                    <Controller
                      name="dueDate"
                      control={control}
                      rules={{ required: "Task due date is Required." }}
                      render={({ field }) => (
                        <Input
                          field={{ ...field }}
                          label="Due Date"
                          placeholder="Enter Due Date"
                          errors={errors.dueDate}
                          type="date"
                          required={true}
                        />
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      className={`submit-btn ${
                        (!isValid || !isDirty) && "disabled"
                      }`}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      type="submit"
                      disabled={!isValid || !isDirty}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddNewEntry;
