PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/dataset/SSA-RAUM-ZEIT-BTA-EAR-SAR/slice> a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/SSA-RAUM-ZEIT-BTA-EAR-SAR> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/BTA> ?bta;
        <http://ld.stadt-zuerich.ch/statistics/property/EAR> ?ear;
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> <http://ld.stadt-zuerich.ch/statistics/code/R30000>;
        <http://ld.stadt-zuerich.ch/statistics/property/SAR> ?sar;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?bta skos:notation ?btaNotation .
      ?ear skos:notation ?earNotation .
      ?sar skos:notation ?sarNotation .

      # filters
      ${typeof bta !== 'undefined' ? 'FILTER (?btaNotation IN (' + (bta.join ? bta.map(v => v.toCanonical()).join() : bta.toCanonical()) + '))' : ''}
      ${typeof ear !== 'undefined' ? 'FILTER (?earNotation IN (' + (ear.join ? ear.map(v => v.toCanonical()).join() : ear.toCanonical()) + '))' : ''}
      ${typeof sar !== 'undefined' ? 'FILTER (?sarNotation IN (' + (sar.join ? sar.map(v => v.toCanonical()).join() : sar.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:date("' + (from.value.length === 4 ? from.value + '-01-01' : from.value) + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:date("' + (to.value.length === 4 ? to.value + '-12-31' : to.value) + '"))':''}
    }
  }
}
