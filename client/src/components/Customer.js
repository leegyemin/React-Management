import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete';
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

const styles = theme => ({
    image: {
        minHeight: 75,
        maxHeight: 75,
        minWidth: 100,
        maxWidth: 100
    }
});

class Customer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img className={classes.image} src={this.props.image} alt="profile"/></TableCell>
                <TableCell><Link to={`/user/${this.props.name}`}>{this.props.name}</Link></TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(Customer);
