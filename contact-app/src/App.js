import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
});

class App extends Component {
  id = 3; // id값은 렌더링 되는 값이 아니기 때문에 굳이 setState에 넣어줄 필요없다.
  state = {
    information: [
      {
        id: 0,
        name: '홍길동',
        phone: '010-0000-0001'
      },
      {
        id: 1,
        name: '전지현',
        phone: '010-0000-0002'
      },
      {
        id: 2,
        name: '강동원',
        phone: '010-0000-0003'
      },
    ], //컴포넌트 최적화 작업을 할 때 사전에 초기값이 미리 있는게 편하다
    keyword:'',
  }


  handleCreate = (data) => {
    //this.state.information.push(data); 처럼 사용하면 절대 안된다.
    //위의 코드를 사용하면 리렌더링 조차 안된다.
    //push를 사용하지 않고 concat이라는 내장함수를 사용한다.
    // this.setState({
    //   information:this.state.information, 
    // }) 이렇게도 해주면 안된다.
    const { information } = this.state;
    this.setState({
      information:information.concat(Object.assign({}, data, {
        //...data,
        // name:data.name,
        // phone:data.phone,
        id: this.id++
      }))
    });
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState ({
      //info 값이 info.id가 파라미터로 받은 id가 아닌 것들만 필터링 하기
      information : information.filter(info => info.id !== id) 
    })
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => {
          if(info.id === id) {
            return {
              id, 
              ...data,
            };
          }
          return info;
        }
      )
    })
  }


  handleChange  = (e) => {
    this.setState({
      keyword:e.target.value,
    });
  };

  render() {

    const { classes } = this.props;

    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        {/*Ctrl 키를 누르고 아래 phoneInfoList 에 마우스 커서를 대면 파일을 바로 열 수 있다.*/}
        <TextField
          id="standard-name"
          label="검색"
          className={classes.textField}
          value={this.state.keyword}
          onChange={this.handleChange}
          margin="normal"
        />

        <PhoneInfoList 
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1 //일치하는 값이 없으면 -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

