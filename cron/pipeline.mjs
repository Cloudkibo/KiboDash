export const filterConnectedPages = { $match: { connected: true } }
export const countResults = { $group: { _id: null, count: { $sum: 1 } } }
export const joinPageWithSubscribers = {
  $lookup:
  {
    from: 'subscribers',
    localField: '_id',
    foreignField: 'pageId',
    as: 'pageSubscribers'
  }
}
export const selectPageFields = {
  $project: {
    _id: true,
    pageName: true,
    pageId: true,
    pageUserName: true,
    likes: true,
    numberOfSubscribers: { $size: '$pageSubscribers' },
    numberOfBroadcasts: {
      $literal: 0
    },
    numberOfPolls: {
      $literal: 0
    },
    numberOfSurveys: {
      $literal: 0
    }
  }
}

export const pageWiseAggregate = {

  $group: {
    _id: {
      pageId: '$pageId'
    },
    totalCount: { $sum: 1 }
  }
}

export const companyWisePageCount = {
  $group: {
    _id: '$companyId',
    totalPages: { $sum: 1 }
  }
}

export const joinCompanyWithSubscribers = {
  $lookup:
  {
    from: 'subscribers',
    localField: 'companyId',
    foreignField: 'companyId',
    as: 'companysubscribers'
  }
}

export const selectCompanyFields = {
  $project: {
    companyId: true,
    numberOfSubscribers: { $size: '$companysubscribers' },
    numberOfBroadcasts: {
      $literal: 0
    },
    numberOfPolls: {
      $literal: 0
    },
    numberOfSurveys: {
      $literal: 0
    },
    numberOfPages: {
      $literal: 0
    },
    numberOfConnectedPages: {
      $literal: 0
    }
  }
}

export const companyWiseAggregate = {
  $group: {
    _id: '$companyId',
    totalCount: { $sum: 1 }
  }

}
