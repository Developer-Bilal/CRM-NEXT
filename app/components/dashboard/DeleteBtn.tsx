"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

interface DeleteBtnProps {
  id: string;
}

const DeleteBtn = ({ id }: DeleteBtnProps) => {
  const router = useRouter();

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted! this user has been deleted!", {
          icon: "success",
        });
        axios
          .delete(
            `https://6767dad9c1de2e6421c86f85.mockapi.io/api/v1/users/${id}`
          )
          .then(() => {
            console.log("Deleted");
            router.push("/dashboard/users");
          })
          .catch((err) => console.log(err));
      } else {
        swal("This user is not deleted!");
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