import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '홍길동',
        'birthday': '870128',
        'gender': '남',
        'job': '대학생'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '이계민',
        'birthday': '111111',
        'gender': '남',
        'job': '프로그래머'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '김성남',
        'birthday': '888888',
        'gender': '여',
        'job': '디자이너'
    }
];

class App extends Component {
    render() {
        return (
            <div>
                {
                    customers.map(c => {
                        return <Customer
                            key={c.id}
                            id={c.id}
                            image={c.image}
                            name={c.name}
                            birthday={c.birthday}
                            gender={c.gender}
                            job={c.job}/>
                    })
                }
            </div>
        )
    }
}

export default App;
