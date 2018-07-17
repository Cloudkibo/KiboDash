import dash
from dash.dependencies import Input, Output, State
import dash_core_components as dcc
import dash_html_components as html
import dash_table_experiments as dt
import json
import pandas as pd
import plotly
import sys
sys.path.insert(0, '../model')
import PlatformAggregate as platform_aggregate_model


app = dash.Dash()
app.css.config.serve_locally = True
app.scripts.config.serve_locally = True

data = platform_aggregate_model.get_data_local()

app.layout = html.Div([
    html.H1('KiboDash', style={
            'textAlign': 'center', 'margin': '48px 0', 'fontFamily': 'system-ui'}),
    dcc.Tabs(id="tabs", children=[
        dcc.Tab(label='Platform Aggregate Data', children=[
            html.Div([
                html.H3('Total Pages: {}'.format(data['rows'][0]['totalPages']), style={'textAlign': 'center'}),
                html.H3('Total Connected Pages: {}'.format(data['rows'][0]['totalConnectedPages']), style={'textAlign': 'center'}),
                html.H3('Total Subscribers: {}'.format(data['rows'][0]['totalSubscribers']), style={'textAlign': 'center'}),
                html.H3('Total Broadcasts: {}'.format(data['rows'][0]['totalBroadcasts']), style={'textAlign': 'center'}),
                html.H3('Total Surveys: {}'.format(data['rows'][0]['totalSurveys']), style={'textAlign': 'center'}),
                html.H3('Total Polls: {}'.format(data['rows'][0]['totalPolls']), style={'textAlign': 'center'}),
            ], className="container")
        ]),
        dcc.Tab(label='Platform Aggregate Data', children=[
            html.Div([
                html.H1("This is the content in tab 2"),
                html.P("A graph here would be nice!")
            ])
        ]),
        dcc.Tab(label='User Aggregate Data', children=[
            html.Div([
                html.H1("This is the content in tab 3"),
            ])
        ]),
    ],
        style={
        'fontFamily': 'system-ui'
    },
        content_style={
        'border': '1px solid #d6d6d6',
        'padding': '44px'
    },
        parent_style={
        'maxWidth': '1000px',
        'margin': '0 auto'
    }
    )
])


if __name__ == '__main__':
    app.run_server(debug=True)
