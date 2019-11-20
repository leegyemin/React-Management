import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete';
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import CustomerAdd from './CustomerAdds';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    image: {
        minHeight: 75,
        maxHeight: 75,
        minWidth: 100,
        maxWidth: 100
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
        display: 'flex',
        justifyContent: 'flex-end'
    },
});

class Customer extends React.Component {
    state = {       // 상태 변화가 필요한 값
        customers: "",
        searchKeyword: ""
    };

    componentDidMount() {
        this.callApi().then(res => {
            this.setState({customers: res})
        }).catch(err => console.log(err))
    }

    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    };

    render() {
        const filterComponents = () => {
            let data = this.state.customers.filter((c) => {
                return c.name.indexOf(this.state.searchKeyword) > -1
            });
            return data.map((c) => {
                return <Customer stateRefresh={this.stateRefresh}
                                 key={c.id}
                                 id={c.id}
                                 image={c.image}
                                 name={c.name}
                                 birthday={c.birthday}
                                 gender={c.gender}
                                 job={c.job}/>
            })
        };

        const {classes} = this.props;
        const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "삭제"];
        return (
            <div>
                <div className={classes.menu}>
                    <CustomerAdd/>
                </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    cellList.map((c, index) => {
                                        return <TableCell key={index}
                                                          className={classes.tableHead}>{c}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.customers ?
                                this.state.customers.map((c) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{c.id}</TableCell>
                                            <TableCell><img className={classes.image} src={c.image}
                                                            alt="profile"/></TableCell>
                                            <TableCell><Link to={`/user/${c.name}`}>{c.name}</Link></TableCell>
                                            <TableCell>{c.birthday}</TableCell>
                                            <TableCell>{c.gender}</TableCell>
                                            <TableCell>{c.job}</TableCell>
                                            <TableCell><CustomerDelete stateRefresh={c.stateRefresh}
                                                                       id={c.id}/></TableCell>
                                        </TableRow>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan={7}
                                               align="center"><CircularProgress/></TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Customer);
