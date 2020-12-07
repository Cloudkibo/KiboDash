exports.createPayload = {
  'type': 'object',
  'properties': {
    'companyId': {
      'type': 'string'
    },
    'pageId': {
      'type': 'string'
    },
    'userId': {
      'type': 'string'
    },
    'messages': {
      'type': 'object',
      'properties': {
        'sent': {'type': 'number'}
      }
    },
    'sessions': {
      'type': 'object',
      'properties': {
        'total': {'type': 'number'},
        'pending': {'type': 'number'},
        'open': {'type': 'number'},
        'resolved': {'type': 'number'}
      }
    },
    'responses': {'type': 'number'},
    'avgRespTime': {
      'type': 'string'
    },
    'maxRespTime': {
      'type': 'string'
    },
    'avgResolveTime': {
      'type': 'boolean'
    }
  },
  'required': [
    'companyId',
    'pageId',
    'userId',
    'messages',
    'sessions',
    'avgRespTime',
    'maxRespTime',
    'avgResolveTime'
  ]
}

exports.updatePayload = {
  'type': 'object',
  'properties': {
    'query': {
      'type': 'object',
      'properties': {
        'companyId': {
          'type': 'string'
        },
        'pageId': {
          'type': 'string'
        },
        'userId': {
          'type': 'string'
        },
        'messages': {
          'type': 'object',
          'properties': {
            'sent': {'type': 'number'}
          }
        },
        'sessions': {
          'type': 'object',
          'properties': {
            'total': {'type': 'number'},
            'pending': {'type': 'number'},
            'open': {'type': 'number'},
            'resolved': {'type': 'number'}
          }
        },
        'responses': {'type': 'number'},
        'avgRespTime': {
          'type': 'string'
        },
        'maxRespTime': {
          'type': 'string'
        },
        'avgResolveTime': {
          'type': 'boolean'
        }
      }
    },
    'updated': {
      'type': 'object',
      'properties': {
        'companyId': {
          'type': 'string'
        },
        'pageId': {
          'type': 'string'
        },
        'userId': {
          'type': 'string'
        },
        'messages': {
          'type': 'object',
          'properties': {
            'sent': {'type': 'number'}
          }
        },
        'sessions': {
          'type': 'object',
          'properties': {
            'total': {'type': 'number'},
            'pending': {'type': 'number'},
            'open': {'type': 'number'},
            'resolved': {'type': 'number'}
          }
        },
        'avgRespTime': {
          'type': 'string'
        },
        'maxRespTime': {
          'type': 'string'
        },
        'avgResolveTime': {
          'type': 'boolean'
        }
      }
    }
  },
  'required': [
    'query',
    'updated'
  ]
}

exports.findPayload = {
  'type': 'object',
  'properties': {
    'companyId': {
      'type': 'string'
    },
    'pageId': {
      'type': 'string'
    },
    'userId': {
      'type': 'string'
    },
    'messages': {
      'type': 'object',
      'properties': {
        'sent': {'type': 'number'}
      }
    },
    'sessions': {
      'type': 'object',
      'properties': {
        'total': {'type': 'number'},
        'pending': {'type': 'number'},
        'open': {'type': 'number'},
        'resolved': {'type': 'number'}
      }
    },
    'avgRespTime': {
      'type': 'string'
    },
    'maxRespTime': {
      'type': 'string'
    },
    'avgResolveTime': {
      'type': 'boolean'
    }
  }
}
