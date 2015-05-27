function createServiceSink(execlib,ParentSink){

  if(!ParentSink){
    ParentSink = execlib.execSuite.registry.get('.').SinkMap.get('user');
  }

  function ServiceSink(prophash,client){
    ParentSink.call(this,prophash,client);
  }
  ParentSink.inherit(ServiceSink,require('../methoddescriptors/serviceuser'));
  ServiceSink.prototype.__cleanUp = function(){
    ParentSink.prototype.__cleanUp.call(this);
  };
  ServiceSink.prototype.createStateFilter = function(){
    //TODO: create your filter here
    return null;
  };
  
  return ServiceSink;
}

module.exports = createServiceSink;
