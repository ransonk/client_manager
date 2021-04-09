import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { deleteIntensity } from '../../services/auth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        maxHeight: '300px',
        overflowY: 'auto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    exitBtn: {
        position: 'relative',
        bottom: '0.5rem',
        left: '12rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
    },
    delete: {
        position: 'relative',
        left: '0.5rem',
        color: '#e63946',
        fontWeight: 'bold',
        "&:hover": {
            cursor: 'pointer'
        }
    }

}));


export default function Intensities() {
    const classes = useStyles();
    const intensities = useSelector((state) => state.store.intensities)

    let intensityList = Object.values(intensities)


    const handleDeleteIntensity = async (id) => {
        await deleteIntensity(id)
    }


    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Sets</StyledTableCell>
                        <StyledTableCell align="right">Reps</StyledTableCell>
                        <StyledTableCell align="right">Remove Intensity</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {intensityList.map((intensity) => (
                        <StyledTableRow key={intensity.sets}>
                        <StyledTableCell component="th" scope="row">
                            {intensity.sets}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                                {intensity.reps}
                                </StyledTableCell>
                        <StyledTableCell align="right">

                                <span className={classes.delete} onClick={() => handleDeleteIntensity(intensity.id)}>
                        x
                    </span>
                                </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
}
