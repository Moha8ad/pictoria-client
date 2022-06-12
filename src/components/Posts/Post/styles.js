import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    paddingTop: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken',
    height: '30vh',
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',

  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  messageInfo: {    
    height: '30vh',
    overflow: 'scroll',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px',
  },
  title: {
    padding: '20px 15px 0px',
  },
  cardActions: {
    marginTop: '-30px',
    padding: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)' ,
    display: 'flex',
    justifyContent: 'flex-end'
  },
});