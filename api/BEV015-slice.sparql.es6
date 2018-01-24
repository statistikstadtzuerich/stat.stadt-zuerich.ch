PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX ldprop: <http://ld.stadt-zuerich.ch/statistics/property/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX cube: <http://purl.org/linked-data/cube#>

CONSTRUCT {
  ?slice a qb:Slice ;
    qb:observation ?observation .
  ?observation a qb:Observation ;
    ?property ?value .
  ?value
    rdfs:label ?label ;
    skos:notation ?notation .
} WHERE {
  {
    GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
      # observations
      ?observation a qb:Observation ;
        # qb:dataSet <http://ld.stadt-zuerich.ch/statistics/dataset/BEV015> ;
        ?property ?value.

      # dimensions
      ?observation
        <http://ld.stadt-zuerich.ch/statistics/property/HHG> ?hhg;
        <http://ld.stadt-zuerich.ch/statistics/property/RAUM> ?raum;
        <http://ld.stadt-zuerich.ch/statistics/property/WSI> ?wsi;
        <http://ld.stadt-zuerich.ch/statistics/property/ZEIT> ?zeit .

      # notations for filters
      ?hhg skos:notation ?hhgNotation .
      ?raum skos:notation ?raumNotation .
      ?wsi skos:notation ?wsiNotation .

      # Get Labels and Notations
      OPTIONAL { ?value rdfs:label ?label . }
      OPTIONAL { ?value skos:notation ?notation . }

      # filters
      ${typeof hhg !== 'undefined' ? 'FILTER (?hhgNotation IN (' + (hhg.join ? hhg.map(v => v.toCanonical()).join() : hhg.toCanonical()) + '))' : ''}
      ${typeof raum !== 'undefined' ? 'FILTER (?raumNotation IN (' + (raum.join ? raum.map(v => v.toCanonical()).join() : raum.toCanonical()) + '))' : ''}
      ${typeof wsi !== 'undefined' ? 'FILTER (?wsiNotation IN (' + (wsi.join ? wsi.map(v => v.toCanonical()).join() : wsi.toCanonical()) + '))' : ''}

      # time range filter
      ${typeof from !== 'undefined' ? 'FILTER (?zeit >= xsd:datetime("' + from + '"))':''}
      ${typeof to !== 'undefined' ? 'FILTER (?zeit <= xsd:datetime("' + to + '"))':''}
    }
  }

  BIND(BNODE('slice') AS ?slice)
}
