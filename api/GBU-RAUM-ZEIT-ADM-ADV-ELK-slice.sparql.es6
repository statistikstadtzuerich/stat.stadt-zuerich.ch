PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/dataset/GBU-RAUM-ZEIT-ADM-ADV-ELK/slice> a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/GBU-RAUM-ZEIT-ADM-ADV-ELK> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/ADM> ?adm;
        <http://ld.stadt-zuerich.ch/statistics/property/ADV> ?adv;
        <http://ld.stadt-zuerich.ch/statistics/property/ELK> <http://ld.stadt-zuerich.ch/statistics/code/ELK0001>;
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> <http://ld.stadt-zuerich.ch/statistics/code/R30000>;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?adm skos:notation ?admNotation .
      ?adv skos:notation ?advNotation .

      # filters
      ${typeof adm !== 'undefined' ? 'FILTER (?admNotation IN (' + (adm.join ? adm.map(v => v.toCanonical()).join() : adm.toCanonical()) + '))' : ''}
      ${typeof adv !== 'undefined' ? 'FILTER (?advNotation IN (' + (adv.join ? adv.map(v => v.toCanonical()).join() : adv.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:date("' + (from.value.length === 4 ? from.value + '-01-01' : from.value) + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:date("' + (to.value.length === 4 ? to.value + '-12-31' : to.value) + '"))':''}
    }
  }
}
