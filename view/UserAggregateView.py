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
import UserAggregate as user_aggregate_model


app = dash.Dash()
app.css.config.serve_locally = True
app.scripts.config.serve_locally = True

data = user_aggregate_model.get_data_remote()

app.layout = html.Div([
    html.H1('KiboDash', style={
            'textAlign': 'center', 'margin': '48px 0', 'fontFamily': 'system-ui'}),
    dcc.Tabs(id="tabs", children=[
        dcc.Tab(label='User Aggregate Data', children=[
            html.Div([
                html.H3('User Aggregate Data Table', style={'textAlign': 'center'}),
                dt.DataTable(
                    rows=data['rows'],
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
