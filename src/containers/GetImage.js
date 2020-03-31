import { connect } from 'react-redux';
import GetImage from '../components/GetImage';
import { setPhoto } from '../actions/index';

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto(source) {
      dispatch(setPhoto(source));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetImage);
