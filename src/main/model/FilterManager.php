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

    public function handle(Filter $filter){
        /** @var FilterHandler $handler */
        $handler = $this->filters[$filter->getId()];
        return $handler->handleFilter($filter);
    }

    public function getFilters()
    {
        return $this->filtersAsList;
    }

    public function getFilter($filterId){
        return $this->filters[$filterId];
    }
}