"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

interface DeleteBtnProps {
  id: string;
  path: string;
}

// change path to delete clients and developers as well

const DeleteBtn = ({ id, path }: DeleteBtnProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", {
          icon: "success",
        });
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${path}/${id}`)
          .then(() => {
            console.log("Deleted");
            router.refresh();
          })
          .catch((err) => console.log(err));
      } else {
        swal("User not deleted!");
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteBtn;
