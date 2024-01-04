import constant from "../../constant/constant.js";
import Log from "../../db/model/log.js";
// import Log  from "../../db/model/log.js";
import rabbitMqHelper from "../../helper/rabbitMqHelper.js";

class logController {

  storeLog = async (req, res) => {

    try {
         
      const{commit}=req.body;

      const isDataExist= await Log.findOne({'commit':commit});
        if(isDataExist) return res.json({ status: 0, Message: constant.MESSAGE_EXIST});
      
        console.log(isDataExist);
      await rabbitMqHelper.send(process.env.QUEUE, JSON.stringify(req.body));

      res.json({ status: 1, Message: constant.SUCCESS })


    } catch (error) {
      console.log("ERROR :", error);
      res.json({ status: 0, Message: constant.FAIL, error: error.message })

    }


  }

  filter = async (req, res) => {
    try {
      const searchQuery = req.query.Search;
      const date = new Date(searchQuery);
      const page=req.query.page||1;
      const limit=parseInt(process.env.limit);
 
      const offset=(parseInt(page)-1)*limit;
      
      
      // const project = [
      //   {
      //     $match: {
      //       $or: [
      //         { level: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //         { message: { $regex: new RegExp(searchQuery, 'i') } },
      //         { resourceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //         { timestamp: { $eq: date } },
      //         { traceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //         { spanId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //         { commit: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //         { "metadata.parentResourceId": { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
      //       ],
      //     },
      //   },
      //   {
      //     $count: 'total',
      //   },
      //   {
      //     $skip: offset,
      //   },
      //   {
      //     $limit: limit,
      //   },
        
      // ];

      const project = [
        {
          $facet: {
            data: [
              {
                $match: {
                  $or: [
                    { level: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { message: { $regex: new RegExp(searchQuery, 'i') } },
                    { resourceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { timestamp: { $eq: date } },
                    { traceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { spanId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { commit: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { "metadata.parentResourceId": { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                  ],
                },
              },
              {
                $skip: offset,
              },
              {
                $limit: limit,
              },
            ],
            totalCount: [
              {
                $match: {
                  $or: [
                    { level: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { message: { $regex: new RegExp(searchQuery, 'i') } },
                    { resourceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { timestamp: { $eq: date } },
                    { traceId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { spanId: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { commit: { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                    { "metadata.parentResourceId": { $regex: new RegExp(`^${searchQuery}$`, 'i') } },
                  ],
                },
              },
              {
                $count: 'total',
              },
            ],
          },
        },
      ];
      const data = await Log.aggregate(project);

      console.log("data===>",data);
      res.json({ status: 1, data: data[0].data,count: data[0].totalCount[0].total});
    } catch (error) {
      res.json({ status: 0, error: error.message });
    }
  };
  
  


}




export default new logController();