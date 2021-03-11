export  default (context, inject) => {
  inject('worker', {
   createWorker () {
   return  new  SessionWorker()
  }
 })
}