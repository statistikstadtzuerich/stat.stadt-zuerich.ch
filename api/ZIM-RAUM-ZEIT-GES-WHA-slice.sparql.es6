PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/dataset/ZIM-RAUM-ZEIT-GES-WHA/slice> a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/ZIM-RAUM-ZEIT-GES-WHA> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/GES> ?ges;
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> <http://ld.stadt-zuerich.ch/statistics/code/R30000>;
        <http://ld.stadt-zuerich.ch/statistics/property/WHA> ?wha;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?ges skos:notation ?gesNotation .
      ?wha skos:notation ?whaNotation .

      # filters
      ${typeof ges !== 'undefined' ? 'FILTER (?gesNotation IN (' + (ges.join ? ges.map(v => v.toCanonical()).join() : ges.toCanonical()) + '))' : ''}
      ${typeof wha !== 'undefined' ? 'FILTER (?whaNotation IN (' + (wha.join ? wha.map(v => v.toCanonical()).join() : wha.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:date("' + (from.value.length === 4 ? from.value + '-01-01' : from.value) + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:date("' + (to.value.length === 4 ? to.value + '-12-31' : to.value) + '"))':''}
    }
  }
}
