import React, {Component} from 'react';
import './App.css';
import Footer from './shared/components/footer'
import Routes from './routes';
import {withStyles} from '@material-ui/core/styles'
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

const User = ({match}) => {
    return (<h1> 사용자 상세 정보: {match.params.username}</h1>)
};

class App extends Component {
    /* Mounting
        1) constructor()

        2) componentWillMount() // deprecated

        3) render()

        4) componentDidMount()
     */

    /* state Change
        1) shouldComponentUpdate  (true or false) // 낭비 자원 처리
                    true일경우
        2) componentWillUpdate

        3) render

        4) componentDidUpdate
     */

    componentDidMount() {
        /**
         * 1) Login한 계정의 Autority를 가져와서 Root Props 설정 => Props 전달의 불편함....
         */
    }

    componentDidCatch(error, errorInfo) {
        console.log(`compoentn Did Catch ${error}`);
    }

   /* stateRefresh = () => {
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
    };*/

   /**
    * keyword 검색 event
    **/
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    render() {
        const {classes} = this.props;
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
                        {/*<div className={classes.search}>
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
                        </div>*/}
                    </Toolbar>
                </AppBar>
                <Routes/>
                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(App);
