/*执行 webpack 命令的主入口文件*/
module.exports = function(env, argv) {

	//// 使用 argv 来获取 config-name 参数的值, 区分不同的构建环境
	let config_name = argv["config-name"];

	if(argv.mode != "production")return require("./configs/webpack.start");
  //返回当前执行的确切文件
	return require('./configs/webpack.'+config_name);
}
