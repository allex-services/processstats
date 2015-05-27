function createUserSink(execlib,ParentSink){

  if(!ParentSink){
    ParentSink = execlib.execSuite.registry.get('.').SinkMap.get('user');
  }

  function UserSink(prophash,client){
    ParentSink.call(this,prophash,client);
  }
  ParentSink.inherit(UserSink,require('../methoddescriptors/user'));
  UserSink.prototype.__cleanUp = function(){
    ParentSink.prototype.__cleanUp.call(this);
  };
  UserSink.prototype.createStateFilter = function(){
    //TODO: create your filter here
    return null;
  };
  
  return UserSink;
}

module.exports = createUserSink;
