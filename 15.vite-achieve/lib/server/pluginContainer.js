const { normalizePath } = require("../utils");

/**
 * 创建插件的容器
 * @param {*} param0 
 * @returns 
 */
async function createPluginContainer({ plugins }) {
  const container = {
    async resolveId(path, importer) {
      let resolveId = path
      for(const plugin of plugins) {
        if(!plugin.resolveId) continue
        const result = await plugin.resolveId.call(null, path, importer)

        if(result) {
          resolveId = result.id || result
          break;
        }
      }
      return {
        id: normalizePath(resolveId)
      }
    },
    load() {

    },
    transform() {

    }
  }

  return container
}

exports.createPluginContainer = createPluginContainer