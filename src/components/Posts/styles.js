import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  pageBox: {
    width:'200px', 
    backgroundColor:'green', 
    fontSize: '40px', 
    cursor:'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  page: {
    textAlign: 'center',
    width:'50px',
  },
  currentPage: {
    display:'flex',
    justifyContent:'center', 
    backgroundColor:'yellowgreen',
  }
}));