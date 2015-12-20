<?php

namespace Bendani\PhpCommon\FilterService\Model;

class FilterManager
{

    /** @var array  */
    private $filters;
    private $filtersAsList;

    public function __construct($filters)
    {
        $this->filtersAsList = $filters;
        foreach($filters as $filter){
            $this->filters[$filter->getFilterId()] = $filter;
        }
    }

    public function handle($queryBuilder, Filter $filter){
        /** @var FilterHandler $handler */
        $handler = $this->filters[$filter->getId()];
        $queryBuilder = $handler->joinQuery($queryBuilder);

        return $handler->handleFilter($queryBuilder, $filter);
    }

    public function getFilters()
    {
        return $this->filtersAsList;
    }

}