import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    button: {
      margin: '23px 15px',
    },
  });

class PhoneForm extends Component {
    input = React.createRef();
    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value //input이 이벤트 타겟
        });
    }

    handleSubmit = (e) => {
        e.preventDefault(); //페이지 리로딩 방지
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        });
        this.input.current.focus();
    }
    
    render() {
        const { classes } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="standard-name"
                    label="Name"
                    name="name" 
                    className={classes.textField}
                    onChange={this.handleChange} 
                    value={this.state.name}
                    inputRef={this.input}
                    /* textField에서는 ref속성 대신에 inputRef를 사용한다.*/
                    margin="normal"
                    autoComplete="off"
                />
                <TextField
                    id="standard-name"
                    label="Phone"
                    name="phone"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={this.state.phone}
                    margin="normal"
                    autoComplete="off"
                />
                <Button className={classes.button} variant="contained" color="primary" type="submit">등록</Button>
            </form>
        );
    }
}

PhoneForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PhoneForm);