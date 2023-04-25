import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
const List = () => {
  const [userdata, setUserData] = useState([]);
  useEffect(() => {
    const unuser = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserData(list);
      },
      (error) => {
        console.log(error);
      },
    );

    return () => {
      unuser();
    };
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Age</TableCell>
            <TableCell className="tableCell">Gender</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">BMI</TableCell>
            <TableCell className="tableCell">BMI Category</TableCell>
            <TableCell className="tableCell">Height</TableCell>
            <TableCell className="tableCell">Start Weight</TableCell>
            <TableCell className="tableCell">Goal Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userdata.map((row) => (
            <TableRow key={row?.id}>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={
                      row?.picture
                        ? row.picture
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                    className="image"
                  />
                  {row?.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row?.age}</TableCell>
              <TableCell className="tableCell">{row?.gender}</TableCell>
              <TableCell className="tableCell">{row?.email}</TableCell>
              <TableCell className="tableCell">
                {row?.bmi[row.bmi.length - 1]}
              </TableCell>
              <TableCell className="tableCell">
                {row?.bmiCategory[row.bmiCategory.length - 1]}
              </TableCell>
              <TableCell className="tableCell">
                {row?.height[row.height.length - 1]}
                {row?.heightUnit}
              </TableCell>
              <TableCell className="tableCell">
                {row?.startWeight}
                {row?.weightUnit}
              </TableCell>
              <TableCell className="tableCell">
                {row?.weightGoal}
                {row?.weightUnit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
