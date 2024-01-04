import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  resourceId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  traceId: {
    type: String,
    required: true
  },
  spanId: {
    type: String,
    required: true
  },
  commit: {
    type: String,
    required: true,
    index: true

  },
  metadata: {
    parentResourceId: {
      type: String
    }
  }
});


const Log = mongoose.model('Log', logSchema);

export default Log;