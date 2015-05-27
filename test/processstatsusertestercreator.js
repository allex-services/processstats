function createProcessStatsUserTester(execlib,Tester){
  var lib = execlib.lib,
      q = lib.q;

  function ProcessStatsUserTester(prophash,client){
    Tester.call(this,prophash,client);
    console.log('runNext finish');
    lib.runNext(this.finish.bind(this,0));
  }
  lib.inherit(ProcessStatsUserTester,Tester);

  return ProcessStatsUserTester;
}

module.exports = createProcessStatsUserTester;
