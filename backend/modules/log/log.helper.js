import Log from "../../db/model/log.js";
import rabbitMqHelper from "../../helper/rabbitMqHelper.js";
import * as dotenv from "dotenv";
dotenv.config();
class StoreLogs {
  constructor() {
    setTimeout(()=>{
    rabbitMqHelper.consumeQueue(process.env.QUEUE, async (receivedData) => {
      try {
        if (receivedData) {
          const parsedData = JSON.parse(receivedData.toString());
          console.error("InConsume====>", parsedData);
          if(parsedData) this.storeInDb(parsedData);
        }
      } catch (error) {
        console.log("errorInConsume===>", error);
      }
    });

    //Second Consumer
    rabbitMqHelper.consumeQueue(process.env.QUEUE, async (receivedData) => {
      try {
        if (receivedData) {
          const parsedData = JSON.parse(receivedData.toString());
          console.error("InConsume====>", parsedData);
          if(parsedData) this.storeInDb(parsedData);
        }
      } catch (error) {
        console.log("errorInConsume===>", error);
      }
    });
    //3rd Consumer
    rabbitMqHelper.consumeQueue(process.env.QUEUE, async (receivedData) => {
      try {
        if (receivedData) {
          const parsedData = JSON.parse(receivedData.toString());
          console.error("InConsume====>", parsedData);
          if(parsedData) this.storeInDb(parsedData);
        }
      } catch (error) {
        console.log("errorInConsume===>", error);
      }
    });
  },1000)
}

 async storeInDb(data){
  try{
  
    const dataStored = await Log.create(data);
  }
  catch{
    console.log("errorInStoredData===>", error);
  }
}

}

export default new StoreLogs();
