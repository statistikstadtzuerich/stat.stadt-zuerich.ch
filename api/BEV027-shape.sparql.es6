PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX sh: <http://www.w3.org/ns/shacl#>

CONSTRUCT {
  <http://stat.stadt-zuerich.ch/api/dataset/BEV027/shape> a sh:NodeShape ;
    sh:property ?b_property .

  ?b_property sh:in ?propertyValue ;
    rdfs:seeAlso ?dimension .

  ?propertyValue rdfs:label ?label .

  ?dimension rdfs:label ?dimensionLabel ;
    skos:notation ?dimensionNotation .

  # all the list fun
  ?b_property sh:path ?b_list .

  ?b_list rdf:first qb:observation ;
    rdf:rest ?b_nil .

  ?b_nil rdf:first ?dimension ;
    rdf:rest rdf:nil .
} WHERE {
  GRAPH <https://linked.opendata.swiss/graph/zh/statistics> {
    {
      <http://stat.stadt-zuerich.ch/view/BEV027/shape> sh:property ?b_property .

      ?b_property sh:in ?propertyValue .

      OPTIONAL {
        ?propertyValue rdfs:label ?label .
      }

      FILTER(isIRI(?propertyValue))
    } UNION {
      <http://stat.stadt-zuerich.ch/view/BEV027/shape> sh:property ?b_property .

      ?b_property sh:path ?b_list .

      ?b_list rdf:first qb:observation ;
        rdf:rest ?b_nil .

      ?b_nil rdf:first ?dimension ;
        rdf:rest rdf:nil .

      ?dimension rdfs:label ?dimensionLabel ;
        skos:notation ?dimensionNotation .
    }
  }
}
