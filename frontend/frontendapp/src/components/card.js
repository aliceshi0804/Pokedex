import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css'
import getPokemonImage from '../utils/getPokemonImage'

export default function Card(props) {
  const elementTypes = props.types.map(typesInfo => typesInfo.type.name);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`card ${elementTypes[0]}`}>
      <img className="card-image" src={`${getPokemonImage(props.sprites)}`} alt={`${props.name}`}/>
      <h2 className="card-title">{`${props.name}`}</h2>
      
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        More Info
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <DialogContentText>
          <img className="card-image" src={`${getPokemonImage(props.sprites)}`} alt={`${props.name}`}/>
          <div>
          <h2 className="card-title">{`${props.name}`}</h2>
          </div>
          <p className="card-detail">
            
            Type: {`${elementTypes.join(' | ')}`}
            <br></br>
            Height: {`${props.height}`}
            <br></br>
            Weight: {`${props.weight}`}
            <br></br>
            Ability: {`${props.ability}`}
            <br></br>
          
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  );
}