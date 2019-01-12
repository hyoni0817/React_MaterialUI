import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { pink, purple } from '@material-ui/core/colors';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    editButton: {
        margin: theme.spacing.unit,
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
          },
      },
    delButton: {
        margin: theme.spacing.unit,
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
        '&:hover': {
            backgroundColor: pink[700],
          },
    }
});

class PhoneInfo extends Component {

    state = {
        editing : false,
        name: '',
        phone: '',
        expanded: null,
    }


    //scu를 입력하면 shouldComponentUpdate가 실행됨
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState) {
            return true;
        }
        return this.props.info !== nextProps.info;
        //만약에 위의 코드들이 === 라면 render함수를 호출하지 않는다.
    }
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);

    }

    handleToggleEdit = () => {
        //editing 값이 true -> false
        //onUpate 사용 -> 내가 업데이트 하겠다는 것을 부모컴포넌트에 알림
        ///editing 값이 false -> true
        //state에 info 값을 넣어주기
        const { info, onUpdate } = this.props;

        if(this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        } else {
            this.setState({
                name:info.name,
                phone:info.phone
            });
        }
        this.setState({
            editing : !this.state.editing
        })
    }

    handleCursorChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
        };
    render() {
        const { classes } = this.props;
        const { name, phone } = this.props.info; 
        const { editing, expanded } = this.state;

        console.log(name);

        return (
            <div>
                {
                    editing ? (
                        <Fragment>
                            <div className={classes.root}>
                                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}><b>{name}</b></Typography>
                                    <Typography className={classes.secondaryHeading}>{phone}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <TextField
                                            id="standard-name"
                                            name="name"
                                            label="이름"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleCursorChange}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-name"
                                            name="phone"
                                            label="전화번호"
                                            className={classes.textField}
                                            value={this.state.phone}
                                            onChange={this.handleCursorChange}
                                            margin="normal"
                                        />
                                        <Button variant="contained" className={classes.delButton} onClick={this.handleRemove}>삭제</Button>
                                        <Button variant="contained" className={classes.editButton} onClick={this.handleToggleEdit}>
                                            {editing ? '적용' : '수정'}
                                        </Button >
                                    </Typography>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>                       
                        </Fragment>
                        
                    ) : (
                        <Fragment>
                            <div className={classes.root}>
                                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}><b>{name}</b></Typography>
                                    <Typography className={classes.secondaryHeading}>{phone}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                    <Button variant="contained" className={classes.delButton} onClick={this.handleRemove}>삭제</Button>
                                    <Button variant="contained" className={classes.editButton} onClick={this.handleToggleEdit}>
                                        {editing ? '적용' : '수정'}
                                    </Button>
                                    </Typography>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </Fragment>
                    )
                }
                
            </div>
        );
    }
}

PhoneInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PhoneInfo);