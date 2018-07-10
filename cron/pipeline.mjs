export const filterConnectedPages = { $match: { connected: true } }
export const countResults = { $group : { _id : null,  count : { $sum : 1 } } }
export const joinPageWithSubscribers =    {
     $lookup:
       {
         from: "subscribers",
         localField: "_id",
         foreignField: "pageId",
         as: "pageSubscribers"
       }
  }
export const selectPageFields =  {
     $project: {
        _id: true,
        pageName: true,
        pageId: true,
        pageUserName: true,
        likes: true,
        numberOfSubscribers: { $size: "$pageSubscribers" },
        numberOfBroadcasts: {
                $literal: 0,
        },
        numberOfPolls: {
                $literal: 0
        },
        numberOfSurveys: {
                $literal: 0
        },
     }
  }

export const broadcastPageCount = {
         $project: {
            pageCount: { $size: "$segmentationPageIds" }
         }
      }

export const filterZeroPageCount = {
          $match: {
            pageCount: 0
          }
      }

export const selectPageIdAndPageCount = {
         $project: {
            segmentationPageIds: true,
            pageCount: { $size: "$segmentationPageIds" },
         }
      }

export const getPageCountGreaterThanZero = {
      $match: {
        pageCount: {
          $gt: 0
        }
      }
    }
export const expandPageIdArray = { $unwind : "$segmentationPageIds" }

export const countByPageId = { $group : { _id : "$segmentationPageIds",  count : { $sum : 1 } } }

