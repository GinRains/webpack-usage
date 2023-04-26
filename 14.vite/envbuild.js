let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (onResolveArgs) => {
      console.log(onResolveArgs)
      return {
        external: false,
        namespace: 'virtue-env',
        path: onResolveArgs.path
      }
    })
    build.onLoad({ filter: /^env$/, namespace: 'virtue-env' }, () => {
      return {
        contents: JSON.stringify(process.env), // JSON.stringify({ OS: 'window_NT'})
        loader: 'json'
        // contents: 'export const OS = "window_NT"',
        // loader: 'js'
      }
    })
  }
}

require('esbuild')
  .build({
    entryPoints: ['entry.js'],
    bundle: true,
    plugins: [envPlugin],
    outfile: 'out.js'
  }).catch(() => {})