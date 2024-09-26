import React from "react";
import Button from "./Button";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TableRow = ({ sectionName }) => {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-6 border-b border-gray-200 leading-tight text-center">
        <Link to="/admin/users">{sectionName}</Link>
      </td>
      <td className="py-2 px-6 border-b border-gray-200 text-center leading-tight">
        <div className="flex justify-center space-x-3">
          <Button
            label="Add"
            Icon={Plus}
            color="bg-green-500"
            hoverColor="hover:bg-green-600"
            onClick={() => {
              navigate("/admin/users/add");
            }}
          />
          <Button
            label="Edit"
            Icon={Pencil}
            color="bg-blue-500"
            hoverColor="hover:bg-blue-600"
            onClick={() => {
              navigate("/admin/users/edit");
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
