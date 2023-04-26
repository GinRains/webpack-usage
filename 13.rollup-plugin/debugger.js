import { rollup, watch } from 'rollup';
import rollupOptions from './rollup.config.js';

/**
 * rollup 执行分成三个阶段
 * 1，打包阶段
 * 2，生成阶段
 * 3，写入阶段
 * 4，关闭阶段
 */
(async function() {
  const bundle = await rollup(rollupOptions)
  await bundle.generate(rollupOptions.output)
  await bundle.write(rollupOptions.output)
  const watcher = watch(rollupOptions)
  watcher.on('event', (event) => {
    // console.log(event)
  })

  setTimeout(() => {
    watcher.close()
  }, 1000)

  await bundle.close()
})()