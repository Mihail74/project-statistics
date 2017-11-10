 export default class ApiError {
   constructor(code, cause) {
     this.code = code;
     this.cause = cause || "";
   }
 }
