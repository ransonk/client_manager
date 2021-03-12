import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import { fetchIntensities, setIntensities } from '../../store/users';
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
        // borderRadius: '50px'
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

    // console.log('intensitiesss', intensities)
    let intensityList = Object.values(intensities)
    // console.log('list', intensityList)

    console.log('intensityList', intensityList)


    const handleDeleteIntensity = async (id) => {
        const deleted = await deleteIntensity(id)
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

{/* {
    intensityList.map((intensity, i) => {
        let panelContent = `panel${i}a-content`
        let panelHeader = `panel${i}a-header`
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={panelContent}
                    id={panelHeader}
                // aria-controls='panel1a-content'
                // id="panel1a-header"
                >
                    <Typography className={classes.heading}>{'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.delete} onClick={() => handleDeleteIntensity(intensity.id)}>
                        Delete
                    </Typography>
                </AccordionDetails>
            </Accordion>
        )
    })
} */}
