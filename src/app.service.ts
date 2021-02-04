import { Injectable, HttpService } from '@nestjs/common';
import checksum from "paytmchecksum";
import axios from "axios";


@Injectable()
export default class AppService {
  
  async initiateTransaction(body) {
    let param: { body: any, head: any} = {
      body: null,
      head: null,
    };

    param.body = {
      "requestType"   : "Payment",
      "mid"           : "YOUR_MID_HERE",
      "websiteName"   : "WEBSTAGING",
      "orderId"       : body.orderId,
      "txnAmount"     : {
          "value"     : body.amount,
          "currency"  : "INR",
      },
      "userInfo"      : {
          "custId"    : body.custId,
      },
    };

    const checksumHash = await checksum.generateSignature(JSON.stringify(param), "Merchant key");
    param.head = {
      signature: checksumHash,
    };

    const post_data = JSON.stringify(param);

    const response = await axios.post(`securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765${body.orderId}`,post_data);
    return response;
  }
}
