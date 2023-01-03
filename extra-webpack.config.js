const path = require("path");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const share = mf.share;
const shareAll = mf.shareAll;

const setInferVersion = mf.setInferVersion;

setInferVersion(true);

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, './tsconfig.json'),
  ['ui-sdk']
);
module.exports = (config, options) => {
  
  config.resolve.alias = {
    ...sharedMappings.getAliases(),
  };
  // Uncomment while profiling build.
  /* config.plugins.push(
    new webpack.ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true,
      handler(percentage, message, ...args) {
        console.info(new Date().toLocaleString(), percentage, message, ...args)
      }
    })
  ); */
  config.experiments.outputModule = true;
  config.plugins.push(new ModuleFederationPlugin({
    library: { type: "module" },
    // For remotes (please adjust)
    // camel case in the name doesn't seems to be working...
    name: "mfeui",
    filename: "remoteEntry.js",
    // for remote, add exposed modules here...
    // exposes: {
    //   HomeModule: "./src/app/home/home.module.ts",
    // },

    // For hosts, add list of static remotes here...
    remotes: {
    },

    // Sharing yfiles seperately as it is local install and webpack is not able to derive chunk at runtime if version is undeterministic.
    shared: {
      ...share({"@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }}),
      ...sharedMappings.getDescriptors(),
    }
  }));
  console.log(config);
  return config;
};
