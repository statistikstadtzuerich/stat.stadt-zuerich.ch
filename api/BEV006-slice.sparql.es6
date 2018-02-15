PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/api/dataset/BEV006/slice> a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/BEV006> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/ALT> <http://ld.stadt-zuerich.ch/statistics/code/ALT9015>;
        <http://ld.stadt-zuerich.ch/statistics/property/HEL> ?hel;
        <http://ld.stadt-zuerich.ch/statistics/property/KON> ?kon;
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> ?raum;
        <http://ld.stadt-zuerich.ch/statistics/property/WSI> <http://ld.stadt-zuerich.ch/statistics/code/WSI0001>;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?hel skos:notation ?helNotation .
      ?kon skos:notation ?konNotation .
      ?raum skos:notation ?raumNotation .

      # filters
      ${typeof hel !== 'undefined' ? 'FILTER (?helNotation IN (' + (hel.join ? hel.map(v => v.toCanonical()).join() : hel.toCanonical()) + '))' : ''}
      ${typeof kon !== 'undefined' ? 'FILTER (?konNotation IN (' + (kon.join ? kon.map(v => v.toCanonical()).join() : kon.toCanonical()) + '))' : ''}
      ${typeof raum !== 'undefined' ? 'FILTER (?raumNotation IN (' + (raum.join ? raum.map(v => v.toCanonical()).join() : raum.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:date("' + (from.value.length === 4 ? from.value + '-01-01' : from.value) + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:date("' + (to.value.length === 4 ? to.value + '-12-31' : to.value) + '"))':''}
    }
  }
}
