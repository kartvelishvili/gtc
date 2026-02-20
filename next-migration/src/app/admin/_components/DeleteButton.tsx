"use client";

import { FC } from "react";

interface Props {
  action: (formData: FormData) => void;
  id: number;
  label?: string;
}

const DeleteButton: FC<Props> = ({ action, id, label = "Delete" }) => {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this item?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        {label}
      </button>
    </form>
  );
};

export default DeleteButton;
