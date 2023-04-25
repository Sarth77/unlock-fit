import "./weightlist.scss";
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
const WeightList = ({ userid }) => {
  const ids = userid.split("/users/");
  const [userdata, setUserData] = useState([]);
  useEffect(() => {
    const unuser = onSnapshot(
      collection(db, `table-${ids[1]}`),
      (snapShot) => {
        let list = [];
        snapShot.docs?.forEach((doc) => {
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
    // eslint-disable-next-line
  }, []);
  console.log(userdata);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Difference</TableCell>
            <TableCell className="tableCell">Current Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userdata.map((row) => (
            <TableRow key={row?.id}>
              <TableCell className="tableCell">{row?.date}</TableCell>
              <TableCell className="tableCell">{row?.difference}</TableCell>
              <TableCell className="tableCell">{row?.currentWeight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeightList;
