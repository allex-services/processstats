var pm = require('process-monitor');

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
      sinkname: 'Time',
      identity: {role:'user',name:'user'},
      onSink: this.onTimeSink.bind(this)
    });
  }
  ParentService.inherit(ProcessStatsService,factoryCreator);
  ProcessStatsService.prototype.__cleanUp = function(){
    ParentService.prototype.__cleanUp.call(this);
  };
  ProcessStatsService.prototype.onTimeSink = function(timesink){
    if(!timesink){
      return;
    }
    taskRegistry.run('readState',{
      state:taskRegistry.run('materializeState',{
        sink:timesink
      }),
      name:'time',
      cb:this.onTime.bind(this)
    });
  };
  ProcessStatsService.prototype.onTime = function(time){
    var m = pm.monitor({ pid: process.pid });
    m.on('stats',this.onStats.bind(this,m));
    m.start();
  };
  ProcessStatsService.prototype.onStats = function(m,stats){
    m.stop();
    m = null;
    this.state.set('cpu',stats.cpu);
    this.state.set('ram',~~(stats.mem/1000));
  };
  
  return ProcessStatsService;
}

module.exports = createProcessStatsService;
