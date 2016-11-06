export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;

    
  }
  postMessage(){
	  console.log("post");
	  this.$http.post('http://localhost:8080/api/message',{msg:this.message});
  }

 
}
