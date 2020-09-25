exports.createPayload = {
  'type': 'object',
  'properties': {
    'chatbotId': {
      'type': 'string'
    },
    'title': {
      'type': 'string'
    },
    'companyId': {
      'type': 'string'
    },
    'userId': {
      'type': 'string'
    },
    'triggers': {
      'type': 'array'
    },
    'uniqueId': {
      'type': 'string'
    },
    'payload': {
      'type': 'array'
    },
    'options': {
      'type': 'array'
    }
  },
  'required': [
    'chatbotId',
    'title',
    'companyId',
    'userId',
    'uniqueId',
    'payload'
  ]
}

exports.updatePayload = {
  'type': 'object',
  'properties': {
    'query': {
      'type': 'object',
      'properties': {
        'chatbotId': {
          'type': 'string'
        },
        'title': {
          'type': 'string'
        },
        'companyId': {
          'type': 'string'
        },
        'userId': {
          'type': 'string'
        },
        'triggers': {
          'type': 'array'
        },
        'uniqueId': {
          'type': 'string'
        },
        'payload': {
          'type': 'array'
        },
        'options': {
          'type': 'array'
        }
      }
    },
    'updated': {
      'type': 'object',
      'properties': {
        'chatbotId': {
          'type': 'string'
        },
        'title': {
          'type': 'string'
        },
        'companyId': {
          'type': 'string'
        },
        'userId': {
          'type': 'string'
        },
        'triggers': {
          'type': 'array'
        },
        'uniqueId': {
          'type': 'string'
        },
        'payload': {
          'type': 'array'
        },
        'options': {
          'type': 'array'
        }
      }
    }
  },
  'required': [
    'query',
    'updated'
  ]
}

exports.chatbotBlockObject = {
  'type': 'object',
  'properties': {
    'chatbotId': {
      'type': 'string'
    },
    'title': {
      'type': 'string'
    },
    'companyId': {
      'type': 'string'
    },
    'userId': {
      'type': 'string'
    },
    'triggers': {
      'type': 'array'
    },
    'uniqueId': {
      'type': 'string'
    },
    'payload': {
      'type': 'array'
    },
    'options': {
      'type': 'array'
    }
  }
}
