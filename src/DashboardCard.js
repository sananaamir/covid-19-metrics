import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

function DashboardCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.metricType}:
                </Typography>
                <Divider />
                <Typography variant="h5" component="h2" style={{ paddingTop: '4%' }}>
                    {props.metric}
                </Typography>
            </CardContent>
            <CardActions>
                <div style={{ maxWidth: '100%', background: props.color, width: '500px', height: '10px' }}></div>
            </CardActions>
        </Card>
    )
}
export default DashboardCard