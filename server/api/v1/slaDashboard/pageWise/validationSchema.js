exports.createPayload = {
  'type': 'object',
  'properties': {
    'companyId': {
      'type': 'string'
    },
    'pageId': {
      'type': 'string'
    },
    'messages': {
      'type': 'object',
      'properties': {
        'sent': {'type': 'number'},
        'received': {'type': 'number'}
      }
    },
    'sessions': {
      'type': 'object',
      'properties': {
        'new': {'type': 'number'},
        'pending': {'type': 'number'},
        'open': {'type': 'number'},
        'resolved': {'type': 'number'}
      }
    },
    'responses': {'type': 'number'},
    'avgRespTime': {
      'type': 'number'
    },
    'maxRespTime': {
      'type': 'number'
    },
    'avgResolveTime': {
      'type': 'number'
    }
  },
  'required': [
    'companyId',
    'pageId'
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
        'messages': {
          'type': 'object',
          'properties': {
            'sent': {'type': 'number'},
            'received': {'type': 'number'}
          }
        },
        'sessions': {
          'type': 'object',
          'properties': {
            'new': {'type': 'number'},
            'pending': {'type': 'number'},
            'open': {'type': 'number'},
            'resolved': {'type': 'number'}
          }
        },
        'responses': {'type': 'number'},
        'avgRespTime': {
          'type': 'number'
        },
        'maxRespTime': {
          'type': 'number'
        },
        'avgResolveTime': {
          'type': 'number'
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
        'messages': {
          'type': 'object',
          'properties': {
            'sent': {'type': 'number'},
            'received': {'type': 'number'}
          }
        },
        'sessions': {
          'type': 'object',
          'properties': {
            'new': {'type': 'number'},
            'pending': {'type': 'number'},
            'open': {'type': 'number'},
            'resolved': {'type': 'number'}
          }
        },
        'responses': {'type': 'number'},
        'avgRespTime': {
          'type': 'number'
        },
        'maxRespTime': {
          'type': 'number'
        },
        'avgResolveTime': {
          'type': 'number'
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
    'messages': {
      'type': 'object',
      'properties': {
        'sent': {'type': 'number'},
        'received': {'type': 'number'}
      }
    },
    'sessions': {
      'type': 'object',
      'properties': {
        'new': {'type': 'number'},
        'pending': {'type': 'number'},
        'open': {'type': 'number'},
        'resolved': {'type': 'number'}
      }
    },
    'responses': {'type': 'number'},
    'avgRespTime': {
      'type': 'number'
    },
    'maxRespTime': {
      'type': 'number'
    },
    'avgResolveTime': {
      'type': 'number'
    }
  }
}
