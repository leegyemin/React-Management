import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'


const User = ({match}) => {
    return (<h1> 사용자 상세 정보:  {match.params.username}</h1>)
};

const Routes = () => {
    <Router>
        <Route path="/" exact render={
            () => {
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
                                    {this.state.customers ? filterComponents() :
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
        }/>
        <Route path="/test" render={
            () => {
                return (
                    <h2> test component</h2>
                )
            }
        }/>
        <Route path="/user/:username" component={User}/>
    </Router>
}

export default Routes;
