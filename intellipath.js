import fs from 'fs'

export default (alias) => {
  const settingsPath = './.vscode/settings.json'
  const cwd = process.cwd()
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'))

  settings['path-autocomplete.pathMappings'] ||= {}
  settings['path-intellisense.pathMappings'] ||= {}

  for (let key in alias) {
    const value = alias[key]

    settings['path-autocomplete.pathMappings'][key] = value.replace(
      cwd,
      '${folder}'
    )
    settings['path-intellisense.pathMappings'][key] = value.replace(
      cwd,
      '${workspaceFolder}'
    )
  }

  const settingsStr = JSON.stringify(settings)
  fs.writeFileSync(settingsPath, settingsStr)
  console.log('Intellipath updated...')
}
