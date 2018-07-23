PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/dataset/STA-RAUM-ZEIT-STI-VOR/slice> a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/STA-RAUM-ZEIT-STI-VOR> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> <http://ld.stadt-zuerich.ch/statistics/code/R40000>;
        <http://ld.stadt-zuerich.ch/statistics/property/STI> ?sti;
        <http://ld.stadt-zuerich.ch/statistics/property/VOR> ?vor;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?sti skos:notation ?stiNotation .
      ?vor skos:notation ?vorNotation .

      # filters
      ${typeof sti !== 'undefined' ? 'FILTER (?stiNotation IN (' + (sti.join ? sti.map(v => v.toCanonical()).join() : sti.toCanonical()) + '))' : ''}
      ${typeof vor !== 'undefined' ? 'FILTER (?vorNotation IN (' + (vor.join ? vor.map(v => v.toCanonical()).join() : vor.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:date("' + (from.value.length === 4 ? from.value + '-01-01' : from.value) + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:date("' + (to.value.length === 4 ? to.value + '-12-31' : to.value) + '"))':''}
    }
  }
}