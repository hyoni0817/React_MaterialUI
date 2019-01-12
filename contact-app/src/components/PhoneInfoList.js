import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';


class PhoneInfoList extends Component {
    static defaultProps = {
        data: []
    }
  

    render() {
        const { data, onRemove, onUpdate } =this.props;

        console.log(this.props);
        //if(!data) return null;
        //data가 없으면 아래 내용을 진행하지않겠다는 의미

        console.log('rendering list');
        
        //만역 this.props가 데이터를 전달받지 못하면 map을 사용하려할 때 data가 배열이 아니라고 오류가 뜰것이다.        
        const list = data.map(
            info => (
                <PhoneInfo 
                    onRemove={onRemove} 
                    onUpdate={onUpdate}
                    info={info} 
                    key={info.id} 
                />)
        )
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;
