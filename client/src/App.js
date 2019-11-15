import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdds';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'


const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    paper: {
        marginLeft: 18,
        marginRight: 18

    },
    tableHead: {
        fontSize: '1.0rem'
    },
    progress: {
        margin: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class App extends Component {
    state = {       // 상태 변화가 필요한 값
        customers: "",
        searchKeyword: ""
    };

    /*
        1) constructor()

        2) componentWillMount()

        3) render()

        4) componentDidMount()
     */

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

    stateRefresh = () => {
        console.log('state refresh');
        this.setState({
            customers: '',
            completed: 0,
            searchKeyword: ''
        });
        this.callApi()
            .then(res => {
                this.setState({customer: res})
            })
            .catch(err => console.log(err))
    };

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            고객 관리 시스템
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="검색..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <CustomerAdd/>
                </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    cellList.map((c, index) => {
                                        return <TableCell key={index} className={classes.tableHead}>{c}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.customers ? filterComponents() :
                                <TableRow>
                                    <TableCell colSpan={7} align="center"><CircularProgress/></TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(App);
