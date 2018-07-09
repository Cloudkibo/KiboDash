import dash
import dash_html_components as html
import dash_core_components as dcc
from dash.dependencies import Input, Output, State

app = dash.Dash()

app.css.config.serve_locally = True
app.scripts.config.serve_locally = True

app.layout = html.Div([
    html.H1('KiboDash', style={
            'textAlign': 'center', 'margin': '48px 0', 'fontFamily': 'system-ui'}),
    dcc.Tabs(id="tabs", vertical=True, children=[
        dcc.Tab(label='Page Aggregate Data', children=[
            html.Div([
                dcc.Graph(
                    id='example-graph',
                    figure={
                        'data': [
                            {'x': [1, 2, 3], 'y': [4, 1, 2],
                                'type': 'bar', 'name': 'SF'},
                            {'x': [1, 2, 3], 'y': [2, 4, 5],
                             'type': 'bar', 'name': u'Montréal'},
                        ],
                        'layout': {
                            'title': 'Dash Data Visualization'
                        }
                    }
                )
            ])
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