import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#6f19d2',
  '&:hover': {
    backgroundColor: 'black',
  },
}));

export default function CustomButton(props) {
    let content = props.content;
    let width = props.width;
    return (
        <ColorButton sx={{width: width}} onClick={props.onClick} variant="contained">{content}</ColorButton>
    );
}