const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')

const regex = {
  checkIsHtmlFile: /.+\.(html)$/,
  contentInMasterPage: /{content}/,
}

const options = {
  templateSourceDir: './src/views',
  masterPage: '/layout/master.html',
}

const getFileContent = (filepath) => {
  return fs.readFileSync(path.resolve(__dirname, filepath), {
    encoding: 'utf8',
    flag: 'r',
  })
}

function generateHtmlTemplates(templateDir) {
  let pages = fs.readdirSync(templateDir)
  pages = pages.filter((filename) => regex.checkIsHtmlFile.exec(filename))
  const templateContent = getFileContent(`${templateDir}/${options.masterPage}`)
  return pages.map((item) => {
    const [name, extension] = item.split('.')
    const content = getFileContent(`${templateDir}/${name}.${extension}`)
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      templateContent: templateContent.replace(regex.contentInMasterPage, content),
      minify: {
        collapseWhitespace: false,
      },
      inject: true,
    })
  })
}

const templates = generateHtmlTemplates(options.templateSourceDir)

module.exports = templates
