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
export const selectPageFields =   {
         $project: {
            _id: true,
            pageName: true,
            pageId: true,
            pageUserName: true,
            likes: true,
            numberOfSubscribers: { $size: "$pageSubscribers" }
         }
      }


