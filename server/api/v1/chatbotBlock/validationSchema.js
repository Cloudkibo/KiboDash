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
      'type': 'string'
    },
    'uniqueId': {
      'type': 'string'
    },
    'payload': {
      'type': 'string'
    },
    'options': {
      'type': 'string'
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
          'type': 'string'
        },
        'uniqueId': {
          'type': 'string'
        },
        'payload': {
          'type': 'string'
        },
        'options': {
          'type': 'string'
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
          'type': 'string'
        },
        'uniqueId': {
          'type': 'string'
        },
        'payload': {
          'type': 'string'
        },
        'options': {
          'type': 'string'
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
      'type': 'string'
    },
    'uniqueId': {
      'type': 'string'
    },
    'payload': {
      'type': 'string'
    },
    'options': {
      'type': 'string'
    }
  }
}
