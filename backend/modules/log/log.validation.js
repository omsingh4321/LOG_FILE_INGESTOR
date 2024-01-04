
import {body} from 'express-validator';
import * as constant from '../../constant/constant.js';


class logValidation{

   
     logBody=[
        body("level")
        .notEmpty()
        .withMessage(constant.NO_LEVEL_PARAM),
        body("message")
        .notEmpty()
        .withMessage(constant.NO_MESSAGE_PARAMETER),
        body("resourceId")
        .notEmpty()
        .withMessage(constant.NO_RESOURCE_ID_PARAMETER),
        body("traceId")
        .notEmpty()
        .withMessage(constant.NO_TRACE_ID_PARAMETER),
        body("spanId")
        .notEmpty()
        .withMessage(constant.NO_SPAN_ID_PARAMETER),
        body("commit")
        .notEmpty()
        .withMessage(constant.NO_COMMIT_PARAMETER),
        body("metadata")
        .notEmpty()
        .withMessage(constant.NO_METADATA_PARAMETER),
        body("timestamp")
        .notEmpty()
        .withMessage(constant.NO_TIMESTAMP_PARAMETER)
    
    
    ]
   
}

export default  new logValidation();













































export {}