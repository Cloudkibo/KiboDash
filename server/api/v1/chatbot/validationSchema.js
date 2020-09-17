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
    'startingBlockId': {
      'type': 'string'
    },
    'published': {
      'type': 'boolean'
    }
  },
  'required': [
    'chatbotId',
    'title',
    'companyId',
    'userId',
    'published'
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
        'startingBlockId': {
          'type': 'string'
        },
        'published': {
          'type': 'boolean'
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
        'startingBlockId': {
          'type': 'string'
        },
        'published': {
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

exports.chatbotObject = {
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
    'startingBlockId': {
      'type': 'string'
    },
    'published': {
      'type': 'boolean'
    }
  }
}
