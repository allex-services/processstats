function createProcessStatsService(execlib,ParentServicePack){
  var execSuite = execlib.execSuite,
      taskRegistry = execSuite.taskRegistry;

  var ParentService = ParentServicePack.Service;

  function factoryCreator(parentFactory){
    return {
      'service': require('./users/serviceusercreator')(execlib,parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib,parentFactory.get('user')) 
    };
  }

  function ProcessStatsService(prophash){
    ParentService.call(this,prophash);
    //execlib.execSuite.acquireSink('Time',{role:'user'}).done(this.onTimeSink.bind(this));
    taskRegistry.run('findSink',{
      name: 'Time',
      cb: this.onTimeSink.bind(this)
    });
  }
  ParentService.inherit(ProcessStatsService,factoryCreator);
  ProcessStatsService.prototype.__cleanUp = function(){
    ParentService.prototype.__cleanUp.call(this);
  };
  ProcessStatsService.prototype.onTimeSink = function(timesink){
    //dodado
  };
  
  return ProcessStatsService;
}

module.exports = createProcessStatsService;
