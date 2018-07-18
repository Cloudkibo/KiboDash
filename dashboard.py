import dash
from dash.dependencies import Input, Output, State
import dash_core_components as dcc
import dash_html_components as html
import dash_table_experiments as dt
import json
import pandas as pd
import plotly
import sys
sys.path.insert(0, './model')
import PageAggregate as page_aggregate_model
import UserAggregate as user_aggregate_model
import PlatformAggregate as plaform_aggregate_model


app = dash.Dash()
app.css.config.serve_locally = True
app.scripts.config.serve_locally = True

page_data = page_aggregate_model.get_data_remote()
user_data = user_aggregate_model.get_data_remote()
platform_data = plaform_aggregate_model.get_data_remote()

app.layout = html.Div([
    html.H1('KiboDash', style={
            'textAlign': 'center', 'margin': '48px 0', 'fontFamily': 'system-ui'}),
    dcc.Tabs(id="tabs", children=[
        dcc.Tab(label='Page Aggregate Data', children=[
            html.Div([
                html.H3('Page Aggregate Data Table', style={'textAlign': 'center'}),
                dt.DataTable(
                    rows=page_data['rows'],
                    row_selectable=True,
                    filterable=True,
                    sortable=True,
                    selected_row_indices=[],
                    id='datatable-page-aggregate'
                ),
                html.Div(id='selected-indexes'),
                dcc.Graph(
                    id='graph-page-aggregate'
                )
            ], className="container")
        ]),
        dcc.Tab(label='User Aggregate Data', children=[
            html.Div([
                html.H3('User Aggregate Data Table', style={'textAlign': 'center'}),
                dt.DataTable(
                    rows=user_data['rows'],
                    row_selectable=True,
                    filterable=True,
                    sortable=True,
                    selected_row_indices=[],
                    editable=False,
                    id='datatable-user-aggregate'
                ),
                html.Div(id='selected-indexes'),
                dcc.Graph(
                    id='graph-user-aggregate'
                )
            ], className="container", style= {'overflow' : 'scroll', 'width': '100%'})
        ]),
        dcc.Tab(label='Platform Aggregate Data', children=[
            html.Div([
                html.H3('Total Pages: {}'.format(platform_data['rows'][0]['totalPages']), style={'textAlign': 'center'}),
                html.H3('Total Connected Pages: {}'.format(platform_data['rows'][0]['totalConnectedPages']), style={'textAlign': 'center'}),
                html.H3('Total Subscribers: {}'.format(platform_data['rows'][0]['totalSubscribers']), style={'textAlign': 'center'}),
                html.H3('Total Broadcasts: {}'.format(platform_data['rows'][0]['totalBroadcasts']), style={'textAlign': 'center'}),
                html.H3('Total Surveys: {}'.format(platform_data['rows'][0]['totalSurveys']), style={'textAlign': 'center'}),
                html.H3('Total Polls: {}'.format(platform_data['rows'][0]['totalPolls']), style={'textAlign': 'center'}),
            ], className="container")
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

@app.callback(
    Output('datatable-page-aggregate', 'selected_row_indices'),
    [Input('graph-page-aggregate', 'clickData')],
    [State('datatable-page-aggregate', 'selected_row_indices')])
def update_selected_row_indices(clickData, selected_row_indices):
    print('click')
    if clickData:
        for point in clickData['points']:
            if point['pointNumber'] in selected_row_indices:
                selected_row_indices.remove(point['pointNumber'])
            else:
                selected_row_indices.append(point['pointNumber'])
    return selected_row_indices


@app.callback(
    Output('graph-page-aggregate', 'figure'),
    [Input('datatable-page-aggregate', 'rows'),
     Input('datatable-page-aggregate', 'selected_row_indices')])
def update_figure(rows, selected_row_indices):
    print('figure updating')
    dff = pd.DataFrame(rows)
    fig = plotly.tools.make_subplots(
        rows=4, cols=1,
        subplot_titles=('Total Subscribers', 'Total Broadcasts', 'Total Polls', 'Total Surveys'),
        shared_xaxes=True)
    marker = {'color': ['#0074D9']*len(dff)}
    for i in (selected_row_indices or []):
        marker['color'][i] = '#FF851B'
    fig.append_trace({
        'x': dff['pageName'],
        'y': dff['totalSubscribers'],
        'type': 'bar',
        'marker': marker
    }, 1, 1)
    fig.append_trace({
        'x': dff['pageName'],
        'y': dff['totalBroadcasts'],
        'type': 'bar',
        'marker': marker
    }, 2, 1)
    fig.append_trace({
        'x': dff['pageName'],
        'y': dff['totalPolls'],
        'type': 'bar',
        'marker': marker
    }, 3, 1)
    fig.append_trace({
        'x': dff['pageName'],
        'y': dff['totalSurveys'],
        'type': 'bar',
        'marker': marker
    }, 4, 1)
    fig['layout']['showlegend'] = False
    fig['layout']['height'] = 800
    fig['layout']['margin'] = {
        'l': 40,
        'r': 10,
        't': 60,
        'b': 50
    }
    return fig


@app.callback(
    Output('datatable-user-aggregate', 'selected_row_indices'),
    [Input('graph-user-aggregate', 'clickData')],
    [State('datatable-user-aggregate', 'selected_row_indices')])
def update_selected_row_indices(clickData, selected_row_indices):
    if clickData:
        for point in clickData['points']:
            if point['pointNumber'] in selected_row_indices:
                selected_row_indices.remove(point['pointNumber'])
            else:
                selected_row_indices.append(point['pointNumber'])
    return selected_row_indices


@app.callback(
    Output('graph-user-aggregate', 'figure'),
    [Input('datatable-user-aggregate', 'rows'),
     Input('datatable-user-aggregate', 'selected_row_indices')])
def update_figure(rows, selected_row_indices):
    dff = pd.DataFrame(rows)
    print('updating figure')
    fig = plotly.tools.make_subplots(
        rows=6, cols=1,
        subplot_titles=('Total Connected Pages', 'Total Pages', 'Total Subscribers', 'Total Broadcasts', 'Total Polls', 'Total Surveys'),
        shared_xaxes=True)
    marker = {'color': ['#0074D9']*len(dff)}
    for i in (selected_row_indices or []):
        marker['color'][i] = '#FF851B'

    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalConnectedPages'],
        'type': 'bar',
        'marker': marker
    }, 1, 1)
    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalPages'],
        'type': 'bar',
        'marker': marker
    }, 2, 1)
    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalSubscribers'],
        'type': 'bar',
        'marker': marker
    }, 3, 1)
    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalBroadcasts'],
        'type': 'bar',
        'marker': marker
    }, 4, 1)
    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalPolls'],
        'type': 'bar',
        'marker': marker
    }, 5, 1)
    fig.append_trace({
        'x': dff['email'],
        'y': dff['totalSurveys'],
        'type': 'bar',
        'marker': marker
    }, 6, 1)
    fig['layout']['showlegend'] = False
    fig['layout']['height'] = 800
    fig['layout']['margin'] = {
        'l': 40,
        'r': 10,
        't': 60,
        'b': 150
    }
    return fig

if __name__ == '__main__':
    app.run_server(debug=True)
