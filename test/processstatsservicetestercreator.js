function createProcessStatsServiceTester(execlib,Tester){
  var lib = execlib.lib,
      q = lib.q;

  function ProcessStatsServiceTester(prophash,client){
    Tester.call(this,prophash,client);
    console.log('runNext finish');
    lib.runNext(this.finish.bind(this,0));
  }
  lib.inherit(ProcessStatsServiceTester,Tester);

  return ProcessStatsServiceTester;
}

module.exports = createProcessStatsServiceTester;
