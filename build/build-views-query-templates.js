const fs = require('fs')
const path = require('path')
const u = require('./utils')

function buildViewSliceQueryTemplate (view, template, filename) {
  const dimensionIris = Object.keys(view.dimensions).sort()

  const patterns = dimensionIris.map((dimensionIri) => {
    const variable = u.variableName(dimensionIri)
    const value = view.dimensions[dimensionIri]

    return '<' + dimensionIri + '> ' + (value ? '<' + value + '>' : '?' + variable)
  }).join(';\n        ')

  const notationPatterns = dimensionIris.filter(d => !view.dimensions[d]).filter(u.isNotZeit).map((dimensionIri) => {
    const variable = u.variableName(dimensionIri)

    return '?' + variable + ' skos:notation ' + '?' + variable + 'Notation .'
  }).join('\n      ')

  const filters = dimensionIris.filter(d => !view.dimensions[d]).filter(u.isNotZeit).map((dimensionIri) => {
    const variable = u.variableName(dimensionIri)

    return '${typeof ' + variable + ' !== \'undefined\' ? \'FILTER (?' + variable + 'Notation IN (\' + (' + variable + '.join ? ' + variable + '.map(v => v.toCanonical()).join() : ' + variable + '.toCanonical()) + \'))\' : \'\'}'
  }).join('\n      ')

  const query = template
    .split('%%NOTATION%%').join(view.notation)
    .split('%%DATASET%%').join(view.dataset)
    .split('%%PATTERNS%%').join(patterns)
    .split('%%NOTATION_PATTERNS%%').join(notationPatterns)
    .split('%%FILTERS%%').join(filters)

  fs.writeFileSync(filename, query)

  return query
}

function buildViewShapeQueryTemplate (view, template, filename) {
  const query = template
    .split('%%NOTATION%%').join(view.notation)

  fs.writeFileSync(filename, query)

  return query
}

function buildViewQueryTemplates (views, config) {
  const templateViewSlice = fs.readFileSync(path.join(__dirname, 'support/hydra-view-slice.sparql.es6')).toString()
  const templateViewShape = fs.readFileSync(path.join(__dirname, 'support/hydra-view-shape.sparql.es6')).toString()

  Object.keys(views).sort().forEach((viewIri) => {
    const view = views[viewIri]

    buildViewSliceQueryTemplate(view, templateViewSlice, path.join(config.outDir, view.notation + '-slice.sparql.es6'))
    buildViewShapeQueryTemplate(view, templateViewShape, path.join(config.outDir, view.notation + '-shape.sparql.es6'))
  })

  return Promise.resolve()
}

module.exports = buildViewQueryTemplates
